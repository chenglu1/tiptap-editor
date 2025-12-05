"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThrottledCallback = useThrottledCallback;
var lodash_throttle_1 = require("lodash.throttle");
var use_unmount_1 = require("./use-unmount");
var react_1 = require("react");
var defaultOptions = {
    leading: false,
    trailing: true,
};
/**
 * A hook that returns a throttled callback function.
 *
 * @param fn The function to throttle
 * @param wait The time in ms to wait before calling the function
 * @param dependencies The dependencies to watch for changes
 * @param options The throttle options
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useThrottledCallback(fn, wait, dependencies, options) {
    if (wait === void 0) { wait = 250; }
    if (dependencies === void 0) { dependencies = []; }
    if (options === void 0) { options = defaultOptions; }
    var handler = (0, react_1.useMemo)(function () { return (0, lodash_throttle_1.default)(fn, wait, options); }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies);
    (0, use_unmount_1.useUnmount)(function () {
        handler.cancel();
    });
    return handler;
}
exports.default = useThrottledCallback;
