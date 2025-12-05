"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyIcons = exports.historyActionLabels = exports.UNDO_REDO_SHORTCUT_KEYS = void 0;
exports.canExecuteUndoRedoAction = canExecuteUndoRedoAction;
exports.executeUndoRedoAction = executeUndoRedoAction;
exports.shouldShowButton = shouldShowButton;
exports.useUndoRedo = useUndoRedo;
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Lib ---
var utils_1 = require("../utils");
// --- Icons ---
var redo2_icon_1 = require("../icons/redo2-icon");
var undo2_icon_1 = require("../icons/undo2-icon");
exports.UNDO_REDO_SHORTCUT_KEYS = {
    undo: "mod+z",
    redo: "mod+shift+z",
};
exports.historyActionLabels = {
    undo: "Undo",
    redo: "Redo",
};
exports.historyIcons = {
    undo: undo2_icon_1.Undo2Icon,
    redo: redo2_icon_1.Redo2Icon,
};
/**
 * Checks if a history action can be executed
 */
function canExecuteUndoRedoAction(editor, action) {
    if (!editor || !editor.isEditable)
        return false;
    if ((0, utils_1.isNodeTypeSelected)(editor, ["image"]))
        return false;
    // @ts-ignore
    return action === "undo" ? editor.can().undo() : editor.can().redo();
}
/**
 * Executes a history action on the editor
 */
function executeUndoRedoAction(editor, action) {
    if (!editor || !editor.isEditable)
        return false;
    if (!canExecuteUndoRedoAction(editor, action))
        return false;
    var chain = editor.chain().focus();
    // @ts-ignore
    return action === "undo" ? chain.undo().run() : chain.redo().run();
}
/**
 * Determines if the history button should be shown
 */
function shouldShowButton(props) {
    var editor = props.editor, hideWhenUnavailable = props.hideWhenUnavailable, action = props.action;
    if (!editor || !editor.isEditable)
        return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canExecuteUndoRedoAction(editor, action);
    }
    return true;
}
/**
 * Custom hook that provides history functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MySimpleUndoButton() {
 *   const { isVisible, handleAction } = useHistory({ action: "undo" })
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleAction}>Undo</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedRedoButton() {
 *   const { isVisible, handleAction, label } = useHistory({
 *     editor: myEditor,
 *     action: "redo",
 *     hideWhenUnavailable: true,
 *     onExecuted: () => console.log('Action executed!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleAction}
 *       aria-label={label}
 *     >
 *       Redo
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useUndoRedo(config) {
    var providedEditor = config.editor, action = config.action, _a = config.hideWhenUnavailable, hideWhenUnavailable = _a === void 0 ? false : _a, onExecuted = config.onExecuted;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _b = (0, react_1.useState)(true), isVisible = _b[0], setIsVisible = _b[1];
    var canExecute = canExecuteUndoRedoAction(editor, action);
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleUpdate = function () {
            setIsVisible(shouldShowButton({ editor: editor, hideWhenUnavailable: hideWhenUnavailable, action: action }));
        };
        handleUpdate();
        editor.on("transaction", handleUpdate);
        return function () {
            editor.off("transaction", handleUpdate);
        };
    }, [editor, hideWhenUnavailable, action]);
    var handleAction = (0, react_1.useCallback)(function () {
        if (!editor)
            return false;
        var success = executeUndoRedoAction(editor, action);
        if (success) {
            onExecuted === null || onExecuted === void 0 ? void 0 : onExecuted();
        }
        return success;
    }, [editor, action, onExecuted]);
    return {
        isVisible: isVisible,
        handleAction: handleAction,
        canExecute: canExecute,
        label: exports.historyActionLabels[action],
        shortcutKeys: exports.UNDO_REDO_SHORTCUT_KEYS[action],
        Icon: exports.historyIcons[action],
    };
}
