"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTiptapEditor = useTiptapEditor;
var react_1 = require("@tiptap/react");
var react_2 = require("react");
/**
 * Hook that provides access to a Tiptap editor instance.
 *
 * Accepts an optional editor instance directly, or falls back to retrieving
 * the editor from the Tiptap context if available. This allows components
 * to work both when given an editor directly and when used within a Tiptap
 * editor context.
 *
 * @param providedEditor - Optional editor instance to use instead of the context editor
 * @returns The provided editor or the editor from context, whichever is available
 */
function useTiptapEditor(providedEditor) {
    var coreEditor = (0, react_1.useCurrentEditor)().editor;
    var mainEditor = (0, react_2.useMemo)(function () { return providedEditor || coreEditor; }, [providedEditor, coreEditor]);
    var editorState = (0, react_1.useEditorState)({
        editor: mainEditor,
        selector: function (context) {
            if (!context.editor) {
                return {
                    editor: null,
                    editorState: undefined,
                    canCommand: undefined,
                };
            }
            return {
                editor: context.editor,
                editorState: context.editor.state,
                canCommand: context.editor.can,
            };
        },
    });
    return editorState || { editor: null };
}
