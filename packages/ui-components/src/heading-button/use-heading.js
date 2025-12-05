"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEADING_SHORTCUT_KEYS = exports.headingIcons = void 0;
exports.canToggle = canToggle;
exports.isHeadingActive = isHeadingActive;
exports.toggleHeading = toggleHeading;
exports.shouldShowButton = shouldShowButton;
exports.useHeading = useHeading;
var react_1 = require("react");
var state_1 = require("@tiptap/pm/state");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Lib ---
var utils_1 = require("../utils");
// --- Icons ---
var heading_one_icon_1 = require("../icons/heading-one-icon");
var heading_two_icon_1 = require("../icons/heading-two-icon");
var heading_three_icon_1 = require("../icons/heading-three-icon");
var heading_four_icon_1 = require("../icons/heading-four-icon");
var heading_five_icon_1 = require("../icons/heading-five-icon");
var heading_six_icon_1 = require("../icons/heading-six-icon");
exports.headingIcons = {
    1: heading_one_icon_1.HeadingOneIcon,
    2: heading_two_icon_1.HeadingTwoIcon,
    3: heading_three_icon_1.HeadingThreeIcon,
    4: heading_four_icon_1.HeadingFourIcon,
    5: heading_five_icon_1.HeadingFiveIcon,
    6: heading_six_icon_1.HeadingSixIcon,
};
exports.HEADING_SHORTCUT_KEYS = {
    1: "ctrl+alt+1",
    2: "ctrl+alt+2",
    3: "ctrl+alt+3",
    4: "ctrl+alt+4",
    5: "ctrl+alt+5",
    6: "ctrl+alt+6",
};
/**
 * Checks if heading can be toggled in the current editor state
 */
function canToggle(editor, level, turnInto) {
    if (turnInto === void 0) { turnInto = true; }
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isNodeInSchema)("heading", editor) ||
        (0, utils_1.isNodeTypeSelected)(editor, ["image"]))
        return false;
    if (!turnInto) {
        return level
            ? editor.can().setNode("heading", { level: level })
            : editor.can().setNode("heading");
    }
    // Ensure selection is in nodes we're allowed to convert
    if (!(0, utils_1.selectionWithinConvertibleTypes)(editor, [
        "paragraph",
        "heading",
        "bulletList",
        "orderedList",
        "taskList",
        "blockquote",
        "codeBlock",
    ]))
        return false;
    // Either we can set heading directly on the selection,
    // or we can clear formatting/nodes to arrive at a heading.
    return level
        ? editor.can().setNode("heading", { level: level }) || editor.can().clearNodes()
        : editor.can().setNode("heading") || editor.can().clearNodes();
}
/**
 * Checks if heading is currently active
 */
function isHeadingActive(editor, level) {
    if (!editor || !editor.isEditable)
        return false;
    if (Array.isArray(level)) {
        return level.some(function (l) { return editor.isActive("heading", { level: l }); });
    }
    return level
        ? editor.isActive("heading", { level: level })
        : editor.isActive("heading");
}
/**
 * Toggles heading in the editor
 */
function toggleHeading(editor, level) {
    var _a, _b, _c;
    if (!editor || !editor.isEditable)
        return false;
    var levels = Array.isArray(level) ? level : [level];
    var toggleLevel = levels.find(function (l) { return canToggle(editor, l); });
    if (!toggleLevel)
        return false;
    try {
        var view = editor.view;
        var state = view.state;
        var tr = state.tr;
        // No selection, find the cursor position
        if (state.selection.empty || state.selection instanceof state_1.TextSelection) {
            var pos = (_a = (0, utils_1.findNodePosition)({
                editor: editor,
                node: state.selection.$anchor.node(1),
            })) === null || _a === void 0 ? void 0 : _a.pos;
            if (!(0, utils_1.isValidPosition)(pos))
                return false;
            tr = tr.setSelection(state_1.NodeSelection.create(state.doc, pos));
            view.dispatch(tr);
            state = view.state;
        }
        var selection = state.selection;
        var chain = editor.chain().focus();
        // Handle NodeSelection
        if (selection instanceof state_1.NodeSelection) {
            var firstChild = (_b = selection.node.firstChild) === null || _b === void 0 ? void 0 : _b.firstChild;
            var lastChild = (_c = selection.node.lastChild) === null || _c === void 0 ? void 0 : _c.lastChild;
            var from = firstChild
                ? selection.from + firstChild.nodeSize
                : selection.from + 1;
            var to = lastChild
                ? selection.to - lastChild.nodeSize
                : selection.to - 1;
            var resolvedFrom = state.doc.resolve(from);
            var resolvedTo = state.doc.resolve(to);
            chain = chain
                .setTextSelection(state_1.TextSelection.between(resolvedFrom, resolvedTo))
                .clearNodes();
        }
        var isActive = levels.some(function (l) {
            return editor.isActive("heading", { level: l });
        });
        var toggle = isActive
            ? chain.setNode("paragraph")
            : chain.setNode("heading", { level: toggleLevel });
        toggle.run();
        editor.chain().focus().selectTextblockEnd().run();
        return true;
    }
    catch (_d) {
        return false;
    }
}
/**
 * Determines if the heading button should be shown
 */
function shouldShowButton(props) {
    var editor = props.editor, level = props.level, hideWhenUnavailable = props.hideWhenUnavailable;
    if (!editor || !editor.isEditable)
        return false;
    if (!(0, utils_1.isNodeInSchema)("heading", editor))
        return false;
    if (hideWhenUnavailable && !editor.isActive("code")) {
        if (Array.isArray(level)) {
            return level.some(function (l) { return canToggle(editor, l); });
        }
        return canToggle(editor, level);
    }
    return true;
}
/**
 * Custom hook that provides heading functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MySimpleHeadingButton() {
 *   const { isVisible, isActive, handleToggle, Icon } = useHeading({ level: 1 })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <button
 *       onClick={handleToggle}
 *       aria-pressed={isActive}
 *     >
 *       <Icon />
 *       Heading 1
 *     </button>
 *   )
 * }
 *
 * // Advanced usage with configuration
 * function MyAdvancedHeadingButton() {
 *   const { isVisible, isActive, handleToggle, label, Icon } = useHeading({
 *     level: 2,
 *     editor: myEditor,
 *     hideWhenUnavailable: true,
 *     onToggled: (isActive) => console.log('Heading toggled:', isActive)
 *   })
 *
 *   if (!isVisible) return null
 *
 *   return (
 *     <MyButton
 *       onClick={handleToggle}
 *       aria-label={label}
 *       aria-pressed={isActive}
 *     >
 *       <Icon />
 *       Toggle Heading 2
 *     </MyButton>
 *   )
 * }
 * ```
 */
function useHeading(config) {
    var providedEditor = config.editor, level = config.level, _a = config.hideWhenUnavailable, hideWhenUnavailable = _a === void 0 ? false : _a, onToggled = config.onToggled;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _b = (0, react_1.useState)(true), isVisible = _b[0], setIsVisible = _b[1];
    var canToggleState = canToggle(editor, level);
    var isActive = isHeadingActive(editor, level);
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleSelectionUpdate = function () {
            setIsVisible(shouldShowButton({ editor: editor, level: level, hideWhenUnavailable: hideWhenUnavailable }));
        };
        handleSelectionUpdate();
        editor.on("selectionUpdate", handleSelectionUpdate);
        return function () {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [editor, level, hideWhenUnavailable]);
    var handleToggle = (0, react_1.useCallback)(function () {
        if (!editor)
            return false;
        var success = toggleHeading(editor, level);
        if (success) {
            onToggled === null || onToggled === void 0 ? void 0 : onToggled();
        }
        return success;
    }, [editor, level, onToggled]);
    return {
        isVisible: isVisible,
        isActive: isActive,
        handleToggle: handleToggle,
        canToggle: canToggleState,
        label: "Heading ".concat(level),
        shortcutKeys: exports.HEADING_SHORTCUT_KEYS[level],
        Icon: exports.headingIcons[level],
    };
}
