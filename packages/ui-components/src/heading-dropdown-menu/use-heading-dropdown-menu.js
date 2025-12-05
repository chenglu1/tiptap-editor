"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActiveHeadingLevel = getActiveHeadingLevel;
exports.useHeadingDropdownMenu = useHeadingDropdownMenu;
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Icons ---
var heading_icon_1 = require("../icons/heading-icon");
// --- Tiptap UI ---
var heading_button_1 = require("../heading-button");
/**
 * Gets the currently active heading level from the available levels
 */
function getActiveHeadingLevel(editor, levels) {
    if (levels === void 0) { levels = [1, 2, 3, 4, 5, 6]; }
    if (!editor || !editor.isEditable)
        return undefined;
    return levels.find(function (level) { return (0, heading_button_1.isHeadingActive)(editor, level); });
}
/**
 * Custom hook that provides heading dropdown menu functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MyHeadingDropdown() {
 *   const {
 *     isVisible,
 *     activeLevel,
 *     isAnyHeadingActive,
 *     canToggle,
 *     levels,
 *   } = useHeadingDropdownMenu()
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <DropdownMenu>
 *       // dropdown content
 *     </DropdownMenu>
 *   )
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedHeadingDropdown() {
 *   const {
 *     isVisible,
 *     activeLevel,
 *   } = useHeadingDropdownMenu({
 *     editor: myEditor,
 *     levels: [1, 2, 3],
 *     hideWhenUnavailable: true,
 *   })
 *
 *   // component implementation
 * }
 * ```
 */
function useHeadingDropdownMenu(config) {
    var _a = config || {}, providedEditor = _a.editor, _b = _a.levels, levels = _b === void 0 ? [1, 2, 3, 4, 5, 6] : _b, _c = _a.hideWhenUnavailable, hideWhenUnavailable = _c === void 0 ? false : _c;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _d = (0, react_1.useState)(true), isVisible = _d[0], setIsVisible = _d[1];
    var activeLevel = getActiveHeadingLevel(editor, levels);
    var isActive = (0, heading_button_1.isHeadingActive)(editor);
    var canToggleState = (0, heading_button_1.canToggle)(editor);
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleSelectionUpdate = function () {
            setIsVisible((0, heading_button_1.shouldShowButton)({ editor: editor, hideWhenUnavailable: hideWhenUnavailable, level: levels }));
        };
        handleSelectionUpdate();
        editor.on("selectionUpdate", handleSelectionUpdate);
        return function () {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [editor, hideWhenUnavailable, levels]);
    return {
        isVisible: isVisible,
        activeLevel: activeLevel,
        isActive: isActive,
        canToggle: canToggleState,
        levels: levels,
        label: "Heading",
        Icon: activeLevel ? heading_button_1.headingIcons[activeLevel] : heading_icon_1.HeadingIcon,
    };
}
