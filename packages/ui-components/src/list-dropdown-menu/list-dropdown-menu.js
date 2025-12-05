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
exports.ListDropdownMenu = ListDropdownMenu;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Icons ---
var chevron_down_icon_1 = require("../icons/chevron-down-icon");
// --- Tiptap UI ---
var list_button_1 = require("../list-button");
var use_list_dropdown_menu_1 = require("./use-list-dropdown-menu");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
var ui_primitives_2 = require("@tiptap-editor/ui-primitives");
var ui_primitives_3 = require("@tiptap-editor/ui-primitives");
function ListDropdownMenu(_a) {
    var providedEditor = _a.editor, _b = _a.types, types = _b === void 0 ? ["bulletList", "orderedList", "taskList"] : _b, _c = _a.hideWhenUnavailable, hideWhenUnavailable = _c === void 0 ? false : _c, onOpenChange = _a.onOpenChange, _d = _a.portal, portal = _d === void 0 ? false : _d, props = __rest(_a, ["editor", "types", "hideWhenUnavailable", "onOpenChange", "portal"]);
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _e = (0, react_1.useState)(false), isOpen = _e[0], setIsOpen = _e[1];
    var _f = (0, use_list_dropdown_menu_1.useListDropdownMenu)({
        editor: editor,
        types: types,
        hideWhenUnavailable: hideWhenUnavailable,
    }), filteredLists = _f.filteredLists, canToggle = _f.canToggle, isActive = _f.isActive, isVisible = _f.isVisible, Icon = _f.Icon;
    var handleOnOpenChange = (0, react_1.useCallback)(function (open) {
        setIsOpen(open);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(open);
    }, [onOpenChange]);
    if (!isVisible || !editor || !editor.isEditable) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(ui_primitives_2.DropdownMenu, { open: isOpen, onOpenChange: handleOnOpenChange, children: [(0, jsx_runtime_1.jsx)(ui_primitives_2.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(ui_primitives_1.Button, __assign({ type: "button", "data-style": "ghost", "data-active-state": isActive ? "on" : "off", role: "button", tabIndex: -1, disabled: !canToggle, "data-disabled": !canToggle, "aria-label": "List options", tooltip: "List" }, props, { children: [(0, jsx_runtime_1.jsx)(Icon, { className: "tiptap-button-icon" }), (0, jsx_runtime_1.jsx)(chevron_down_icon_1.ChevronDownIcon, { className: "tiptap-button-dropdown-small" })] })) }), (0, jsx_runtime_1.jsx)(ui_primitives_2.DropdownMenuContent, { align: "start", portal: portal, children: (0, jsx_runtime_1.jsx)(ui_primitives_3.Card, { children: (0, jsx_runtime_1.jsx)(ui_primitives_3.CardBody, { children: (0, jsx_runtime_1.jsx)(ui_primitives_1.ButtonGroup, { children: filteredLists.map(function (option) { return ((0, jsx_runtime_1.jsx)(ui_primitives_2.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(list_button_1.ListButton, { editor: editor, type: option.type, text: option.label, showTooltip: false }) }, option.type)); }) }) }) }) })] }));
}
exports.default = ListDropdownMenu;
