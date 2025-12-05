import type { Node as TiptapNode } from "@tiptap/pm/model"
import {
  AllSelection,
  NodeSelection,
  Selection,
  TextSelection,
} from "@tiptap/pm/state"
import type { Editor, NodeWithPos } from "@tiptap/react"

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const MAC_SYMBOLS: Record<string, string> = {
  mod: "⌘",
  command: "⌘",
  meta: "⌘",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  shift: "⇧",
  backspace: "Del",
  delete: "⌦",
  enter: "⏎",
  escape: "⎋",
  capslock: "⇪",
} as const

export const SR_ONLY = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
} as const

export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ")
}

/**
 * Determines if the current platform is macOS
 * @returns boolean indicating if the current platform is Mac
 */
export function isMac(): boolean {
  return /Mac/.test(navigator?.platform)
}

/**
 * Converts a keyboard shortcut string to display format with platform-specific symbols
 * @param keys Shortcut string like "mod+b" or "alt+shift+5"
 * @returns Formatted shortcut with symbols like "⌘B" on Mac or "Ctrl+B" on Windows
 */
export function parseShortcutKeys(keys: string): string {
  const isMacOS = isMac()
  const parts = keys.split("+")

  return parts
    .map((part) => {
      const lower = part.toLowerCase()

      if (isMacOS && lower in MAC_SYMBOLS) {
        return MAC_SYMBOLS[lower] || part
      }

      if (lower === "mod" || lower === "command" || lower === "meta") {
        return isMacOS ? "⌘" : "Ctrl"
      }

      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join(isMacOS ? "" : "+")
}

export function isNodeSelection(selection: Selection): boolean {
  return selection instanceof NodeSelection
}

export function isTextSelection(selection: Selection): boolean {
  return selection instanceof TextSelection
}

export function isAllSelection(selection: Selection): boolean {
  return selection instanceof AllSelection
}

export function getNodesInSelection(
  editor: Editor,
  types?: string[]
): NodeWithPos[] {
  const { state } = editor
  const { selection } = state
  const { from, to } = selection
  const nodes: NodeWithPos[] = []

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (types && !types.includes(node.type.name)) {
      return
    }

    nodes.push({ node, pos })
  })

  return nodes
}

export function focusNextNode(
  editor: Editor,
  currentNode: NodeWithPos
): boolean {
  const nodes = getNodesInSelection(editor)
  const currentIndex = nodes.findIndex((n) => n.pos === currentNode.pos)

  if (currentIndex === -1 || currentIndex === nodes.length - 1) {
    return false
  }

  const nextNode = nodes[currentIndex + 1]
  const { view } = editor
  const { dispatch } = view
  const { tr } = view.state

  dispatch(tr.setSelection(NodeSelection.create(view.state.doc, nextNode.pos)))

  return true
}

export function canInsertNodeAt(
  editor: Editor,
  nodeType: string,
  pos?: number
): boolean {
  const { state } = editor
  const { doc, schema } = state
  const node = schema.nodes[nodeType]

  if (!node) {
    return false
  }

  const $pos = typeof pos === "number" ? doc.resolve(pos) : state.selection.$from

  for (let d = $pos.depth; d >= 0; d--) {
    const index = $pos.index(d)

    if ($pos.node(d).canReplaceWith(index, index, node)) {
      return true
    }
  }

  return false
}

export function insertNodeAt(
  editor: Editor,
  nodeType: string,
  attrs?: Record<string, any>,
  pos?: number
): boolean {
  if (!canInsertNodeAt(editor, nodeType, pos)) {
    return false
  }

  const { state, view } = editor
  const { schema } = state
  const node = schema.nodes[nodeType]

  if (!node) {
    return false
  }

  const { tr } = state
  const createdNode = node.create(attrs)
  const insertPos = typeof pos === "number" ? pos : state.selection.from

  tr.insert(insertPos, createdNode)
  view.dispatch(tr)

  return true
}

export function deleteNodeAt(editor: Editor, pos: number): boolean {
  const { state, view } = editor
  const { doc } = state

  const $pos = doc.resolve(pos)
  const node = $pos.nodeAfter

  if (!node) {
    return false
  }

  const { tr } = state
  tr.delete(pos, pos + node.nodeSize)
  view.dispatch(tr)

  return true
}

export function updateNodeAttrs(
  editor: Editor,
  pos: number,
  attrs: Record<string, any>
): boolean {
  const { state, view } = editor
  const { doc } = state

  const $pos = doc.resolve(pos)
  const node = $pos.nodeAfter

  if (!node) {
    return false
  }

  const { tr } = state
  tr.setNodeMarkup(pos, undefined, {
    ...node.attrs,
    ...attrs,
  })
  view.dispatch(tr)

  return true
}

export function isNodeActive(
  editor: Editor,
  nodeType: string,
  attrs?: Record<string, any>
): boolean {
  const { state } = editor
  const { selection } = state
  const { $from, to } = selection

  let isActive = false
  state.doc.nodesBetween($from.pos, to, (node: TiptapNode) => {
    if (node.type.name !== nodeType) {
      return
    }

    if (!attrs) {
      isActive = true
      return false
    }

    if (Object.entries(attrs).every(([key, value]) => node.attrs[key] === value)) {
      isActive = true
      return false
    }
  })

  return isActive
}

export function getNodeAttributes(
  editor: Editor,
  nodeType: string
): Record<string, any> | null {
  const { state } = editor
  const { selection } = state
  const { $from, to } = selection

  let nodeAttrs: Record<string, any> | null = null

  state.doc.nodesBetween($from.pos, to, (node: TiptapNode) => {
    if (node.type.name === nodeType) {
      nodeAttrs = node.attrs
      return false
    }
  })

  return nodeAttrs
}

export function uploadFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error(`File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB`))
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.readAsDataURL(file)
  })
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getMarkAttributes(
  editor: Editor,
  markType: string
): Record<string, any> | null {
  const { state } = editor
  const { selection } = state
  const { $from, to } = selection

  let markAttrs: Record<string, any> | null = null

  state.doc.nodesBetween($from.pos, to, (node) => {
    const mark = node.marks.find((m) => m.type.name === markType)

    if (mark) {
      markAttrs = mark.attrs
      return false
    }
  })

  return markAttrs
}

export function isMarkActive(
  editor: Editor,
  markType: string,
  attrs?: Record<string, any>
): boolean {
  const { state } = editor
  const { selection } = state
  const { $from, to } = selection

  let isActive = false

  state.doc.nodesBetween($from.pos, to, (node: TiptapNode) => {
    const mark = node.marks.find((m) => m.type.name === markType)

    if (mark) {
      if (!attrs) {
        isActive = true
        return false
      }

      if (
        Object.entries(attrs).every(([key, value]) => mark.attrs[key] === value)
      ) {
        isActive = true
        return false
      }
    }
  })

  return isActive
}

export function canApplyMark(
  editor: Editor,
  markType: string
): boolean {
  const { state } = editor
  const { selection } = state
  const { $from } = selection
  const { schema } = state

  const mark = schema.marks[markType]

  if (!mark) {
    return false
  }

  const can = $from.depth === 0 || state.doc.resolve($from.pos).parent.type.allowsMarkType(mark)

  return can
}

export function toggleMark(
  editor: Editor,
  markType: string,
  attrs?: Record<string, any>
): boolean {
  if (!canApplyMark(editor, markType)) {
    return false
  }

  const isActive = isMarkActive(editor, markType, attrs)

  if (isActive) {
    editor.chain().focus().unsetMark(markType).run()
  } else {
    editor.chain().focus().setMark(markType, attrs).run()
  }

  return true
}

export function hasNodeOfType(editor: Editor, nodeType: string): boolean {
  const { state } = editor
  const { doc } = state

  let found = false

  doc.descendants((node) => {
    if (node.type.name === nodeType) {
      found = true
      return false
    }
  })

  return found
}

export function getNodeByPos(
  editor: Editor,
  pos: number
): { node: TiptapNode; pos: number } | null {
  const { state } = editor
  const { doc } = state

  try {
    const $pos = doc.resolve(pos)
    const node = $pos.nodeAfter

    if (!node) {
      return null
    }

    return { node, pos }
  } catch {
    return null
  }
}

export function setTextSelection(
  editor: Editor,
  from: number,
  to?: number
): void {
  const { view } = editor
  const { tr } = view.state

  view.dispatch(
    tr.setSelection(
      TextSelection.create(view.state.doc, from, to !== undefined ? to : from)
    )
  )
}

export function setNodeSelection(editor: Editor, pos: number): void {
  const { view } = editor
  const { tr } = view.state

  view.dispatch(tr.setSelection(NodeSelection.create(view.state.doc, pos)))
}

export function isEmptyTextBlock(node: TiptapNode): boolean {
  return (
    node.isTextblock &&
    !node.type.spec.code &&
    node.content.size === 0 &&
    node.marks.length === 0
  )
}

export function canJoin(editor: Editor, pos: number): boolean {
  const { state } = editor
  const { doc } = state

  try {
    const $pos = doc.resolve(pos)
    return $pos.parent.canReplace($pos.index(), $pos.index() + 1)
  } catch {
    return false
  }
}

export function joinBackward(editor: Editor): boolean {
  const { state, view } = editor
  const { selection } = state
  const { $from } = selection

  if ($from.parentOffset > 0) {
    return false
  }

  const { tr } = state

  if (canJoin(editor, $from.pos)) {
    tr.join($from.pos)
    view.dispatch(tr)
    return true
  }

  return false
}

export function createParagraphNear(editor: Editor): boolean {
  const { state, view } = editor
  const { selection, schema } = state
  const { $from } = selection

  const paragraph = schema.nodes.paragraph

  if (!paragraph) {
    return false
  }

  const { tr } = state
  const pos = $from.after()

  tr.insert(pos, paragraph.create())
  tr.setSelection(TextSelection.create(tr.doc, pos + 1))
  view.dispatch(tr)

  return true
}

export function splitBlock(editor: Editor): boolean {
  const { state, view } = editor
  const { selection } = state
  const { $from, $to } = selection

  if (selection instanceof NodeSelection && selection.node.isBlock) {
    const { tr } = state
    tr.delete($from.pos, $to.pos)
    view.dispatch(tr)
    return true
  }

  const { tr } = state
  tr.split($from.pos)
  view.dispatch(tr)

  return true
}

/**
 * Checks if a mark exists in the editor schema
 * @param markName - The name of the mark to check
 * @param editor - The editor instance
 * @returns boolean indicating if the mark exists in the schema
 */
export const isMarkInSchema = (
  markName: string,
  editor: Editor | null
): boolean => {
  if (!editor?.schema) return false
  return editor.schema.spec.marks.get(markName) !== undefined
}

/**
 * Checks if a node exists in the editor schema
 * @param nodeName - The name of the node to check
 * @param editor - The editor instance
 * @returns boolean indicating if the node exists in the schema
 */
export const isNodeInSchema = (
  nodeName: string,
  editor: Editor | null
): boolean => {
  if (!editor?.schema) return false
  return editor.schema.spec.nodes.get(nodeName) !== undefined
}

/**
 * Checks if a value is a valid number (not null, undefined, or NaN)
 * @param value - The value to check
 * @returns boolean indicating if the value is a valid number
 */
export function isValidPosition(pos: number | null | undefined): pos is number {
  return typeof pos === "number" && pos >= 0
}

/**
 * Checks if one or more extensions are registered in the Tiptap editor.
 * @param editor - The Tiptap editor instance
 * @param extensionNames - A single extension name or an array of names to check
 * @returns True if at least one of the extensions is available, false otherwise
 */
export function isExtensionAvailable(
  editor: Editor | null,
  extensionNames: string | string[]
): boolean {
  if (!editor) return false

  const names = Array.isArray(extensionNames)
    ? extensionNames
    : [extensionNames]

  const found = names.some((name) =>
    editor.extensionManager.extensions.some((ext) => ext.name === name)
  )

  if (!found) {
    console.warn(
      `None of the extensions [${names.join(", ")}] were found in the editor schema. Ensure they are included in the editor configuration.`
    )
  }

  return found
}

/**
 * Finds a node at the specified position with error handling
 * @param editor The Tiptap editor instance
 * @param position The position in the document to find the node
 * @returns The node at the specified position, or null if not found
 */
export function findNodeAtPosition(editor: Editor, position: number) {
  try {
    const node = editor.state.doc.nodeAt(position)
    if (!node) {
      console.warn(`No node found at position ${position}`)
      return null
    }
    return node
  } catch (error) {
    console.error(`Error getting node at position ${position}:`, error)
    return null
  }
}

/**
 * Finds the position and instance of a node in the document
 * @param props Object containing editor, node (optional), and nodePos (optional)
 * @param props.editor The Tiptap editor instance
 * @param props.node The node to find (optional if nodePos is provided)
 * @param props.nodePos The position of the node to find (optional if node is provided)
 * @returns An object with the position and node, or null if not found
 */
export function findNodePosition(props: {
  editor: Editor | null
  node?: TiptapNode | null
  nodePos?: number | null
}): { pos: number; node: TiptapNode } | null {
  const { editor, node, nodePos } = props

  if (!editor || !editor.state?.doc) return null

  const hasValidNode = node !== undefined && node !== null
  const hasValidPos = isValidPosition(nodePos)

  if (!hasValidNode && !hasValidPos) {
    return null
  }

  if (hasValidNode) {
    let foundPos = -1
    let foundNode: TiptapNode | null = null

    editor.state.doc.descendants((currentNode: TiptapNode, pos: number) => {
      if (currentNode === node) {
        foundPos = pos
        foundNode = currentNode
        return false
      }
      return true
    })

    if (foundPos !== -1 && foundNode !== null) {
      return { pos: foundPos, node: foundNode }
    }
  }

  if (hasValidPos) {
    const nodeAtPos = findNodeAtPosition(editor, nodePos!)
    if (nodeAtPos) {
      return { pos: nodePos!, node: nodeAtPos }
    }
  }

  return null
}

/**
 * Checks if the current selection in the editor is a node selection of specified types
 * @param editor The Tiptap editor instance
 * @param types An array of node type names to check against
 * @returns boolean indicating if the selected node matches any of the specified types
 */
export function isNodeTypeSelected(
  editor: Editor | null,
  types: string[] = []
): boolean {
  if (!editor || !editor.state.selection) return false

  const { state } = editor
  const { selection } = state

  if (selection.empty) return false

  if (selection instanceof NodeSelection) {
    const node = selection.node
    return node ? types.includes(node.type.name) : false
  }

  return false
}

/**
 * Check whether the current selection is fully within nodes
 * whose type names are in the provided `types` list.
 */
export function selectionWithinConvertibleTypes(
  editor: Editor,
  types: string[] = []
): boolean {
  if (!editor || types.length === 0) return false

  const { state } = editor
  const { selection } = state
  const allowed = new Set(types)

  if (selection instanceof NodeSelection) {
    const nodeType = selection.node?.type?.name
    return !!nodeType && allowed.has(nodeType)
  }

  if (selection instanceof TextSelection || selection instanceof AllSelection) {
    let valid = true
    state.doc.nodesBetween(selection.from, selection.to, (node: TiptapNode) => {
      if (node.isTextblock && !allowed.has(node.type.name)) {
        valid = false
        return false
      }
      return valid
    })
    return valid
  }

  return false
}

const ATTR_WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g

type ProtocolOptions = {
  scheme: string
  optionalSlashes?: boolean
}

type ProtocolConfig = Array<ProtocolOptions | string>

export function isAllowedUri(
  uri: string | undefined,
  protocols?: ProtocolConfig
) {
  const allowedProtocols: string[] = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp",
  ]

  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === "string" ? protocol : protocol.scheme

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol)
      }
    })
  }

  return (
    !uri ||
    uri.replace(ATTR_WHITESPACE, "").match(
      new RegExp(
        `^(?:(?:${allowedProtocols.join("|")}):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))`,
        "i"
      )
    )
  )
}

export function sanitizeUrl(
  inputUrl: string,
  baseUrl: string = window.location.href,
  protocols?: ProtocolConfig
): string {
  try {
    const url = new URL(inputUrl, baseUrl)

    if (isAllowedUri(url.href, protocols)) {
      return url.href
    }
  } catch {
    // If URL creation fails, it's considered invalid
  }
  return "#"
}
