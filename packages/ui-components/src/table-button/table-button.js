"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableButton = TableButton;
var jsx_runtime_1 = require("react/jsx-runtime");
/*
 * @Author: chenglu chenglud@digitalchina.com
 * @Date: 2025-11-03 11:34:03
 * @LastEditors: chenglu chenglud@digitalchina.com
 * @LastEditTime: 2025-11-03 18:20:15
 * @FilePath: \tiptap-editor\src\components\tiptap-ui\table-button\table-button.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var hooks_1 = require("@tiptap-editor/hooks");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
var react_1 = require("react");
var table_icon_1 = require("../icons/table-icon");
function TableButton() {
    var editor = (0, hooks_1.useTiptapEditor)().editor;
    var handleInsertTable = (0, react_1.useCallback)(function () {
        if (!editor)
            return;
        // 插入一�?x3表格，可根据需求扩�?
        editor.chain().focus(); // @ts-ignore.insertTable(.insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }, [editor]);
    return ((0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { type: "button", "aria-label": "Insert Table", title: "Insert Table", onClick: handleInsertTable, "data-style": "ghost", children: (0, jsx_runtime_1.jsx)(table_icon_1.TableIcon, { className: "tiptap-button-icon" }) }));
}
