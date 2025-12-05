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
exports.Spacer = Spacer;
var jsx_runtime_1 = require("react/jsx-runtime");
function Spacer(_a) {
    var _b = _a.orientation, orientation = _b === void 0 ? "horizontal" : _b, size = _a.size, _c = _a.style, style = _c === void 0 ? {} : _c, props = __rest(_a, ["orientation", "size", "style"]);
    var computedStyle = __assign(__assign(__assign({}, style), (orientation === "horizontal" && !size && { flex: 1 })), (size && {
        width: orientation === "vertical" ? "1px" : size,
        height: orientation === "horizontal" ? "1px" : size,
    }));
    return (0, jsx_runtime_1.jsx)("div", __assign({}, props, { style: computedStyle }));
}
