"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUnmount = void 0;
var react_1 = require("react");
/**
 * Hook that executes a callback when the component unmounts.
 *
 * @param callback Function to be called on component unmount
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var useUnmount = function (callback) {
    var ref = (0, react_1.useRef)(callback);
    ref.current = callback;
    (0, react_1.useEffect)(function () { return function () {
        ref.current();
    }; }, []);
};
exports.useUnmount = useUnmount;
exports.default = exports.useUnmount;
