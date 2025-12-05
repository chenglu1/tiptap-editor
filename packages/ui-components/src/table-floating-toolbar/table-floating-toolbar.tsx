import { useEffect, useRef, useState } from "react";
import { Button } from "@tiptap-editor/ui-primitives";

export function TableFloatingToolbar({ editor }: { editor: any }) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!editor) return;
    // 监听 Tiptap selectionUpdate 事件
    const updateToolbarPosition = () => {
      // 判断是否在表格相关节�?
      const isInTable = editor.isActive("table") || editor.isActive("tableCell") || editor.isActive("tableRow");
      console.log("[TableFloatingToolbar] isInTable:", isInTable);
      if (!isInTable) {
        setToolbarPos(null);
        return;
      }
      // 获取当前 table dom 节点
      const tableDom = editor.view.dom.querySelector("table");
      console.log("[TableFloatingToolbar] tableDom:", tableDom);
      if (tableDom) {
        const rect = tableDom.getBoundingClientRect();
        setToolbarPos({
          top: rect.top + window.scrollY - 40, // 工具栏显示在表格上方
          left: rect.left + window.scrollX,
        });
      }
    };
    updateToolbarPosition();
    editor.on("selectionUpdate", () => {
      console.log("[TableFloatingToolbar] selectionUpdate event");
      updateToolbarPosition();
    });
    window.addEventListener("scroll", updateToolbarPosition);
    return () => {
      editor.off("selectionUpdate", updateToolbarPosition);
      window.removeEventListener("scroll", updateToolbarPosition);
    };
  }, [editor]);

  const isInTable = editor && (editor.isActive("table") || editor.isActive("tableCell") || editor.isActive("tableRow"));
  if (!editor || !isInTable || !toolbarPos) return null;

  return (
    <div
      ref={toolbarRef}
      style={{
        position: "absolute",
        top: toolbarPos.top,
        left: toolbarPos.left,
        zIndex: 100,
        background: "#fff",
        border: "1px solid #e5e7eb",
        padding: "8px 16px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
        borderRadius: 10,
        display: "flex",
        gap: 10,
        pointerEvents: "auto",
        alignItems: "center",
        minHeight: 40,
      }}
    >
      <Button
        style={{
          background: "#f3f4f6",
          color: "#222",
          border: "none",
          borderRadius: 6,
          padding: "6px 12px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#e0e7ef")}
        onMouseOut={e => (e.currentTarget.style.background = "#f3f4f6")}
        onClick={() => editor.chain().focus().addRowAfter().run()}
      >
        +�?
      </Button>
      <Button
        style={{
          background: "#f3f4f6",
          color: "#222",
          border: "none",
          borderRadius: 6,
          padding: "6px 12px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#e0e7ef")}
        onMouseOut={e => (e.currentTarget.style.background = "#f3f4f6")}
        onClick={() => editor.chain().focus().deleteRow().run()}
      >
        -�?
      </Button>
      <Button
        style={{
          background: "#f3f4f6",
          color: "#222",
          border: "none",
          borderRadius: 6,
          padding: "6px 12px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#e0e7ef")}
        onMouseOut={e => (e.currentTarget.style.background = "#f3f4f6")}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        +�?
      </Button>
      <Button
        style={{
          background: "#f3f4f6",
          color: "#222",
          border: "none",
          borderRadius: 6,
          padding: "6px 12px",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s",
        }}
        onMouseOver={e => (e.currentTarget.style.background = "#e0e7ef")}
        onMouseOut={e => (e.currentTarget.style.background = "#f3f4f6")}
        onClick={() => editor.chain().focus().deleteColumn().run()}
      >
        -�?
      </Button>
    </div>
  );
}
