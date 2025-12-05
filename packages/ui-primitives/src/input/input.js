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
exports.Input = Input;
exports.InputGroup = InputGroup;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("../utils");
require("@/components/tiptap-ui-primitive/input/input.scss");
function Input(_a) {
    var className = _a.className, type = _a.type, props = __rest(_a, ["className", "type"]);
    return ((0, jsx_runtime_1.jsx)("input", __assign({ type: type, className: (0, utils_1.cn)("tiptap-input", className) }, props)));
}
function InputGroup(_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: (0, utils_1.cn)("tiptap-input-group", className) }, props, { children: children })));
}
