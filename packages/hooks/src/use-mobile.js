"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsMobile = useIsMobile;
var react_1 = require("react");
function useIsMobile(breakpoint) {
    if (breakpoint === void 0) { breakpoint = 768; }
    var _a = (0, react_1.useState)(undefined), isMobile = _a[0], setIsMobile = _a[1];
    (0, react_1.useEffect)(function () {
        var mql = window.matchMedia("(max-width: ".concat(breakpoint - 1, "px)"));
        var onChange = function () {
            setIsMobile(window.innerWidth < breakpoint);
        };
        mql.addEventListener("change", onChange);
        setIsMobile(window.innerWidth < breakpoint);
        return function () { return mql.removeEventListener("change", onChange); };
    }, [breakpoint]);
    return !!isMobile;
}
