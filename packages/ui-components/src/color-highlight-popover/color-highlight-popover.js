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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorHighlightPopoverButton = void 0;
exports.ColorHighlightPopoverContent = ColorHighlightPopoverContent;
exports.ColorHighlightPopover = ColorHighlightPopover;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
var hooks_2 = require("@tiptap-editor/hooks");
var hooks_3 = require("@tiptap-editor/hooks");
// --- Icons ---
var ban_icon_1 = require("../icons/ban-icon");
var highlighter_icon_1 = require("../icons/highlighter-icon");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
var ui_primitives_2 = require("@tiptap-editor/ui-primitives");
var ui_primitives_3 = require("@tiptap-editor/ui-primitives");
var ui_primitives_4 = require("@tiptap-editor/ui-primitives");
var color_highlight_button_1 = require("../color-highlight-button");
exports.ColorHighlightPopoverButton = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)(ui_primitives_1.Button, __assign({ type: "button", className: className, "data-style": "ghost", "data-appearance": "default", role: "button", tabIndex: -1, "aria-label": "Highlight text", tooltip: "Highlight", ref: ref }, props, { children: children !== null && children !== void 0 ? children : (0, jsx_runtime_1.jsx)(highlighter_icon_1.HighlighterIcon, { className: "tiptap-button-icon" }) })));
});
exports.ColorHighlightPopoverButton.displayName = "ColorHighlightPopoverButton";
function ColorHighlightPopoverContent(_a) {
    var editor = _a.editor, _b = _a.colors, colors = _b === void 0 ? (0, color_highlight_button_1.pickHighlightColorsByValue)([
        "var(--tt-color-highlight-green)",
        "var(--tt-color-highlight-blue)",
        "var(--tt-color-highlight-red)",
        "var(--tt-color-highlight-purple)",
        "var(--tt-color-highlight-yellow)",
    ]) : _b;
    var handleRemoveHighlight = (0, color_highlight_button_1.useColorHighlight)({ editor: editor }).handleRemoveHighlight;
    var isMobile = (0, hooks_2.useIsMobile)();
    var containerRef = (0, react_1.useRef)(null);
    var menuItems = (0, react_1.useMemo)(function () { return __spreadArray(__spreadArray([], colors, true), [{ label: "Remove highlight", value: "none" }], false); }, [colors]);
    var selectedIndex = (0, hooks_1.useMenuNavigation)({
        containerRef: containerRef,
        items: menuItems,
        orientation: "both",
        onSelect: function (item) {
            if (!containerRef.current)
                return false;
            var highlightedElement = containerRef.current.querySelector('[data-highlighted="true"]');
            if (highlightedElement)
                highlightedElement.click();
            if (item.value === "none")
                handleRemoveHighlight();
            return true;
        },
        autoSelectFirstItem: false,
    }).selectedIndex;
    return ((0, jsx_runtime_1.jsx)(ui_primitives_4.Card, { ref: containerRef, tabIndex: 0, style: isMobile ? { boxShadow: "none", border: 0 } : {}, children: (0, jsx_runtime_1.jsx)(ui_primitives_4.CardBody, { style: isMobile ? { padding: 0 } : {}, children: (0, jsx_runtime_1.jsxs)(ui_primitives_4.CardItemGroup, { orientation: "horizontal", children: [(0, jsx_runtime_1.jsx)(ui_primitives_1.ButtonGroup, { orientation: "horizontal", children: colors.map(function (color, index) { return ((0, jsx_runtime_1.jsx)(color_highlight_button_1.ColorHighlightButton, { editor: editor, highlightColor: color.value, tooltip: color.label, "aria-label": "".concat(color.label, " highlight color"), tabIndex: index === selectedIndex ? 0 : -1, "data-highlighted": selectedIndex === index }, color.value)); }) }), (0, jsx_runtime_1.jsx)(ui_primitives_3.Separator, {}), (0, jsx_runtime_1.jsx)(ui_primitives_1.ButtonGroup, { orientation: "horizontal", children: (0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { onClick: handleRemoveHighlight, "aria-label": "Remove highlight", tooltip: "Remove highlight", tabIndex: selectedIndex === colors.length ? 0 : -1, type: "button", role: "menuitem", "data-style": "ghost", "data-highlighted": selectedIndex === colors.length, children: (0, jsx_runtime_1.jsx)(ban_icon_1.BanIcon, { className: "tiptap-button-icon" }) }) })] }) }) }));
}
function ColorHighlightPopover(_a) {
    var providedEditor = _a.editor, _b = _a.colors, colors = _b === void 0 ? (0, color_highlight_button_1.pickHighlightColorsByValue)([
        "var(--tt-color-highlight-green)",
        "var(--tt-color-highlight-blue)",
        "var(--tt-color-highlight-red)",
        "var(--tt-color-highlight-purple)",
        "var(--tt-color-highlight-yellow)",
    ]) : _b, _c = _a.hideWhenUnavailable, hideWhenUnavailable = _c === void 0 ? false : _c, onApplied = _a.onApplied, props = __rest(_a, ["editor", "colors", "hideWhenUnavailable", "onApplied"]);
    var editor = (0, hooks_3.useTiptapEditor)(providedEditor).editor;
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = (0, color_highlight_button_1.useColorHighlight)({
        editor: editor,
        hideWhenUnavailable: hideWhenUnavailable,
        onApplied: onApplied,
    }), isVisible = _e.isVisible, canColorHighlight = _e.canColorHighlight, isActive = _e.isActive, label = _e.label, Icon = _e.Icon;
    if (!isVisible)
        return null;
    return ((0, jsx_runtime_1.jsxs)(ui_primitives_2.Popover, { open: isOpen, onOpenChange: setIsOpen, children: [(0, jsx_runtime_1.jsx)(ui_primitives_2.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(exports.ColorHighlightPopoverButton, __assign({ disabled: !canColorHighlight, "data-active-state": isActive ? "on" : "off", "data-disabled": !canColorHighlight, "aria-pressed": isActive, "aria-label": label, tooltip: label }, props, { children: (0, jsx_runtime_1.jsx)(Icon, { className: "tiptap-button-icon" }) })) }), (0, jsx_runtime_1.jsx)(ui_primitives_2.PopoverContent, { "aria-label": "Highlight colors", children: (0, jsx_runtime_1.jsx)(ColorHighlightPopoverContent, { editor: editor, colors: colors }) })] }));
}
exports.default = ColorHighlightPopover;
