"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCursorVisibility = useCursorVisibility;
var use_window_size_1 = require("./use-window-size");
var use_element_rect_1 = require("./use-element-rect");
var react_1 = require("react");
/**
 * Custom hook that ensures the cursor remains visible when typing in a Tiptap editor.
 * Automatically scrolls the window when the cursor would be hidden by the toolbar.
 *
 * @param options.editor The Tiptap editor instance
 * @param options.overlayHeight Toolbar height to account for
 * @returns The bounding rect of the body
 */
function useCursorVisibility(_a) {
    var editor = _a.editor, _b = _a.overlayHeight, overlayHeight = _b === void 0 ? 0 : _b;
    var windowHeight = (0, use_window_size_1.useWindowSize)().height;
    var rect = (0, use_element_rect_1.useBodyRect)({
        enabled: true,
        throttleMs: 100,
        useResizeObserver: true,
    });
    (0, react_1.useEffect)(function () {
        var ensureCursorVisibility = function () {
            if (!editor)
                return;
            var state = editor.state, view = editor.view;
            if (!view.hasFocus())
                return;
            // Get current cursor position coordinates
            var from = state.selection.from;
            var cursorCoords = view.coordsAtPos(from);
            if (windowHeight < rect.height && cursorCoords) {
                var availableSpace = windowHeight - cursorCoords.top;
                // If the cursor is hidden behind the overlay or offscreen, scroll it into view
                if (availableSpace < overlayHeight) {
                    var targetCursorY = Math.max(windowHeight / 2, overlayHeight);
                    var currentScrollY = window.scrollY;
                    var cursorAbsoluteY = cursorCoords.top + currentScrollY;
                    var newScrollY = cursorAbsoluteY - targetCursorY;
                    window.scrollTo({
                        top: Math.max(0, newScrollY),
                        behavior: "smooth",
                    });
                }
            }
        };
        ensureCursorVisibility();
    }, [editor, overlayHeight, windowHeight, rect.height]);
    return rect;
}
