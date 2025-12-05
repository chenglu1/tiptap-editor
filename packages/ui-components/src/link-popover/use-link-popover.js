"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.canSetLink = canSetLink;
exports.isLinkActive = isLinkActive;
exports.shouldShowLinkButton = shouldShowLinkButton;
exports.useLinkHandler = useLinkHandler;
exports.useLinkState = useLinkState;
exports.useLinkPopover = useLinkPopover;
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Icons ---
var link_icon_1 = require("../icons/link-icon");
// --- Lib ---
var utils_1 = require("../utils");
/**
 * Checks if a link can be set in the current editor state
 */
function canSetLink(editor) {
    if (!editor || !editor.isEditable)
        return false;
    return editor.can().setMark("link");
}
/**
 * Checks if a link is currently active in the editor
 */
function isLinkActive(editor) {
    if (!editor || !editor.isEditable)
        return false;
    return editor.isActive("link");
}
/**
 * Determines if the link button should be shown
 */
function shouldShowLinkButton(props) {
    var editor = props.editor, hideWhenUnavailable = props.hideWhenUnavailable;
    var linkInSchema = (0, utils_1.isMarkInSchema)("link", editor);
    if (!linkInSchema || !editor) {
        return false;
    }
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canSetLink(editor);
    }
    return true;
}
/**
 * Custom hook for handling link operations in a Tiptap editor
 */
function useLinkHandler(props) {
    var editor = props.editor, onSetLink = props.onSetLink;
    var _a = (0, react_1.useState)(null), url = _a[0], setUrl = _a[1];
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        // Get URL immediately on mount
        var href = editor.getAttributes("link").href;
        if (isLinkActive(editor) && url === null) {
            setUrl(href || "");
        }
    }, [editor, url]);
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var updateLinkState = function () {
            var href = editor.getAttributes("link").href;
            setUrl(href || "");
        };
        editor.on("selectionUpdate", updateLinkState);
        return function () {
            editor.off("selectionUpdate", updateLinkState);
        };
    }, [editor]);
    var setLink = (0, react_1.useCallback)(function () {
        if (!url || !editor)
            return;
        var selection = editor.state.selection;
        var isEmpty = selection.empty;
        var chain = editor.chain().focus();
        chain = chain.extendMarkRange("link"); // @ts-ignore.setLink(.setLink({ href: url })
        if (isEmpty) {
            chain = chain.insertContent({ type: "text", text: url });
        }
        chain.run();
        setUrl(null);
        onSetLink === null || onSetLink === void 0 ? void 0 : onSetLink();
    }, [editor, onSetLink, url]);
    var removeLink = (0, react_1.useCallback)(function () {
        if (!editor)
            return;
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            // @ts-ignore.unsetLink().unsetLink()
            .setMeta("preventAutolink", true)
            .run();
        setUrl("");
    }, [editor]);
    var openLink = (0, react_1.useCallback)(function (target, features) {
        if (target === void 0) { target = "_blank"; }
        if (features === void 0) { features = "noopener,noreferrer"; }
        if (!url)
            return;
        var safeUrl = (0, utils_1.sanitizeUrl)(url, window.location.href);
        if (safeUrl !== "#") {
            window.open(safeUrl, target, features);
        }
    }, [url]);
    return {
        url: url || "",
        setUrl: setUrl,
        setLink: setLink,
        removeLink: removeLink,
        openLink: openLink,
    };
}
/**
 * Custom hook for link popover state management
 */
function useLinkState(props) {
    var editor = props.editor, _a = props.hideWhenUnavailable, hideWhenUnavailable = _a === void 0 ? false : _a;
    var canSet = canSetLink(editor);
    var isActive = isLinkActive(editor);
    var _b = (0, react_1.useState)(false), isVisible = _b[0], setIsVisible = _b[1];
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleSelectionUpdate = function () {
            setIsVisible(shouldShowLinkButton({
                editor: editor,
                hideWhenUnavailable: hideWhenUnavailable,
            }));
        };
        handleSelectionUpdate();
        editor.on("selectionUpdate", handleSelectionUpdate);
        return function () {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [editor, hideWhenUnavailable]);
    return {
        isVisible: isVisible,
        canSet: canSet,
        isActive: isActive,
    };
}
/**
 * Main hook that provides link popover functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MyLinkButton() {
 *   const { isVisible, canSet, isActive, Icon, label } = useLinkPopover()
 *
 *   if (!isVisible) return null
 *
 *   return <button disabled={!canSet}>Link</button>
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedLinkButton() {
 *   const { isVisible, canSet, isActive, Icon, label } = useLinkPopover({
 *     editor: myEditor,
 *     hideWhenUnavailable: true,
 *     onSetLink: () => console.log('Link set!')
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       disabled={!canSet}
 *       aria-label={label}
 *       aria-pressed={isActive}
 *     >
 *       <Icon />
 *       {label}
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useLinkPopover(config) {
    var _a = config || {}, providedEditor = _a.editor, _b = _a.hideWhenUnavailable, hideWhenUnavailable = _b === void 0 ? false : _b, onSetLink = _a.onSetLink;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _c = useLinkState({
        editor: editor,
        hideWhenUnavailable: hideWhenUnavailable,
    }), isVisible = _c.isVisible, canSet = _c.canSet, isActive = _c.isActive;
    var linkHandler = useLinkHandler({
        editor: editor,
        onSetLink: onSetLink,
    });
    return __assign({ isVisible: isVisible, canSet: canSet, isActive: isActive, label: "Link", Icon: link_icon_1.LinkIcon }, linkHandler);
}
