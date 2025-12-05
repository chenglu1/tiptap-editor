"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableFloatingToolbar = TableFloatingToolbar;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
function TableFloatingToolbar(_a) {
    var editor = _a.editor;
    var toolbarRef = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(null), toolbarPos = _b[0], setToolbarPos = _b[1];
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        // 监听 Tiptap selectionUpdate 事件
        var updateToolbarPosition = function () {
            // 判断是否在表格相关节�?
            var isInTable = editor.isActive("table") || editor.isActive("tableCell") || editor.isActive("tableRow");
            console.log("[TableFloatingToolbar] isInTable:", isInTable);
            if (!isInTable) {
                setToolbarPos(null);
                return;
            }
            // 获取当前 table dom 节点
            var tableDom = editor.view.dom.querySelector("table");
            console.log("[TableFloatingToolbar] tableDom:", tableDom);
            if (tableDom) {
                var rect = tableDom.getBoundingClientRect();
                setToolbarPos({
                    top: rect.top + window.scrollY - 40, // 工具栏显示在表格上方
                    left: rect.left + window.scrollX,
                });
            }
        };
        updateToolbarPosition();
        editor.on("selectionUpdate", function () {
            console.log("[TableFloatingToolbar] selectionUpdate event");
            updateToolbarPosition();
        });
        window.addEventListener("scroll", updateToolbarPosition);
        return function () {
            editor.off("selectionUpdate", updateToolbarPosition);
            window.removeEventListener("scroll", updateToolbarPosition);
        };
    }, [editor]);
    var isInTable = editor && (editor.isActive("table") || editor.isActive("tableCell") || editor.isActive("tableRow"));
    if (!editor || !isInTable || !toolbarPos)
        return null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: toolbarRef, style: {
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
        }, children: [(0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { style: {
                    background: "#f3f4f6",
                    color: "#222",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                }, onMouseOver: function (e) { return (e.currentTarget.style.background = "#e0e7ef"); }, onMouseOut: function (e) { return (e.currentTarget.style.background = "#f3f4f6"); }, onClick: function () { return editor.chain().focus().addRowAfter().run(); }, children: "+\uFFFD?" }), (0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { style: {
                    background: "#f3f4f6",
                    color: "#222",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                }, onMouseOver: function (e) { return (e.currentTarget.style.background = "#e0e7ef"); }, onMouseOut: function (e) { return (e.currentTarget.style.background = "#f3f4f6"); }, onClick: function () { return editor.chain().focus().deleteRow().run(); }, children: "-\uFFFD?" }), (0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { style: {
                    background: "#f3f4f6",
                    color: "#222",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                }, onMouseOver: function (e) { return (e.currentTarget.style.background = "#e0e7ef"); }, onMouseOut: function (e) { return (e.currentTarget.style.background = "#f3f4f6"); }, onClick: function () { return editor.chain().focus().addColumnAfter().run(); }, children: "+\uFFFD?" }), (0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { style: {
                    background: "#f3f4f6",
                    color: "#222",
                    border: "none",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.2s",
                }, onMouseOver: function (e) { return (e.currentTarget.style.background = "#e0e7ef"); }, onMouseOut: function (e) { return (e.currentTarget.style.background = "#f3f4f6"); }, onClick: function () { return editor.chain().focus().deleteColumn().run(); }, children: "-\uFFFD?" })] }));
}
