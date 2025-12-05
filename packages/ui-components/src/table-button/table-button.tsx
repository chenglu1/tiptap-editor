/*
 * @Author: chenglu chenglud@digitalchina.com
 * @Date: 2025-11-03 11:34:03
 * @LastEditors: chenglu chenglud@digitalchina.com
 * @LastEditTime: 2025-11-03 18:20:15
 * @FilePath: \tiptap-editor\src\components\tiptap-ui\table-button\table-button.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useTiptapEditor } from "@tiptap-editor/hooks";
import { Button } from "@tiptap-editor/ui-primitives";
import { useCallback } from "react";
import { TableIcon } from "../icons/table-icon";

export function TableButton() {
  const { editor } = useTiptapEditor();

  const handleInsertTable = useCallback(() => {
    if (!editor) return;
    // 插入一�?x3表格，可根据需求扩�?
    editor.chain().focus()// @ts-ignore.insertTable(.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  return (
    <Button
      type="button"
      aria-label="Insert Table"
      title="Insert Table"
      onClick={handleInsertTable}
      data-style="ghost"
    >
      <TableIcon className="tiptap-button-icon" />
    </Button>
  );
}
