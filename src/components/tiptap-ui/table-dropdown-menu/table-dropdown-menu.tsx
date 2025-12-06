import { forwardRef, useCallback } from "react"
import type { Editor } from "@tiptap/react"

// --- Icons ---
import { TableIcon } from "@/components/tiptap-icons/table-icon"

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"

// --- UI Primitives ---
import type { ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Button } from "@/components/tiptap-ui-primitive/button"

export interface TableDropdownMenuProps extends Omit<ButtonProps, "type"> {
  /**
   * The Tiptap editor instance.
   */
  editor?: Editor | null
  /**
   * Whether to hide the button when table insertion is unavailable
   * @default false
   */
  hideWhenUnavailable?: boolean
  /**
   * Number of rows to insert
   * @default 3
   */
  rows?: number
  /**
   * Number of columns to insert
   * @default 3
   */
  cols?: number
  /**
   * Whether to include a header row
   * @default true
   */
  withHeaderRow?: boolean
}

/**
 * Button component for inserting a table in a Tiptap editor.
 * Inserts a 3x3 table with header row by default.
 */
export const TableDropdownMenu = forwardRef<
  HTMLButtonElement,
  TableDropdownMenuProps
>(
  (
    {
      editor: providedEditor,
      hideWhenUnavailable = false,
      rows = 3,
      cols = 3,
      withHeaderRow = true,
      ...buttonProps
    },
    ref
  ) => {
    const { editor } = useTiptapEditor(providedEditor)

    const canInsert = editor?.can().insertTable({ rows, cols, withHeaderRow }) ?? false
    const isVisible = hideWhenUnavailable ? canInsert : true

    const handleInsertTable = useCallback(() => {
      if (!editor || !canInsert) return
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow }).run()
    }, [editor, canInsert, rows, cols, withHeaderRow])

    if (!isVisible) {
      return null
    }

    return (
      <Button
        ref={ref}
        type="button"
        data-style="ghost"
        role="button"
        tabIndex={-1}
        aria-label="Insert table"
        tooltip="Insert Table"
        disabled={!canInsert}
        onClick={handleInsertTable}
        {...buttonProps}
      >
        <TableIcon className="tiptap-button-icon" />
      </Button>
    )
  }
)

TableDropdownMenu.displayName = "TableDropdownMenu"
