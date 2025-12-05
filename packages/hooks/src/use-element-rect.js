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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementRect = useElementRect;
exports.useBodyRect = useBodyRect;
exports.useRefRect = useRefRect;
var react_1 = require("react");
var use_throttled_callback_1 = require("./use-throttled-callback");
var initialRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};
var isSSR = typeof window === "undefined";
var hasResizeObserver = !isSSR && typeof ResizeObserver !== "undefined";
/**
 * Helper function to check if code is running on client side
 */
var isClientSide = function () { return !isSSR; };
/**
 * Custom hook that tracks an element's bounding rectangle and updates on resize, scroll, etc.
 *
 * @param options Configuration options for element rect tracking
 * @returns The current bounding rectangle of the element
 */
function useElementRect(_a) {
    var _b = _a === void 0 ? {} : _a, element = _b.element, _c = _b.enabled, enabled = _c === void 0 ? true : _c, _d = _b.throttleMs, throttleMs = _d === void 0 ? 100 : _d, _e = _b.useResizeObserver, useResizeObserver = _e === void 0 ? true : _e;
    var _f = (0, react_1.useState)(initialRect), rect = _f[0], setRect = _f[1];
    var getTargetElement = (0, react_1.useCallback)(function () {
        if (!enabled || !isClientSide())
            return null;
        if (!element) {
            return document.body;
        }
        if (typeof element === "string") {
            return document.querySelector(element);
        }
        if ("current" in element) {
            return element.current;
        }
        return element;
    }, [element, enabled]);
    var updateRect = (0, use_throttled_callback_1.useThrottledCallback)(function () {
        if (!enabled || !isClientSide())
            return;
        var targetElement = getTargetElement();
        if (!targetElement) {
            setRect(initialRect);
            return;
        }
        var newRect = targetElement.getBoundingClientRect();
        setRect({
            x: newRect.x,
            y: newRect.y,
            width: newRect.width,
            height: newRect.height,
            top: newRect.top,
            right: newRect.right,
            bottom: newRect.bottom,
            left: newRect.left,
        });
    }, throttleMs, [enabled, getTargetElement], { leading: true, trailing: true });
    (0, react_1.useEffect)(function () {
        if (!enabled || !isClientSide()) {
            setRect(initialRect);
            return;
        }
        var targetElement = getTargetElement();
        if (!targetElement)
            return;
        updateRect();
        var cleanup = [];
        if (useResizeObserver && hasResizeObserver) {
            var resizeObserver_1 = new ResizeObserver(function () {
                window.requestAnimationFrame(updateRect);
            });
            resizeObserver_1.observe(targetElement);
            cleanup.push(function () { return resizeObserver_1.disconnect(); });
        }
        var handleUpdate = function () { return updateRect(); };
        window.addEventListener("scroll", handleUpdate, { passive: true });
        window.addEventListener("resize", handleUpdate, { passive: true });
        cleanup.push(function () {
            window.removeEventListener("scroll", handleUpdate);
            window.removeEventListener("resize", handleUpdate);
        });
        return function () {
            cleanup.forEach(function (fn) { return fn(); });
            setRect(initialRect);
        };
    }, [enabled, getTargetElement, updateRect, useResizeObserver]);
    return rect;
}
/**
 * Convenience hook for tracking document.body rect
 */
function useBodyRect(options) {
    if (options === void 0) { options = {}; }
    return useElementRect(__assign(__assign({}, options), { element: isClientSide() ? document.body : null }));
}
/**
 * Convenience hook for tracking a ref element's rect
 */
function useRefRect(ref, options) {
    if (options === void 0) { options = {}; }
    return useElementRect(__assign(__assign({}, options), { element: ref }));
}
