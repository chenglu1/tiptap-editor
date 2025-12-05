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
exports.Badge = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
require("./badge-colors.scss");
require("./badge-group.scss");
require("./badge.scss");
exports.Badge = (0, react_1.forwardRef)(function (_a, ref) {
    var variant = _a.variant, _b = _a.size, size = _b === void 0 ? "default" : _b, _c = _a.appearance, appearance = _c === void 0 ? "default" : _c, _d = _a.trimText, trimText = _d === void 0 ? false : _d, className = _a.className, children = _a.children, props = __rest(_a, ["variant", "size", "appearance", "trimText", "className", "children"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: "tiptap-badge ".concat(className || ""), "data-style": variant, "data-size": size, "data-appearance": appearance, "data-text-trim": trimText ? "on" : "off" }, props, { children: children })));
});
exports.Badge.displayName = "Badge";
exports.default = exports.Badge;
