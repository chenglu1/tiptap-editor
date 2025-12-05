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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadButton = void 0;
exports.ImageShortcutBadge = ImageShortcutBadge;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// --- Lib ---
var utils_1 = require("../utils");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
var image_upload_button_1 = require("../image-upload-button");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
var ui_primitives_2 = require("@tiptap-editor/ui-primitives");
function ImageShortcutBadge(_a) {
    var _b = _a.shortcutKeys, shortcutKeys = _b === void 0 ? image_upload_button_1.IMAGE_UPLOAD_SHORTCUT_KEY : _b;
    return (0, jsx_runtime_1.jsx)(ui_primitives_2.Badge, { children: (0, utils_1.parseShortcutKeys)(shortcutKeys) });
}
/**
 * Button component for uploading/inserting images in a Tiptap editor.
 *
 * For custom button implementations, use the `useImage` hook instead.
 */
exports.ImageUploadButton = (0, react_1.forwardRef)(function (_a, ref) {
    var providedEditor = _a.editor, text = _a.text, _b = _a.hideWhenUnavailable, hideWhenUnavailable = _b === void 0 ? false : _b, onInserted = _a.onInserted, _c = _a.showShortcut, showShortcut = _c === void 0 ? false : _c, onClick = _a.onClick, children = _a.children, buttonProps = __rest(_a, ["editor", "text", "hideWhenUnavailable", "onInserted", "showShortcut", "onClick", "children"]);
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _d = (0, image_upload_button_1.useImageUpload)({
        editor: editor,
        hideWhenUnavailable: hideWhenUnavailable,
        onInserted: onInserted,
    }), isVisible = _d.isVisible, canInsert = _d.canInsert, handleImage = _d.handleImage, label = _d.label, isActive = _d.isActive, shortcutKeys = _d.shortcutKeys, Icon = _d.Icon;
    var handleClick = (0, react_1.useCallback)(function (event) {
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
        if (event.defaultPrevented)
            return;
        handleImage();
    }, [handleImage, onClick]);
    if (!isVisible) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(ui_primitives_1.Button, __assign({ type: "button", "data-style": "ghost", "data-active-state": isActive ? "on" : "off", role: "button", tabIndex: -1, disabled: !canInsert, "data-disabled": !canInsert, "aria-label": label, "aria-pressed": isActive, tooltip: label, onClick: handleClick }, buttonProps, { ref: ref, children: children !== null && children !== void 0 ? children : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Icon, { className: "tiptap-button-icon" }), text && (0, jsx_runtime_1.jsx)("span", { className: "tiptap-button-text", children: text }), showShortcut && (0, jsx_runtime_1.jsx)(ImageShortcutBadge, { shortcutKeys: shortcutKeys })] })) })));
});
exports.ImageUploadButton.displayName = "ImageUploadButton";
