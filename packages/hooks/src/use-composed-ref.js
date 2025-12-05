"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useComposedRef = void 0;
var react_1 = require("react");
var updateRef = function (ref, value) {
    if (typeof ref === "function") {
        ref(value);
    }
    else if (ref && typeof ref === "object" && "current" in ref) {
        // Safe assignment without MutableRefObject
        ;
        ref.current = value;
    }
};
var useComposedRef = function (libRef, userRef) {
    var prevUserRef = (0, react_1.useRef)(null);
    return (0, react_1.useCallback)(function (instance) {
        if (libRef && "current" in libRef) {
            ;
            libRef.current = instance;
        }
        if (prevUserRef.current) {
            updateRef(prevUserRef.current, null);
        }
        prevUserRef.current = userRef;
        if (userRef) {
            updateRef(userRef, instance);
        }
    }, [libRef, userRef]);
};
exports.useComposedRef = useComposedRef;
exports.default = exports.useComposedRef;
