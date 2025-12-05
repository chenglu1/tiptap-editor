"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIST_SHORTCUT_KEYS = exports.listLabels = exports.listIcons = void 0;
exports.canToggleList = canToggleList;
exports.isListActive = isListActive;
exports.toggleList = toggleList;
exports.shouldShowButton = shouldShowButton;
exports.useList = useList;
var react_1 = require("react");
var state_1 = require("@tiptap/pm/state");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Icons ---
var list_icon_1 = require("../icons/list-icon");
var list_ordered_icon_1 = require("../icons/list-ordered-icon");
var list_todo_icon_1 = require("../icons/list-todo-icon");
// --- Lib ---
var utils_1 = require("../utils");
exports.listIcons = {
    bulletList: list_icon_1.ListIcon,
    orderedList: list_ordered_icon_1.ListOrderedIcon,
    taskList: list_todo_icon_1.ListTodoIcon,
};
exports.listLabels = {
    bulletList: "Bullet List",
    orderedList: "Ordered List",
    taskList: "Task List",
};
exports.LIST_SHORTCUT_KEYS = {
    bulletList: "mod+shift+8",
    orderedList: "mod+shift+7",
    taskList: "mod+shift+9",
};
/**
 * Checks if a list can be toggled in the current editor state
 */
function canToggleList(editor, type, turnInto) {
    if (turnInto === void 0) { turnInto = true; }
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isNodeInSchema)(type, editor) || (0, utils_1.isNodeTypeSelected)(editor, ["image"]))
        return false;
    if (!turnInto) {
        switch (type) {
            case "bulletList":
                return; // @ts-ignoreeditor.can().toggleBulletListeditor.can().toggleBulletList()
            case "orderedList":
                return; // @ts-ignoreeditor.can().toggleOrderedListeditor.can().toggleOrderedList()
            case "taskList":
                return editor.can().toggleList("taskList", "taskItem");
            default:
                return false;
        }
    }
    // Ensure selection is in nodes we're allowed to convert
    if (!(0, utils_1.selectionWithinConvertibleTypes)(editor, [
        "paragraph",
        "heading",
        "bulletList",
        "orderedList",
        "taskList",
        "blockquote",
        "codeBlock",
    ]))
        return false;
    // Either we can set list directly on the selection,
    // or we can clear formatting/nodes to arrive at a list.
    switch (type) {
        case "bulletList":
            return; // @ts-ignoreeditor.can().toggleBulletListeditor.can().toggleBulletList() || editor.can().clearNodes()
        case "orderedList":
            return; // @ts-ignoreeditor.can().toggleOrderedListeditor.can().toggleOrderedList() || editor.can().clearNodes()
        case "taskList":
            return (editor.can().toggleList("taskList", "taskItem") ||
                editor.can().clearNodes());
        default:
            return false;
    }
}
/**
 * Checks if list is currently active
 */
function isListActive(editor, type) {
    if (!editor || !editor.isEditable)
        return false;
    switch (type) {
        case "bulletList":
            return editor.isActive("bulletList");
        case "orderedList":
            return editor.isActive("orderedList");
        case "taskList":
            return editor.isActive("taskList");
        default:
            return false;
    }
}
/**
 * Toggles list in the editor
 */
function toggleList(editor, type) {
    var _a, _b, _c;
    if (!editor || !editor.isEditable)
        return false;
    if (!canToggleList(editor, type))
        return false;
    try {
        var view = editor.view;
        var state = view.state;
        var tr = state.tr;
        // No selection, find the the cursor position
        if (state.selection.empty || state.selection instanceof state_1.TextSelection) {
            var pos = (_a = (0, utils_1.findNodePosition)({
                editor: editor,
                node: state.selection.$anchor.node(1),
            })) === null || _a === void 0 ? void 0 : _a.pos;
            if (!(0, utils_1.isValidPosition)(pos))
                return false;
            tr = tr.setSelection(state_1.NodeSelection.create(state.doc, pos));
            view.dispatch(tr);
            state = view.state;
        }
        var selection = state.selection;
        var chain_1 = editor.chain().focus();
        // Handle NodeSelection
        if (selection instanceof state_1.NodeSelection) {
            var firstChild = (_b = selection.node.firstChild) === null || _b === void 0 ? void 0 : _b.firstChild;
            var lastChild = (_c = selection.node.lastChild) === null || _c === void 0 ? void 0 : _c.lastChild;
            var from = firstChild
                ? selection.from + firstChild.nodeSize
                : selection.from + 1;
            var to = lastChild
                ? selection.to - lastChild.nodeSize
                : selection.to - 1;
            var resolvedFrom = state.doc.resolve(from);
            var resolvedTo = state.doc.resolve(to);
            chain_1 = chain_1
                .setTextSelection(state_1.TextSelection.between(resolvedFrom, resolvedTo))
                .clearNodes();
        }
        if (editor.isActive(type)) {
            // Unwrap list
            chain_1
                .liftListItem("listItem")
                .lift("bulletList")
                .lift("orderedList")
                .lift("taskList")
                .run();
        }
        else {
            // Wrap in specific list type
            var toggleMap = {
                // @ts-ignore
                bulletList: function () { return chain_1.toggleBulletList(); },
                // @ts-ignore
                orderedList: function () { return chain_1.toggleOrderedList(); },
                taskList: function () { return chain_1.toggleList("taskList", "taskItem"); },
            };
            var toggle = toggleMap[type];
            if (!toggle)
                return false;
            toggle().run();
        }
        editor.chain().focus().selectTextblockEnd().run();
        return true;
    }
    catch (_d) {
        return false;
    }
}
/**
 * Determines if the list button should be shown
 */
function shouldShowButton(props) {
    var editor = props.editor, type = props.type, hideWhenUnavailable = props.hideWhenUnavailable;
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isNodeInSchema)(type, editor))
        return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleList(editor, type);
    }
    return true;
}
/**
 * Custom hook that provides list functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MySimpleListButton() {
 *   const { isVisible, handleToggle, isActive } = useList({ type: "bulletList" })
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleToggle}>Bullet List</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedListButton() {
 *   const { isVisible, handleToggle, label, isActive } = useList({
 *     type: "orderedList",
 *     editor: myEditor,
 *     hideWhenUnavailable: true,
 *     onToggled: () => console.log('List toggled!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleToggle}
 *       aria-label={label}
 *       aria-pressed={isActive}
 *     >
 *       Toggle List
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useList(config) {
    var providedEditor = config.editor, type = config.type, _a = config.hideWhenUnavailable, hideWhenUnavailable = _a === void 0 ? false : _a, onToggled = config.onToggled;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _b = (0, react_1.useState)(true), isVisible = _b[0], setIsVisible = _b[1];
    var canToggle = canToggleList(editor, type);
    var isActive = isListActive(editor, type);
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleSelectionUpdate = function () {
            setIsVisible(shouldShowButton({ editor: editor, type: type, hideWhenUnavailable: hideWhenUnavailable }));
        };
        handleSelectionUpdate();
        editor.on("selectionUpdate", handleSelectionUpdate);
        return function () {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [editor, type, hideWhenUnavailable]);
    var handleToggle = (0, react_1.useCallback)(function () {
        if (!editor)
            return false;
        var success = toggleList(editor, type);
        if (success) {
            onToggled === null || onToggled === void 0 ? void 0 : onToggled();
        }
        return success;
    }, [editor, type, onToggled]);
    return {
        isVisible: isVisible,
        isActive: isActive,
        handleToggle: handleToggle,
        canToggle: canToggle,
        label: exports.listLabels[type],
        shortcutKeys: exports.LIST_SHORTCUT_KEYS[type],
        Icon: exports.listIcons[type],
    };
}
