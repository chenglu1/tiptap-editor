"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_UPLOAD_SHORTCUT_KEY = void 0;
exports.canInsertImage = canInsertImage;
exports.isImageActive = isImageActive;
exports.insertImage = insertImage;
exports.shouldShowButton = shouldShowButton;
exports.useImageUpload = useImageUpload;
var react_1 = require("react");
var react_hotkeys_hook_1 = require("react-hotkeys-hook");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
var hooks_2 = require("@tiptap-editor/hooks");
// --- Lib ---
var utils_1 = require("../utils");
// --- Icons ---
var image_plus_icon_1 = require("../icons/image-plus-icon");
exports.IMAGE_UPLOAD_SHORTCUT_KEY = "mod+shift+i";
/**
 * Checks if image can be inserted in the current editor state
 */
function canInsertImage(editor) {
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isExtensionAvailable)(editor, "imageUpload") ||
        (0, utils_1.isNodeTypeSelected)(editor, ["image"]))
        return false;
    return editor.can().insertContent({ type: "imageUpload" });
}
/**
 * Checks if image is currently active
 */
function isImageActive(editor) {
    if (!editor || !editor.isEditable)
        return false;
    return editor.isActive("imageUpload");
}
/**
 * Inserts an image in the editor
 */
function insertImage(editor) {
    if (!editor || !editor.isEditable)
        return false;
    if (!canInsertImage(editor))
        return false;
    try {
        return editor
            .chain()
            .focus()
            .insertContent({
            type: "imageUpload",
        })
            .run();
    }
    catch (_a) {
        return false;
    }
}
/**
 * Determines if the image button should be shown
 */
function shouldShowButton(props) {
    var editor = props.editor, hideWhenUnavailable = props.hideWhenUnavailable;
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isExtensionAvailable)(editor, "imageUpload"))
        return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canInsertImage(editor);
    }
    return true;
}
/**
 * Custom hook that provides image functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage - no params needed
 * function MySimpleImageButton() {
 *   const { isVisible, handleImage } = useImage()
 *
 *   if (!isVisible) return null
 *
 *   return <button onClick={handleImage}>Add Image</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedImageButton() {
 *   const { isVisible, handleImage, label, isActive } = useImage({
 *     editor: myEditor,
 *     hideWhenUnavailable: true,
 *     onInserted: () => console.log('Image inserted!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleImage}
 *       aria-pressed={isActive}
 *       aria-label={label}
 *     >
 *       Add Image
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useImageUpload(config) {
    var _a = config || {}, providedEditor = _a.editor, _b = _a.hideWhenUnavailable, hideWhenUnavailable = _b === void 0 ? false : _b, onInserted = _a.onInserted;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var isMobile = (0, hooks_2.useIsMobile)();
    var _c = (0, react_1.useState)(true), isVisible = _c[0], setIsVisible = _c[1];
    var canInsert = canInsertImage(editor);
    var isActive = isImageActive(editor);
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
    var handleImage = (0, react_1.useCallback)(function () {
        if (!editor)
            return false;
        var success = insertImage(editor);
        if (success) {
            onInserted === null || onInserted === void 0 ? void 0 : onInserted();
        }
        return success;
    }, [editor, onInserted]);
    (0, react_hotkeys_hook_1.useHotkeys)(exports.IMAGE_UPLOAD_SHORTCUT_KEY, function (event) {
        event.preventDefault();
        handleImage();
    }, {
        enabled: isVisible && canInsert,
        enableOnContentEditable: !isMobile,
        enableOnFormTags: true,
    });
    return {
        isVisible: isVisible,
        isActive: isActive,
        handleImage: handleImage,
        canInsert: canInsert,
        label: "Add image",
        shortcutKeys: exports.IMAGE_UPLOAD_SHORTCUT_KEY,
        Icon: image_plus_icon_1.ImagePlusIcon,
    };
}
