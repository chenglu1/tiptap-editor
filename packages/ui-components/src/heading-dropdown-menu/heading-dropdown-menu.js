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
exports.HeadingDropdownMenu = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// --- Icons ---
var chevron_down_icon_1 = require("../icons/chevron-down-icon");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Tiptap UI ---
var heading_button_1 = require("../heading-button");
var heading_dropdown_menu_1 = require("../heading-dropdown-menu");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
var ui_primitives_2 = require("@tiptap-editor/ui-primitives");
var ui_primitives_3 = require("@tiptap-editor/ui-primitives");
/**
 * Dropdown menu component for selecting heading levels in a Tiptap editor.
 *
 * For custom dropdown implementations, use the `useHeadingDropdownMenu` hook instead.
 */
exports.HeadingDropdownMenu = (0, react_1.forwardRef)(function (_a, ref) {
    var providedEditor = _a.editor, _b = _a.levels, levels = _b === void 0 ? [1, 2, 3, 4, 5, 6] : _b, _c = _a.hideWhenUnavailable, hideWhenUnavailable = _c === void 0 ? false : _c, _d = _a.portal, portal = _d === void 0 ? false : _d, onOpenChange = _a.onOpenChange, buttonProps = __rest(_a, ["editor", "levels", "hideWhenUnavailable", "portal", "onOpenChange"]);
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _e = (0, react_1.useState)(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = (0, heading_dropdown_menu_1.useHeadingDropdownMenu)({
        editor: editor,
        levels: levels,
        hideWhenUnavailable: hideWhenUnavailable,
    }), isVisible = _f.isVisible, isActive = _f.isActive, canToggle = _f.canToggle, Icon = _f.Icon;
    var handleOpenChange = (0, react_1.useCallback)(function (open) {
        if (!editor || !canToggle)
            return;
        setIsOpen(open);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(open);
    }, [canToggle, editor, onOpenChange]);
    if (!isVisible) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(ui_primitives_2.DropdownMenu, { modal: true, open: isOpen, onOpenChange: handleOpenChange, children: [(0, jsx_runtime_1.jsx)(ui_primitives_2.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(ui_primitives_1.Button, __assign({ type: "button", "data-style": "ghost", "data-active-state": isActive ? "on" : "off", role: "button", tabIndex: -1, disabled: !canToggle, "data-disabled": !canToggle, "aria-label": "Format text as heading", "aria-pressed": isActive, tooltip: "Heading" }, buttonProps, { ref: ref, children: [(0, jsx_runtime_1.jsx)(Icon, { className: "tiptap-button-icon" }), (0, jsx_runtime_1.jsx)(chevron_down_icon_1.ChevronDownIcon, { className: "tiptap-button-dropdown-small" })] })) }), (0, jsx_runtime_1.jsx)(ui_primitives_2.DropdownMenuContent, { align: "start", portal: portal, children: (0, jsx_runtime_1.jsx)(ui_primitives_3.Card, { children: (0, jsx_runtime_1.jsx)(ui_primitives_3.CardBody, { children: (0, jsx_runtime_1.jsx)(ui_primitives_1.ButtonGroup, { children: levels.map(function (level) { return ((0, jsx_runtime_1.jsx)(ui_primitives_2.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(heading_button_1.HeadingButton, { editor: editor, level: level, text: "Heading ".concat(level), showTooltip: false }) }, "heading-".concat(level))); }) }) }) }) })] }));
});
exports.HeadingDropdownMenu.displayName = "HeadingDropdownMenu";
exports.default = exports.HeadingDropdownMenu;
