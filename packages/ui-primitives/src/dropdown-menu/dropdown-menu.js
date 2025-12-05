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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.DropdownMenuRadioGroup = exports.DropdownMenuSubTrigger = exports.DropdownMenuSubContent = exports.DropdownMenuSub = exports.DropdownMenuGroup = exports.DropdownMenuItem = exports.DropdownMenuContent = exports.DropdownMenuTrigger = void 0;
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuPortal = DropdownMenuPortal;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var DropdownMenuPrimitive = __importStar(require("@radix-ui/react-dropdown-menu"));
var utils_1 = require("../utils");
require("./dropdown-menu.scss");
function DropdownMenu(_a) {
    var props = __rest(_a, []);
    return (0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Root, __assign({ modal: false }, props));
}
function DropdownMenuPortal(_a) {
    var props = __rest(_a, []);
    return (0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Portal, __assign({}, props));
}
var DropdownMenuTrigger = (0, react_1.forwardRef)(function (_a, ref) {
    var props = __rest(_a, []);
    return (0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Trigger, __assign({ ref: ref }, props));
});
exports.DropdownMenuTrigger = DropdownMenuTrigger;
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;
var DropdownMenuGroup = DropdownMenuPrimitive.Group;
exports.DropdownMenuGroup = DropdownMenuGroup;
var DropdownMenuSub = DropdownMenuPrimitive.Sub;
exports.DropdownMenuSub = DropdownMenuSub;
var DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;
exports.DropdownMenuRadioGroup = DropdownMenuRadioGroup;
var DropdownMenuItem = DropdownMenuPrimitive.Item;
exports.DropdownMenuItem = DropdownMenuItem;
var DropdownMenuSubTrigger = DropdownMenuPrimitive.SubTrigger;
exports.DropdownMenuSubTrigger = DropdownMenuSubTrigger;
var DropdownMenuSubContent = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, _b = _a.portal, portal = _b === void 0 ? true : _b, props = __rest(_a, ["className", "portal"]);
    var content = ((0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.SubContent, __assign({ ref: ref, className: (0, utils_1.cn)("tiptap-dropdown-menu", className) }, props)));
    return portal ? ((0, jsx_runtime_1.jsx)(DropdownMenuPortal, __assign({}, (typeof portal === "object" ? portal : {}), { children: content }))) : (content);
});
exports.DropdownMenuSubContent = DropdownMenuSubContent;
DropdownMenuSubContent.displayName =
    DropdownMenuPrimitive.SubContent.displayName;
var DropdownMenuContent = (0, react_1.forwardRef)(function (_a, ref) {
    var className = _a.className, _b = _a.sideOffset, sideOffset = _b === void 0 ? 4 : _b, _c = _a.portal, portal = _c === void 0 ? false : _c, props = __rest(_a, ["className", "sideOffset", "portal"]);
    var content = ((0, jsx_runtime_1.jsx)(DropdownMenuPrimitive.Content, __assign({ ref: ref, sideOffset: sideOffset, onCloseAutoFocus: function (e) { return e.preventDefault(); }, className: (0, utils_1.cn)("tiptap-dropdown-menu", className) }, props)));
    return portal ? ((0, jsx_runtime_1.jsx)(DropdownMenuPortal, __assign({}, (typeof portal === "object" ? portal : {}), { children: content }))) : (content);
});
exports.DropdownMenuContent = DropdownMenuContent;
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
