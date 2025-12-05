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
exports.CardGroupLabel = exports.CardItemGroup = exports.CardBody = exports.CardFooter = exports.CardHeader = exports.Card = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var utils_1 = require("../utils");
require("./card.scss");
var Card = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)("tiptap-card", className) }, props));
});
exports.Card = Card;
Card.displayName = "Card";
var CardHeader = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)("tiptap-card-header", className) }, props)));
});
exports.CardHeader = CardHeader;
CardHeader.displayName = "CardHeader";
var CardBody = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)("tiptap-card-body", className) }, props)));
});
exports.CardBody = CardBody;
CardBody.displayName = "CardBody";
var CardItemGroup = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, _b = _a.orientation, orientation = _b === void 0 ? "vertical" : _b, props = __rest(_a, ["className", "orientation"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, "data-orientation": orientation, className: (0, utils_1.cn)("tiptap-card-item-group", className) }, props)));
});
exports.CardItemGroup = CardItemGroup;
CardItemGroup.displayName = "CardItemGroup";
var CardGroupLabel = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)("tiptap-card-group-label", className) }, props)));
});
exports.CardGroupLabel = CardGroupLabel;
CardGroupLabel.displayName = "CardGroupLabel";
var CardFooter = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)("div", __assign({ ref: ref, className: (0, utils_1.cn)("tiptap-card-footer", className) }, props)));
});
exports.CardFooter = CardFooter;
CardFooter.displayName = "CardFooter";
