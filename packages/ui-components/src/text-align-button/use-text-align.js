"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textAlignLabels = exports.textAlignIcons = exports.TEXT_ALIGN_SHORTCUT_KEYS = void 0;
exports.canSetTextAlign = canSetTextAlign;
exports.hasSetTextAlign = hasSetTextAlign;
exports.isTextAlignActive = isTextAlignActive;
exports.setTextAlign = setTextAlign;
exports.shouldShowButton = shouldShowButton;
exports.useTextAlign = useTextAlign;
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Lib ---
var utils_1 = require("../utils");
// --- Icons ---
var align_center_icon_1 = require("../icons/align-center-icon");
var align_justify_icon_1 = require("../icons/align-justify-icon");
var align_left_icon_1 = require("../icons/align-left-icon");
var align_right_icon_1 = require("../icons/align-right-icon");
exports.TEXT_ALIGN_SHORTCUT_KEYS = {
    left: "mod+shift+l",
    center: "mod+shift+e",
    right: "mod+shift+r",
    justify: "mod+shift+j",
};
exports.textAlignIcons = {
    left: align_left_icon_1.AlignLeftIcon,
    center: align_center_icon_1.AlignCenterIcon,
    right: align_right_icon_1.AlignRightIcon,
    justify: align_justify_icon_1.AlignJustifyIcon,
};
exports.textAlignLabels = {
    left: "Align left",
    center: "Align center",
    right: "Align right",
    justify: "Align justify",
};
/**
 * Checks if text alignment can be performed in the current editor state
 */
function canSetTextAlign(editor, align) {
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isExtensionAvailable)(editor, "textAlign") ||
        (0, utils_1.isNodeTypeSelected)(editor, ["image", "horizontalRule"]))
        return false;
    return; // @ts-ignoreeditor.can().setTextAligneditor.can().setTextAlign(align)
}
function hasSetTextAlign(commands) {
    return "setTextAlign" in commands;
}
/**
 * Checks if the text alignment is currently active
 */
function isTextAlignActive(editor, align) {
    if (!editor || !editor.isEditable)
        return false;
    return editor.isActive({ textAlign: align });
}
/**
 * Sets text alignment in the editor
 */
function setTextAlign(editor, align) {
    if (!editor || !editor.isEditable)
        return false;
    if (!canSetTextAlign(editor, align))
        return false;
    var chain = editor.chain().focus();
    if (hasSetTextAlign(chain)) {
        return chain.setTextAlign(align).run();
    }
    return false;
}
/**
 * Determines if the text align button should be shown
 */
function shouldShowButton(props) {
    var editor = props.editor, hideWhenUnavailable = props.hideWhenUnavailable, align = props.align;
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isExtensionAvailable)(editor, "textAlign"))
        return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canSetTextAlign(editor, align);
    }
    return true;
}
/**
 * Custom hook that provides text align functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MySimpleAlignButton() {
 *   const { isVisible, handleTextAlign } = useTextAlign({ align: "center" })
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleTextAlign}>Align Center</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedAlignButton() {
 *   const { isVisible, handleTextAlign, label, isActive } = useTextAlign({
 *     editor: myEditor,
 *     align: "right",
 *     hideWhenUnavailable: true,
 *     onAligned: () => console.log('Text aligned!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleTextAlign}
 *       aria-pressed={isActive}
 *       aria-label={label}
 *     >
 *       Align Right
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useTextAlign(config) {
    var providedEditor = config.editor, align = config.align, _a = config.hideWhenUnavailable, hideWhenUnavailable = _a === void 0 ? false : _a, onAligned = config.onAligned;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _b = (0, react_1.useState)(true), isVisible = _b[0], setIsVisible = _b[1];
    var canAlign = canSetTextAlign(editor, align);
    var isActive = isTextAlignActive(editor, align);
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleSelectionUpdate = function () {
            setIsVisible(shouldShowButton({ editor: editor, align: align, hideWhenUnavailable: hideWhenUnavailable }));
        };
        handleSelectionUpdate();
        editor.on("selectionUpdate", handleSelectionUpdate);
        return function () {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [editor, hideWhenUnavailable, align]);
    var handleTextAlign = (0, react_1.useCallback)(function () {
        if (!editor)
            return false;
        var success = setTextAlign(editor, align);
        if (success) {
            onAligned === null || onAligned === void 0 ? void 0 : onAligned();
        }
        return success;
    }, [editor, align, onAligned]);
    return {
        isVisible: isVisible,
        isActive: isActive,
        handleTextAlign: handleTextAlign,
        canAlign: canAlign,
        label: exports.textAlignLabels[align],
        shortcutKeys: exports.TEXT_ALIGN_SHORTCUT_KEYS[align],
        Icon: exports.textAlignIcons[align],
    };
}
