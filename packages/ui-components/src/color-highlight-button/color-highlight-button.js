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
exports.ColorHighlightButton = void 0;
exports.ColorHighlightShortcutBadge = ColorHighlightShortcutBadge;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// --- Lib ---
var utils_1 = require("../utils");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
var color_highlight_button_1 = require("../color-highlight-button");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
var ui_primitives_2 = require("@tiptap-editor/ui-primitives");
// --- Styles ---
require("../color-highlight-button/color-highlight-button.scss");
function ColorHighlightShortcutBadge(_a) {
    var _b = _a.shortcutKeys, shortcutKeys = _b === void 0 ? color_highlight_button_1.COLOR_HIGHLIGHT_SHORTCUT_KEY : _b;
    return (0, jsx_runtime_1.jsx)(ui_primitives_2.Badge, { children: (0, utils_1.parseShortcutKeys)(shortcutKeys) });
}
/**
 * Button component for applying color highlights in a Tiptap editor.
 *
 * Supports two highlighting modes:
 * - "mark": Uses the highlight mark extension (default)
 * - "node": Uses the node background extension
 *
 * For custom button implementations, use the `useColorHighlight` hook instead.
 *
 * @example
 * ```tsx
 * // Mark-based highlighting (default)
 * <ColorHighlightButton highlightColor="yellow" />
 *
 * // Node-based background coloring
 * <ColorHighlightButton
 *   highlightColor="var(--tt-color-highlight-blue)"
 *   mode="node"
 * />
 *
 * // With custom callback
 * <ColorHighlightButton
 *   highlightColor="red"
 *   mode="mark"
 *   onApplied={({ color, mode }) => console.log(`Applied ${color} in ${mode} mode`)}
 * />
 * ```
 */
exports.ColorHighlightButton = (0, react_1.forwardRef)(function (_a, ref) {
    var providedEditor = _a.editor, highlightColor = _a.highlightColor, text = _a.text, _b = _a.hideWhenUnavailable, hideWhenUnavailable = _b === void 0 ? false : _b, _c = _a.mode, mode = _c === void 0 ? "mark" : _c, onApplied = _a.onApplied, _d = _a.showShortcut, showShortcut = _d === void 0 ? false : _d, onClick = _a.onClick, children = _a.children, style = _a.style, buttonProps = __rest(_a, ["editor", "highlightColor", "text", "hideWhenUnavailable", "mode", "onApplied", "showShortcut", "onClick", "children", "style"]);
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _e = (0, color_highlight_button_1.useColorHighlight)({
        editor: editor,
        highlightColor: highlightColor,
        label: text || "Toggle highlight (".concat(highlightColor, ")"),
        hideWhenUnavailable: hideWhenUnavailable,
        mode: mode,
        onApplied: onApplied,
    }), isVisible = _e.isVisible, canColorHighlight = _e.canColorHighlight, isActive = _e.isActive, handleColorHighlight = _e.handleColorHighlight, label = _e.label, shortcutKeys = _e.shortcutKeys;
    var handleClick = (0, react_1.useCallback)(function (event) {
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
        if (event.defaultPrevented)
            return;
        handleColorHighlight();
    }, [handleColorHighlight, onClick]);
    var buttonStyle = (0, react_1.useMemo)(function () {
        return (__assign(__assign({}, style), { "--highlight-color": highlightColor }));
    }, [highlightColor, style]);
    if (!isVisible) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(ui_primitives_1.Button, __assign({ type: "button", "data-style": "ghost", "data-active-state": isActive ? "on" : "off", role: "button", tabIndex: -1, disabled: !canColorHighlight, "data-disabled": !canColorHighlight, "aria-label": label, "aria-pressed": isActive, tooltip: label, onClick: handleClick, style: buttonStyle }, buttonProps, { ref: ref, children: children !== null && children !== void 0 ? children : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("span", { className: "tiptap-button-highlight", style: { "--highlight-color": highlightColor } }), text && (0, jsx_runtime_1.jsx)("span", { className: "tiptap-button-text", children: text }), showShortcut && ((0, jsx_runtime_1.jsx)(ColorHighlightShortcutBadge, { shortcutKeys: shortcutKeys }))] })) })));
});
exports.ColorHighlightButton.displayName = "ColorHighlightButton";
