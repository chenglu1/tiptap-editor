"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = useWindowSize;
var react_1 = require("react");
var use_throttled_callback_1 = require("./use-throttled-callback");
/**
 * Hook that tracks the window's visual viewport dimensions, position, and provides
 * a CSS transform for positioning elements.
 *
 * Uses the Visual Viewport API to get accurate measurements, especially important
 * for mobile devices where virtual keyboards can change the visible area.
 * Only updates state when values actually change to optimize performance.
 *
 * @returns An object containing viewport properties and a CSS transform string
 */
function useWindowSize() {
    var _a = (0, react_1.useState)({
        width: 0,
        height: 0,
        offsetTop: 0,
        offsetLeft: 0,
        scale: 0,
    }), windowSize = _a[0], setWindowSize = _a[1];
    var handleViewportChange = (0, use_throttled_callback_1.useThrottledCallback)(function () {
        if (typeof window === "undefined")
            return;
        var vp = window.visualViewport;
        if (!vp)
            return;
        var _a = vp.width, width = _a === void 0 ? 0 : _a, _b = vp.height, height = _b === void 0 ? 0 : _b, _c = vp.offsetTop, offsetTop = _c === void 0 ? 0 : _c, _d = vp.offsetLeft, offsetLeft = _d === void 0 ? 0 : _d, _e = vp.scale, scale = _e === void 0 ? 0 : _e;
        setWindowSize(function (prevState) {
            if (width === prevState.width &&
                height === prevState.height &&
                offsetTop === prevState.offsetTop &&
                offsetLeft === prevState.offsetLeft &&
                scale === prevState.scale) {
                return prevState;
            }
            return { width: width, height: height, offsetTop: offsetTop, offsetLeft: offsetLeft, scale: scale };
        });
    }, 200);
    (0, react_1.useEffect)(function () {
        var visualViewport = window.visualViewport;
        if (!visualViewport)
            return;
        visualViewport.addEventListener("resize", handleViewportChange);
        handleViewportChange();
        return function () {
            visualViewport.removeEventListener("resize", handleViewportChange);
        };
    }, [handleViewportChange]);
    return windowSize;
}
