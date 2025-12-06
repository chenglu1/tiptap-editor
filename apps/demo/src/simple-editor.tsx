import { useEffect, useRef, useState } from "react"
import { EditorContent, EditorContext, useEditor } from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"

// --- UI Primitives ---
import { Button, Spacer, Toolbar, ToolbarGroup, ToolbarSeparator } from "@tiptap-editor/ui-primitives"

// --- Tiptap Nodes ---
import { ImageUploadNode, HorizontalRule } from "@tiptap-editor/nodes"

// --- Tiptap UI Components (Structure Elements) ---
import {
  HeadingDropdownMenu,
  BlockquoteButton,
  CodeBlockButton,
  TableButton,
  ListDropdownMenu,
} from "@tiptap-editor/ui-components"

// --- Tiptap UI Components (Text Formatting) ---
import {
  MarkButton,
  TextAlignButton,
  UndoRedoButton,
} from "@tiptap-editor/ui-components"

// --- Tiptap UI Components (Popovers & Complex Controls) ---
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
  LinkPopover,
  LinkContent,
  LinkButton,
  ImageUploadButton,
  TableFloatingToolbar,
} from "@tiptap-editor/ui-components"

// --- Tiptap Icons ---
import {
  ArrowLeftIcon,
  HighlighterIcon,
  LinkIcon,
} from "@tiptap-editor/ui-components"

// --- Hooks ---
import { useIsMobile, useWindowSize, useCursorVisibility } from "@tiptap-editor/hooks"

// --- Components ---
import { ThemeToggle } from "./theme-toggle"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@tiptap-editor/utils"

// --- Styles ---
import "./simple-editor.scss"
// Import all node styles
import "@tiptap-editor/nodes/blockquote-node/blockquote-node.scss"
import "@tiptap-editor/nodes/code-block-node/code-block-node.scss"
import "@tiptap-editor/nodes/heading-node/heading-node.scss"
import "@tiptap-editor/nodes/horizontal-rule-node/horizontal-rule-node.scss"
import "@tiptap-editor/nodes/image-node/image-node.scss"
import "@tiptap-editor/nodes/image-upload-node/image-upload-node.scss"
import "@tiptap-editor/nodes/list-node/list-node.scss"
import "@tiptap-editor/nodes/paragraph-node/paragraph-node.scss"
// Import UI components styles
import "@tiptap-editor/ui-components/color-highlight-button/color-highlight-button.scss"
// Import UI primitives styles (only those with SCSS files)
import "@tiptap-editor/ui-primitives/badge/badge.scss"
import "@tiptap-editor/ui-primitives/button/button.scss"
import "@tiptap-editor/ui-primitives/card/card.scss"
import "@tiptap-editor/ui-primitives/dropdown-menu/dropdown-menu.scss"
import "@tiptap-editor/ui-primitives/input/input.scss"
import "@tiptap-editor/ui-primitives/popover/popover.scss"
import "@tiptap-editor/ui-primitives/separator/separator.scss"
import "@tiptap-editor/ui-primitives/toolbar/toolbar.scss"
import "@tiptap-editor/ui-primitives/tooltip/tooltip.scss"

// --- Content ---
import { mdContent as content } from "./data/content"

/**
 * Main toolbar content - displays all editing tools
 * Adapts between desktop and mobile layouts
 */
export const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      {/* History Controls */}
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Block-level Elements */}
      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} portal={isMobile} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} portal={isMobile} />
        <BlockquoteButton />
        <CodeBlockButton />
        <TableButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Inline Text Formatting */}
      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Advanced Inline Formatting */}
      <ToolbarGroup>
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Vertical Alignment */}
      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Paragraph Alignment */}
      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      {/* Media & Attachments */}
      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {/* Theme Toggle */}
      {isMobile && <ToolbarSeparator />}

      <ToolbarGroup>
        <ThemeToggle />
      </ToolbarGroup>
    </>
  )
}

export const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button data-style="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)

export function SimpleEditor() {
  const isMobile = useIsMobile()
  const { height } = useWindowSize()
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  )
  const toolbarRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content,
  })

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main")
    }
  }, [isMobile, mobileView])

  return (
    <div className="simple-editor-wrapper" style={{ position: "relative" }}>
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
        {/* 集成表格浮动工具栏 */}
        <TableFloatingToolbar editor={editor} />
      </EditorContext.Provider>
    </div>
  )
}
