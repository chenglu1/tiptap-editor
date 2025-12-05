"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MARK_SHORTCUT_KEYS = exports.markIcons = void 0;
exports.canToggleMark = canToggleMark;
exports.isMarkActive = isMarkActive;
exports.toggleMark = toggleMark;
exports.shouldShowButton = shouldShowButton;
exports.getFormattedMarkName = getFormattedMarkName;
exports.useMark = useMark;
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Lib ---
var utils_1 = require("../utils");
// --- Icons ---
var bold_icon_1 = require("../icons/bold-icon");
var code2_icon_1 = require("../icons/code2-icon");
var italic_icon_1 = require("../icons/italic-icon");
var strike_icon_1 = require("../icons/strike-icon");
var subscript_icon_1 = require("../icons/subscript-icon");
var superscript_icon_1 = require("../icons/superscript-icon");
var underline_icon_1 = require("../icons/underline-icon");
exports.markIcons = {
    bold: bold_icon_1.BoldIcon,
    italic: italic_icon_1.ItalicIcon,
    underline: underline_icon_1.UnderlineIcon,
    strike: strike_icon_1.StrikeIcon,
    code: code2_icon_1.Code2Icon,
    superscript: superscript_icon_1.SuperscriptIcon,
    subscript: subscript_icon_1.SubscriptIcon,
};
exports.MARK_SHORTCUT_KEYS = {
    bold: "mod+b",
    italic: "mod+i",
    underline: "mod+u",
    strike: "mod+shift+s",
    code: "mod+e",
    superscript: "mod+.",
    subscript: "mod+,",
};
/**
 * Checks if a mark can be toggled in the current editor state
 */
function canToggleMark(editor, type) {
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isMarkInSchema)(type, editor) || (0, utils_1.isNodeTypeSelected)(editor, ["image"]))
        return false;
    return editor.can().toggleMark(type);
}
/**
 * Checks if a mark is currently active
 */
function isMarkActive(editor, type) {
    if (!editor || !editor.isEditable)
        return false;
    return editor.isActive(type);
}
/**
 * Toggles a mark in the editor
 */
function toggleMark(editor, type) {
    if (!editor || !editor.isEditable)
        return false;
    if (!canToggleMark(editor, type))
        return false;
    return editor.chain().focus().toggleMark(type).run();
}
/**
 * Determines if the mark button should be shown
 */
function shouldShowButton(props) {
    var editor = props.editor, type = props.type, hideWhenUnavailable = props.hideWhenUnavailable;
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isMarkInSchema)(type, editor))
        return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleMark(editor, type);
    }
    return true;
}
/**
 * Gets the formatted mark name
 */
function getFormattedMarkName(type) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}
/**
 * Custom hook that provides mark functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MySimpleBoldButton() {
 *   const { isVisible, handleMark } = useMark({ type: "bold" })
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleMark}>Bold</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedItalicButton() {
 *   const { isVisible, handleMark, label, isActive } = useMark({
 *     editor: myEditor,
 *     type: "italic",
 *     hideWhenUnavailable: true,
 *     onToggled: () => console.log('Mark toggled!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleMark}
 *       aria-pressed={isActive}
 *       aria-label={label}
 *     >
 *       Italic
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useMark(config) {
    var providedEditor = config.editor, type = config.type, _a = config.hideWhenUnavailable, hideWhenUnavailable = _a === void 0 ? false : _a, onToggled = config.onToggled;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _b = (0, react_1.useState)(true), isVisible = _b[0], setIsVisible = _b[1];
    var canToggle = canToggleMark(editor, type);
    var isActive = isMarkActive(editor, type);
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
    var handleMark = (0, react_1.useCallback)(function () {
        if (!editor)
            return false;
        var success = toggleMark(editor, type);
        if (success) {
            onToggled === null || onToggled === void 0 ? void 0 : onToggled();
        }
        return success;
    }, [editor, type, onToggled]);
    return {
        isVisible: isVisible,
        isActive: isActive,
        handleMark: handleMark,
        canToggle: canToggle,
        label: getFormattedMarkName(type),
        shortcutKeys: exports.MARK_SHORTCUT_KEYS[type],
        Icon: exports.markIcons[type],
    };
}
