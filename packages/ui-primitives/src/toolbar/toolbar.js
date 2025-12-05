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
exports.ToolbarSeparator = exports.ToolbarGroup = exports.Toolbar = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var separator_1 = require("../separator");
require("./toolbar.scss");
var utils_1 = require("../utils");
var hooks_1 = require("@tiptap-editor/hooks");
var hooks_2 = require("@tiptap-editor/hooks");
var useToolbarNavigation = function (toolbarRef) {
    var _a = (0, react_1.useState)([]), items = _a[0], setItems = _a[1];
    var collectItems = (0, react_1.useCallback)(function () {
        if (!toolbarRef.current)
            return [];
        return Array.from(toolbarRef.current.querySelectorAll('button:not([disabled]), [role="button"]:not([disabled]), [tabindex="0"]:not([disabled])'));
    }, [toolbarRef]);
    (0, react_1.useEffect)(function () {
        var toolbar = toolbarRef.current;
        if (!toolbar)
            return;
        var updateItems = function () { return setItems(collectItems()); };
        updateItems();
        var observer = new MutationObserver(updateItems);
        observer.observe(toolbar, { childList: true, subtree: true });
        return function () { return observer.disconnect(); };
    }, [collectItems, toolbarRef]);
    var selectedIndex = (0, hooks_1.useMenuNavigation)({
        containerRef: toolbarRef,
        items: items,
        orientation: "horizontal",
        onSelect: function (el) { return el.click(); },
        autoSelectFirstItem: false,
    }).selectedIndex;
    (0, react_1.useEffect)(function () {
        var toolbar = toolbarRef.current;
        if (!toolbar)
            return;
        var handleFocus = function (e) {
            var target = e.target;
            if (toolbar.contains(target))
                target.setAttribute("data-focus-visible", "true");
        };
        var handleBlur = function (e) {
            var target = e.target;
            if (toolbar.contains(target))
                target.removeAttribute("data-focus-visible");
        };
        toolbar.addEventListener("focus", handleFocus, true);
        toolbar.addEventListener("blur", handleBlur, true);
        return function () {
            toolbar.removeEventListener("focus", handleFocus, true);
            toolbar.removeEventListener("blur", handleBlur, true);
        };
    }, [toolbarRef]);
    (0, react_1.useEffect)(function () {
        if (selectedIndex !== undefined && items[selectedIndex]) {
            items[selectedIndex].focus();
        }
    }, [selectedIndex, items]);
};
exports.Toolbar = (0, react_1.forwardRef)(function (_a, ref) {
    var children = _a.children, className = _a.className, _b = _a.variant, variant = _b === void 0 ? "fixed" : _b, props = __rest(_a, ["children", "className", "variant"]);
    var toolbarRef = (0, react_1.useRef)(null);
    var composedRef = (0, hooks_2.useComposedRef)(toolbarRef, ref);
    useToolbarNavigation(toolbarRef);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: composedRef, role: "toolbar", "aria-label": "toolbar", "data-variant": variant, className: (0, utils_1.cn)("tiptap-toolbar", className) }, props, { children: children })));
});
exports.Toolbar.displayName = "Toolbar";
exports.ToolbarGroup = (0, react_1.forwardRef)(function (_a, ref) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, role: "group", className: (0, utils_1.cn)("tiptap-toolbar-group", className) }, props, { children: children })));
});
exports.ToolbarGroup.displayName = "ToolbarGroup";
exports.ToolbarSeparator = (0, react_1.forwardRef)(function (_a, ref) {
    var props = __rest(_a, []);
    return ((0, jsx_runtime_1.jsx)(separator_1.Separator, __assign({ ref: ref, orientation: "vertical", decorative: true }, props)));
});
exports.ToolbarSeparator.displayName = "ToolbarSeparator";
