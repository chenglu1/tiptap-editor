"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BLOCKQUOTE_SHORTCUT_KEY = void 0;
exports.canToggleBlockquote = canToggleBlockquote;
exports.toggleBlockquote = toggleBlockquote;
exports.shouldShowButton = shouldShowButton;
exports.useBlockquote = useBlockquote;
var react_1 = require("react");
var state_1 = require("@tiptap/pm/state");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Icons ---
var blockquote_icon_1 = require("../icons/blockquote-icon");
// --- UI Utils ---
var utils_1 = require("../utils");
exports.BLOCKQUOTE_SHORTCUT_KEY = "mod+shift+b";
/**
 * Checks if blockquote can be toggled in the current editor state
 */
function canToggleBlockquote(editor, turnInto) {
    if (turnInto === void 0) { turnInto = true; }
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isNodeInSchema)("blockquote", editor) ||
        (0, utils_1.isNodeTypeSelected)(editor, ["image"]))
        return false;
    if (!turnInto) {
        return editor.can().toggleWrap("blockquote");
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
    // Either we can wrap in blockquote directly on the selection,
    // or we can clear formatting/nodes to arrive at a blockquote.
    return editor.can().toggleWrap("blockquote") || editor.can().clearNodes();
}
/**
 * Toggles blockquote formatting for a specific node or the current selection
 */
function toggleBlockquote(editor) {
    var _a, _b, _c;
    if (!editor || !editor.isEditable)
        return false;
    if (!canToggleBlockquote(editor))
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
        var chain = editor.chain().focus();
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
            chain = chain
                .setTextSelection(state_1.TextSelection.between(resolvedFrom, resolvedTo))
                .clearNodes();
        }
        var toggle = editor.isActive("blockquote")
            ? chain.lift("blockquote")
            : chain.wrapIn("blockquote");
        toggle.run();
        editor.chain().focus().selectTextblockEnd().run();
        return true;
    }
    catch (_d) {
        return false;
    }
}
/**
 * Determines if the blockquote button should be shown
 */
function shouldShowButton(props) {
    var editor = props.editor, hideWhenUnavailable = props.hideWhenUnavailable;
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isNodeInSchema)("blockquote", editor))
        return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleBlockquote(editor);
    }
    return true;
}
/**
 * Custom hook that provides blockquote functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage - no params needed
 * function MySimpleBlockquoteButton() {
 *   const { isVisible, handleToggle, isActive } = useBlockquote()
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleToggle}>Blockquote</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedBlockquoteButton() {
 *   const { isVisible, handleToggle, label, isActive } = useBlockquote({
 *     editor: myEditor,
 *     hideWhenUnavailable: true,
 *     onToggled: () => console.log('Blockquote toggled!')
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
 *       Toggle Blockquote
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useBlockquote(config) {
    var _a = config || {}, providedEditor = _a.editor, _b = _a.hideWhenUnavailable, hideWhenUnavailable = _b === void 0 ? false : _b, onToggled = _a.onToggled;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _c = (0, react_1.useState)(true), isVisible = _c[0], setIsVisible = _c[1];
    var canToggle = canToggleBlockquote(editor);
    var isActive = (editor === null || editor === void 0 ? void 0 : editor.isActive("blockquote")) || false;
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleSelectionUpdate = function () {
            setIsVisible(shouldShowButton({ editor: editor, hideWhenUnavailable: hideWhenUnavailable }));
        };
        handleSelectionUpdate();
        editor.on("selectionUpdate", handleSelectionUpdate);
        return function () {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [editor, hideWhenUnavailable]);
    var handleToggle = (0, react_1.useCallback)(function () {
        if (!editor)
            return false;
        var success = toggleBlockquote(editor);
        if (success) {
            onToggled === null || onToggled === void 0 ? void 0 : onToggled();
        }
        return success;
    }, [editor, onToggled]);
    return {
        isVisible: isVisible,
        isActive: isActive,
        handleToggle: handleToggle,
        canToggle: canToggle,
        label: "Blockquote",
        shortcutKeys: exports.BLOCKQUOTE_SHORTCUT_KEY,
        Icon: blockquote_icon_1.BlockquoteIcon,
    };
}
