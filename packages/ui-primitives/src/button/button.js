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
exports.ButtonGroup = exports.Button = exports.ShortcutDisplay = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
// --- Tiptap UI Primitive ---
var tooltip_1 = require("../tooltip");
// --- Lib ---
var utils_1 = require("../utils");
require("./button-colors.scss");
require("./button-group.scss");
require("./button.scss");
var ShortcutDisplay = function (_a) {
    var shortcuts = _a.shortcuts;
    if (shortcuts.length === 0)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { children: shortcuts.map(function (key, index) { return ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [index > 0 && (0, jsx_runtime_1.jsx)("kbd", { children: "+" }), (0, jsx_runtime_1.jsx)("kbd", { children: key })] }, index)); }) }));
};
exports.ShortcutDisplay = ShortcutDisplay;
exports.Button = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, children = _a.children, tooltip = _a.tooltip, _b = _a.showTooltip, showTooltip = _b === void 0 ? true : _b, shortcutKeys = _a.shortcutKeys, ariaLabel = _a["aria-label"], props = __rest(_a, ["className", "children", "tooltip", "showTooltip", "shortcutKeys", "aria-label"]);
    var shortcuts = (0, react_1.useMemo)(function () { return (0, utils_1.parseShortcutKeys)({ shortcutKeys: shortcutKeys }); }, [shortcutKeys]);
    if (!tooltip || !showTooltip) {
        return ((0, jsx_runtime_1.jsx)("button", __assign({ className: (0, utils_1.cn)("tiptap-button", className), ref: ref, "aria-label": ariaLabel }, props, { children: children })));
    }
    return ((0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { delay: 200, children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, __assign({ className: (0, utils_1.cn)("tiptap-button", className), ref: ref, "aria-label": ariaLabel }, props, { children: children })), (0, jsx_runtime_1.jsxs)(tooltip_1.TooltipContent, { children: [tooltip, (0, jsx_runtime_1.jsx)(exports.ShortcutDisplay, { shortcuts: shortcuts })] })] }));
});
exports.Button.displayName = "Button";
exports.ButtonGroup = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, children = _a.children, _b = _a.orientation, orientation = _b === void 0 ? "vertical" : _b, props = __rest(_a, ["className", "children", "orientation"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)("tiptap-button-group", className), "data-orientation": orientation, role: "group" }, props, { children: children })));
});
exports.ButtonGroup.displayName = "ButtonGroup";
exports.default = exports.Button;
