"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScrolling = useScrolling;
var react_1 = require("react");
function useScrolling(target, options) {
    if (options === void 0) { options = {}; }
    var _a = options.debounce, debounce = _a === void 0 ? 150 : _a, _b = options.fallbackToDocument, fallbackToDocument = _b === void 0 ? true : _b;
    var _c = (0, react_1.useState)(false), isScrolling = _c[0], setIsScrolling = _c[1];
    (0, react_1.useEffect)(function () {
        var _a;
        // Resolve element or window
        var element = target && typeof Window !== "undefined" && target instanceof Window
            ? target
            : ((_a = target === null || target === void 0 ? void 0 : target.current) !== null && _a !== void 0 ? _a : window);
        // Mobile: fallback to document when using window
        var eventTarget = fallbackToDocument &&
            element === window &&
            typeof document !== "undefined"
            ? document
            : element;
        var on = function (el, event, handler) { return el.addEventListener(event, handler, { passive: true }); };
        var off = function (el, event, handler) { return el.removeEventListener(event, handler); };
        var timeout;
        var supportsScrollEnd = element === window && "onscrollend" in window;
        var handleScroll = function () {
            if (!isScrolling)
                setIsScrolling(true);
            if (!supportsScrollEnd) {
                clearTimeout(timeout);
                timeout = setTimeout(function () { return setIsScrolling(false); }, debounce);
            }
        };
        var handleScrollEnd = function () { return setIsScrolling(false); };
        on(eventTarget, "scroll", handleScroll);
        if (supportsScrollEnd) {
            on(eventTarget, "scrollend", handleScrollEnd);
        }
        return function () {
            off(eventTarget, "scroll", handleScroll);
            if (supportsScrollEnd) {
                off(eventTarget, "scrollend", handleScrollEnd);
            }
            clearTimeout(timeout);
        };
    }, [target, debounce, fallbackToDocument, isScrolling]);
    return isScrolling;
}
