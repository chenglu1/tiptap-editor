"use client";
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
exports.LinkPopover = exports.LinkContent = exports.LinkButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
var hooks_2 = require("@tiptap-editor/hooks");
// --- Icons ---
var corner_down_left_icon_1 = require("../icons/corner-down-left-icon");
var external_link_icon_1 = require("../icons/external-link-icon");
var link_icon_1 = require("../icons/link-icon");
var trash_icon_1 = require("../icons/trash-icon");
var link_popover_1 = require("../link-popover");
var ui_primitives_1 = require("@tiptap-editor/ui-primitives");
var ui_primitives_2 = require("@tiptap-editor/ui-primitives");
var ui_primitives_3 = require("@tiptap-editor/ui-primitives");
var ui_primitives_4 = require("@tiptap-editor/ui-primitives");
var ui_primitives_5 = require("@tiptap-editor/ui-primitives");
/**
 * Link button component for triggering the link popover
 */
exports.LinkButton = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)(ui_primitives_1.Button, __assign({ type: "button", className: className, "data-style": "ghost", role: "button", tabIndex: -1, "aria-label": "Link", tooltip: "Link", ref: ref }, props, { children: children || (0, jsx_runtime_1.jsx)(link_icon_1.LinkIcon, { className: "tiptap-button-icon" }) })));
});
exports.LinkButton.displayName = "LinkButton";
/**
 * Main content component for the link popover
 */
var LinkMain = function (_a) {
    var url = _a.url, setUrl = _a.setUrl, setLink = _a.setLink, removeLink = _a.removeLink, openLink = _a.openLink, isActive = _a.isActive;
    var isMobile = (0, hooks_1.useIsMobile)();
    var handleKeyDown = function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            setLink();
        }
    };
    return ((0, jsx_runtime_1.jsx)(ui_primitives_4.Card, { style: __assign({}, (isMobile ? { boxShadow: "none", border: 0 } : {})), children: (0, jsx_runtime_1.jsx)(ui_primitives_4.CardBody, { style: __assign({}, (isMobile ? { padding: 0 } : {})), children: (0, jsx_runtime_1.jsxs)(ui_primitives_4.CardItemGroup, { orientation: "horizontal", children: [(0, jsx_runtime_1.jsx)(ui_primitives_5.InputGroup, { children: (0, jsx_runtime_1.jsx)(ui_primitives_5.Input, { type: "url", placeholder: "Paste a link...", value: url, onChange: function (e) { return setUrl(e.target.value); }, onKeyDown: handleKeyDown, autoFocus: true, autoComplete: "off", autoCorrect: "off", autoCapitalize: "off" }) }), (0, jsx_runtime_1.jsx)(ui_primitives_1.ButtonGroup, { orientation: "horizontal", children: (0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { type: "button", onClick: setLink, title: "Apply link", disabled: !url && !isActive, "data-style": "ghost", children: (0, jsx_runtime_1.jsx)(corner_down_left_icon_1.CornerDownLeftIcon, { className: "tiptap-button-icon" }) }) }), (0, jsx_runtime_1.jsx)(ui_primitives_3.Separator, {}), (0, jsx_runtime_1.jsxs)(ui_primitives_1.ButtonGroup, { orientation: "horizontal", children: [(0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { type: "button", onClick: openLink, title: "Open in new window", disabled: !url && !isActive, "data-style": "ghost", children: (0, jsx_runtime_1.jsx)(external_link_icon_1.ExternalLinkIcon, { className: "tiptap-button-icon" }) }), (0, jsx_runtime_1.jsx)(ui_primitives_1.Button, { type: "button", onClick: removeLink, title: "Remove link", disabled: !url && !isActive, "data-style": "ghost", children: (0, jsx_runtime_1.jsx)(trash_icon_1.TrashIcon, { className: "tiptap-button-icon" }) })] })] }) }) }));
};
/**
 * Link content component for standalone use
 */
var LinkContent = function (_a) {
    var editor = _a.editor;
    var linkPopover = (0, link_popover_1.useLinkPopover)({
        editor: editor,
    });
    return (0, jsx_runtime_1.jsx)(LinkMain, __assign({}, linkPopover));
};
exports.LinkContent = LinkContent;
/**
 * Link popover component for Tiptap editors.
 *
 * For custom popover implementations, use the `useLinkPopover` hook instead.
 */
exports.LinkPopover = (0, react_1.forwardRef)(function (_a, ref) {
    var providedEditor = _a.editor, _b = _a.hideWhenUnavailable, hideWhenUnavailable = _b === void 0 ? false : _b, onSetLink = _a.onSetLink, onOpenChange = _a.onOpenChange, _c = _a.autoOpenOnLinkActive, autoOpenOnLinkActive = _c === void 0 ? true : _c, onClick = _a.onClick, children = _a.children, buttonProps = __rest(_a, ["editor", "hideWhenUnavailable", "onSetLink", "onOpenChange", "autoOpenOnLinkActive", "onClick", "children"]);
    var editor = (0, hooks_2.useTiptapEditor)(providedEditor).editor;
    var _d = (0, react_1.useState)(false), isOpen = _d[0], setIsOpen = _d[1];
    var _e = (0, link_popover_1.useLinkPopover)({
        editor: editor,
        hideWhenUnavailable: hideWhenUnavailable,
        onSetLink: onSetLink,
    }), isVisible = _e.isVisible, canSet = _e.canSet, isActive = _e.isActive, url = _e.url, setUrl = _e.setUrl, setLink = _e.setLink, removeLink = _e.removeLink, openLink = _e.openLink, label = _e.label, Icon = _e.Icon;
    var handleOnOpenChange = (0, react_1.useCallback)(function (nextIsOpen) {
        setIsOpen(nextIsOpen);
        onOpenChange === null || onOpenChange === void 0 ? void 0 : onOpenChange(nextIsOpen);
    }, [onOpenChange]);
    var handleSetLink = (0, react_1.useCallback)(function () {
        setLink();
        setIsOpen(false);
    }, [setLink]);
    var handleClick = (0, react_1.useCallback)(function (event) {
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
        if (event.defaultPrevented)
            return;
        setIsOpen(!isOpen);
    }, [onClick, isOpen]);
    (0, react_1.useEffect)(function () {
        if (autoOpenOnLinkActive && isActive) {
            setIsOpen(true);
        }
    }, [autoOpenOnLinkActive, isActive]);
    if (!isVisible) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(ui_primitives_2.Popover, { open: isOpen, onOpenChange: handleOnOpenChange, children: [(0, jsx_runtime_1.jsx)(ui_primitives_2.PopoverTrigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(exports.LinkButton, __assign({ disabled: !canSet, "data-active-state": isActive ? "on" : "off", "data-disabled": !canSet, "aria-label": label, "aria-pressed": isActive, onClick: handleClick }, buttonProps, { ref: ref, children: children !== null && children !== void 0 ? children : (0, jsx_runtime_1.jsx)(Icon, { className: "tiptap-button-icon" }) })) }), (0, jsx_runtime_1.jsx)(ui_primitives_2.PopoverContent, { children: (0, jsx_runtime_1.jsx)(LinkMain, { url: url, setUrl: setUrl, setLink: handleSetLink, removeLink: removeLink, openLink: openLink, isActive: isActive }) })] }));
});
exports.LinkPopover.displayName = "LinkPopover";
exports.default = exports.LinkPopover;
