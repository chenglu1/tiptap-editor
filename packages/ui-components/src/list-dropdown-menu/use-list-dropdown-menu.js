"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOptions = void 0;
exports.canToggleAnyList = canToggleAnyList;
exports.isAnyListActive = isAnyListActive;
exports.getFilteredListOptions = getFilteredListOptions;
exports.shouldShowListDropdown = shouldShowListDropdown;
exports.getActiveListType = getActiveListType;
exports.useListDropdownMenu = useListDropdownMenu;
var react_1 = require("react");
// --- Hooks ---
var hooks_1 = require("@tiptap-editor/hooks");
// --- Icons ---
var list_icon_1 = require("../icons/list-icon");
var list_ordered_icon_1 = require("../icons/list-ordered-icon");
var list_todo_icon_1 = require("../icons/list-todo-icon");
// --- Lib ---
var utils_1 = require("../utils");
// --- Tiptap UI ---
var list_button_1 = require("../list-button");
exports.listOptions = [
    {
        label: "Bullet List",
        type: "bulletList",
        icon: list_icon_1.ListIcon,
    },
    {
        label: "Ordered List",
        type: "orderedList",
        icon: list_ordered_icon_1.ListOrderedIcon,
    },
    {
        label: "Task List",
        type: "taskList",
        icon: list_todo_icon_1.ListTodoIcon,
    },
];
function canToggleAnyList(editor, listTypes) {
    if (!editor || !editor.isEditable)
        return false;
    return listTypes.some(function (type) { return (0, list_button_1.canToggleList)(editor, type); });
}
function isAnyListActive(editor, listTypes) {
    if (!editor || !editor.isEditable)
        return false;
    return listTypes.some(function (type) { return (0, list_button_1.isListActive)(editor, type); });
}
function getFilteredListOptions(availableTypes) {
    return exports.listOptions.filter(function (option) { return !option.type || availableTypes.includes(option.type); });
}
function shouldShowListDropdown(params) {
    var editor = params.editor, hideWhenUnavailable = params.hideWhenUnavailable, listInSchema = params.listInSchema, canToggleAny = params.canToggleAny;
    if (!listInSchema || !editor) {
        return false;
    }
    if (hideWhenUnavailable && !editor.isActive("code")) {
        return canToggleAny;
    }
    return true;
}
/**
 * Gets the currently active list type from the available types
 */
function getActiveListType(editor, availableTypes) {
    if (!editor || !editor.isEditable)
        return undefined;
    return availableTypes.find(function (type) { return (0, list_button_1.isListActive)(editor, type); });
}
/**
 * Custom hook that provides list dropdown menu functionality for Tiptap editor
 *
 * @example
 * ```tsx
 * // Simple usage
 * function MyListDropdown() {
 *   const {
 *     isVisible,
 *     activeType,
 *     isAnyActive,
 *     canToggleAny,
 *     filteredLists,
 *   } = useListDropdownMenu()
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
 * function MyAdvancedListDropdown() {
 *   const {
 *     isVisible,
 *     activeType,
 *   } = useListDropdownMenu({
 *     editor: myEditor,
 *     types: ["bulletList", "orderedList"],
 *     hideWhenUnavailable: true,
 *   })
 *
 *   // component implementation
 * }
 * ```
 */
function useListDropdownMenu(config) {
    var _a = config || {}, providedEditor = _a.editor, _b = _a.types, types = _b === void 0 ? ["bulletList", "orderedList", "taskList"] : _b, _c = _a.hideWhenUnavailable, hideWhenUnavailable = _c === void 0 ? false : _c;
    var editor = (0, hooks_1.useTiptapEditor)(providedEditor).editor;
    var _d = (0, react_1.useState)(false), isVisible = _d[0], setIsVisible = _d[1];
    var listInSchema = types.some(function (type) { return (0, utils_1.isNodeInSchema)(type, editor); });
    var filteredLists = (0, react_1.useMemo)(function () { return getFilteredListOptions(types); }, [types]);
    var canToggleAny = canToggleAnyList(editor, types);
    var isAnyActive = isAnyListActive(editor, types);
    var activeType = getActiveListType(editor, types);
    var activeList = filteredLists.find(function (option) { return option.type === activeType; });
    (0, react_1.useEffect)(function () {
        if (!editor)
            return;
        var handleSelectionUpdate = function () {
            setIsVisible(shouldShowListDropdown({
                editor: editor,
                listTypes: types,
                hideWhenUnavailable: hideWhenUnavailable,
                listInSchema: listInSchema,
                canToggleAny: canToggleAny,
            }));
        };
        handleSelectionUpdate();
        editor.on("selectionUpdate", handleSelectionUpdate);
        return function () {
            editor.off("selectionUpdate", handleSelectionUpdate);
        };
    }, [canToggleAny, editor, hideWhenUnavailable, listInSchema, types]);
    return {
        isVisible: isVisible,
        activeType: activeType,
        isActive: isAnyActive,
        canToggle: canToggleAny,
        types: types,
        filteredLists: filteredLists,
        label: "List",
        Icon: activeList ? list_button_1.listIcons[activeList.type] : list_icon_1.ListIcon,
    };
}
