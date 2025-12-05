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
exports.isNodeInSchema = exports.isMarkInSchema = exports.SR_ONLY = exports.MAC_SYMBOLS = exports.MAX_FILE_SIZE = void 0;
exports.cn = cn;
exports.isMac = isMac;
exports.parseShortcutKeys = parseShortcutKeys;
exports.isNodeSelection = isNodeSelection;
exports.isTextSelection = isTextSelection;
exports.isAllSelection = isAllSelection;
exports.getNodesInSelection = getNodesInSelection;
exports.focusNextNode = focusNextNode;
exports.canInsertNodeAt = canInsertNodeAt;
exports.insertNodeAt = insertNodeAt;
exports.deleteNodeAt = deleteNodeAt;
exports.updateNodeAttrs = updateNodeAttrs;
exports.isNodeActive = isNodeActive;
exports.getNodeAttributes = getNodeAttributes;
exports.uploadFile = uploadFile;
exports.isValidUrl = isValidUrl;
exports.getMarkAttributes = getMarkAttributes;
exports.isMarkActive = isMarkActive;
exports.canApplyMark = canApplyMark;
exports.toggleMark = toggleMark;
exports.hasNodeOfType = hasNodeOfType;
exports.getNodeByPos = getNodeByPos;
exports.setTextSelection = setTextSelection;
exports.setNodeSelection = setNodeSelection;
exports.isEmptyTextBlock = isEmptyTextBlock;
exports.canJoin = canJoin;
exports.joinBackward = joinBackward;
exports.createParagraphNear = createParagraphNear;
exports.splitBlock = splitBlock;
exports.isValidPosition = isValidPosition;
exports.isExtensionAvailable = isExtensionAvailable;
exports.findNodeAtPosition = findNodeAtPosition;
exports.findNodePosition = findNodePosition;
exports.isNodeTypeSelected = isNodeTypeSelected;
exports.selectionWithinConvertibleTypes = selectionWithinConvertibleTypes;
exports.isAllowedUri = isAllowedUri;
exports.sanitizeUrl = sanitizeUrl;
var state_1 = require("@tiptap/pm/state");
exports.MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
exports.MAC_SYMBOLS = {
    mod: "⌘",
    command: "⌘",
    meta: "⌘",
    ctrl: "⌃",
    control: "⌃",
    alt: "⌥",
    option: "⌥",
    shift: "⇧",
    backspace: "Del",
    delete: "⌦",
    enter: "⏎",
    escape: "⎋",
    capslock: "⇪",
};
exports.SR_ONLY = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
};
function cn() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(" ");
}
/**
 * Determines if the current platform is macOS
 * @returns boolean indicating if the current platform is Mac
 */
function isMac() {
    return /Mac/.test(navigator === null || navigator === void 0 ? void 0 : navigator.platform);
}
/**
 * Converts a keyboard shortcut string to display format with platform-specific symbols
 * @param keys Shortcut string like "mod+b" or "alt+shift+5"
 * @returns Formatted shortcut with symbols like "⌘B" on Mac or "Ctrl+B" on Windows
 */
function parseShortcutKeys(keys) {
    var isMacOS = isMac();
    var parts = keys.split("+");
    return parts
        .map(function (part) {
        var lower = part.toLowerCase();
        if (isMacOS && lower in exports.MAC_SYMBOLS) {
            return exports.MAC_SYMBOLS[lower] || part;
        }
        if (lower === "mod" || lower === "command" || lower === "meta") {
            return isMacOS ? "⌘" : "Ctrl";
        }
        return part.charAt(0).toUpperCase() + part.slice(1);
    })
        .join(isMacOS ? "" : "+");
}
function isNodeSelection(selection) {
    return selection instanceof state_1.NodeSelection;
}
function isTextSelection(selection) {
    return selection instanceof state_1.TextSelection;
}
function isAllSelection(selection) {
    return selection instanceof state_1.AllSelection;
}
function getNodesInSelection(editor, types) {
    var state = editor.state;
    var selection = state.selection;
    var from = selection.from, to = selection.to;
    var nodes = [];
    state.doc.nodesBetween(from, to, function (node, pos) {
        if (types && !types.includes(node.type.name)) {
            return;
        }
        nodes.push({ node: node, pos: pos });
    });
    return nodes;
}
function focusNextNode(editor, currentNode) {
    var nodes = getNodesInSelection(editor);
    var currentIndex = nodes.findIndex(function (n) { return n.pos === currentNode.pos; });
    if (currentIndex === -1 || currentIndex === nodes.length - 1) {
        return false;
    }
    var nextNode = nodes[currentIndex + 1];
    var view = editor.view;
    var dispatch = view.dispatch;
    var tr = view.state.tr;
    dispatch(tr.setSelection(state_1.NodeSelection.create(view.state.doc, nextNode.pos)));
    return true;
}
function canInsertNodeAt(editor, nodeType, pos) {
    var state = editor.state;
    var doc = state.doc, schema = state.schema;
    var node = schema.nodes[nodeType];
    if (!node) {
        return false;
    }
    var $pos = typeof pos === "number" ? doc.resolve(pos) : state.selection.$from;
    for (var d = $pos.depth; d >= 0; d--) {
        var index = $pos.index(d);
        if ($pos.node(d).canReplaceWith(index, index, node)) {
            return true;
        }
    }
    return false;
}
function insertNodeAt(editor, nodeType, attrs, pos) {
    if (!canInsertNodeAt(editor, nodeType, pos)) {
        return false;
    }
    var state = editor.state, view = editor.view;
    var schema = state.schema;
    var node = schema.nodes[nodeType];
    if (!node) {
        return false;
    }
    var tr = state.tr;
    var createdNode = node.create(attrs);
    var insertPos = typeof pos === "number" ? pos : state.selection.from;
    tr.insert(insertPos, createdNode);
    view.dispatch(tr);
    return true;
}
function deleteNodeAt(editor, pos) {
    var state = editor.state, view = editor.view;
    var doc = state.doc;
    var $pos = doc.resolve(pos);
    var node = $pos.nodeAfter;
    if (!node) {
        return false;
    }
    var tr = state.tr;
    tr.delete(pos, pos + node.nodeSize);
    view.dispatch(tr);
    return true;
}
function updateNodeAttrs(editor, pos, attrs) {
    var state = editor.state, view = editor.view;
    var doc = state.doc;
    var $pos = doc.resolve(pos);
    var node = $pos.nodeAfter;
    if (!node) {
        return false;
    }
    var tr = state.tr;
    tr.setNodeMarkup(pos, undefined, __assign(__assign({}, node.attrs), attrs));
    view.dispatch(tr);
    return true;
}
function isNodeActive(editor, nodeType, attrs) {
    var state = editor.state;
    var selection = state.selection;
    var $from = selection.$from, to = selection.to;
    var isActive = false;
    state.doc.nodesBetween($from.pos, to, function (node) {
        if (node.type.name !== nodeType) {
            return;
        }
        if (!attrs) {
            isActive = true;
            return false;
        }
        if (Object.entries(attrs).every(function (_a) {
            var key = _a[0], value = _a[1];
            return node.attrs[key] === value;
        })) {
            isActive = true;
            return false;
        }
    });
    return isActive;
}
function getNodeAttributes(editor, nodeType) {
    var state = editor.state;
    var selection = state.selection;
    var $from = selection.$from, to = selection.to;
    var nodeAttrs = null;
    state.doc.nodesBetween($from.pos, to, function (node) {
        if (node.type.name === nodeType) {
            nodeAttrs = node.attrs;
            return false;
        }
    });
    return nodeAttrs;
}
function uploadFile(file) {
    return new Promise(function (resolve, reject) {
        if (file.size > exports.MAX_FILE_SIZE) {
            reject(new Error("File size exceeds ".concat(exports.MAX_FILE_SIZE / 1024 / 1024, "MB")));
            return;
        }
        var reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject(new Error("Failed to read file"));
        };
        reader.readAsDataURL(file);
    });
}
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function getMarkAttributes(editor, markType) {
    var state = editor.state;
    var selection = state.selection;
    var $from = selection.$from, to = selection.to;
    var markAttrs = null;
    state.doc.nodesBetween($from.pos, to, function (node) {
        var mark = node.marks.find(function (m) { return m.type.name === markType; });
        if (mark) {
            markAttrs = mark.attrs;
            return false;
        }
    });
    return markAttrs;
}
function isMarkActive(editor, markType, attrs) {
    var state = editor.state;
    var selection = state.selection;
    var $from = selection.$from, to = selection.to;
    var isActive = false;
    state.doc.nodesBetween($from.pos, to, function (node) {
        var mark = node.marks.find(function (m) { return m.type.name === markType; });
        if (mark) {
            if (!attrs) {
                isActive = true;
                return false;
            }
            if (Object.entries(attrs).every(function (_a) {
                var key = _a[0], value = _a[1];
                return mark.attrs[key] === value;
            })) {
                isActive = true;
                return false;
            }
        }
    });
    return isActive;
}
function canApplyMark(editor, markType) {
    var state = editor.state;
    var selection = state.selection;
    var $from = selection.$from;
    var schema = state.schema;
    var mark = schema.marks[markType];
    if (!mark) {
        return false;
    }
    var can = $from.depth === 0 || state.doc.resolve($from.pos).parent.type.allowsMarkType(mark);
    return can;
}
function toggleMark(editor, markType, attrs) {
    if (!canApplyMark(editor, markType)) {
        return false;
    }
    var isActive = isMarkActive(editor, markType, attrs);
    if (isActive) {
        editor.chain().focus().unsetMark(markType).run();
    }
    else {
        editor.chain().focus().setMark(markType, attrs).run();
    }
    return true;
}
function hasNodeOfType(editor, nodeType) {
    var state = editor.state;
    var doc = state.doc;
    var found = false;
    doc.descendants(function (node) {
        if (node.type.name === nodeType) {
            found = true;
            return false;
        }
    });
    return found;
}
function getNodeByPos(editor, pos) {
    var state = editor.state;
    var doc = state.doc;
    try {
        var $pos = doc.resolve(pos);
        var node = $pos.nodeAfter;
        if (!node) {
            return null;
        }
        return { node: node, pos: pos };
    }
    catch (_a) {
        return null;
    }
}
function setTextSelection(editor, from, to) {
    var view = editor.view;
    var tr = view.state.tr;
    view.dispatch(tr.setSelection(state_1.TextSelection.create(view.state.doc, from, to !== undefined ? to : from)));
}
function setNodeSelection(editor, pos) {
    var view = editor.view;
    var tr = view.state.tr;
    view.dispatch(tr.setSelection(state_1.NodeSelection.create(view.state.doc, pos)));
}
function isEmptyTextBlock(node) {
    return (node.isTextblock &&
        !node.type.spec.code &&
        node.content.size === 0 &&
        node.marks.length === 0);
}
function canJoin(editor, pos) {
    var state = editor.state;
    var doc = state.doc;
    try {
        var $pos = doc.resolve(pos);
        return $pos.parent.canReplace($pos.index(), $pos.index() + 1);
    }
    catch (_a) {
        return false;
    }
}
function joinBackward(editor) {
    var state = editor.state, view = editor.view;
    var selection = state.selection;
    var $from = selection.$from;
    if ($from.parentOffset > 0) {
        return false;
    }
    var tr = state.tr;
    if (canJoin(editor, $from.pos)) {
        tr.join($from.pos);
        view.dispatch(tr);
        return true;
    }
    return false;
}
function createParagraphNear(editor) {
    var state = editor.state, view = editor.view;
    var selection = state.selection, schema = state.schema;
    var $from = selection.$from;
    var paragraph = schema.nodes.paragraph;
    if (!paragraph) {
        return false;
    }
    var tr = state.tr;
    var pos = $from.after();
    tr.insert(pos, paragraph.create());
    tr.setSelection(state_1.TextSelection.create(tr.doc, pos + 1));
    view.dispatch(tr);
    return true;
}
function splitBlock(editor) {
    var state = editor.state, view = editor.view;
    var selection = state.selection;
    var $from = selection.$from, $to = selection.$to;
    if (selection instanceof state_1.NodeSelection && selection.node.isBlock) {
        var tr_1 = state.tr;
        tr_1.delete($from.pos, $to.pos);
        view.dispatch(tr_1);
        return true;
    }
    var tr = state.tr;
    tr.split($from.pos);
    view.dispatch(tr);
    return true;
}
/**
 * Checks if a mark exists in the editor schema
 * @param markName - The name of the mark to check
 * @param editor - The editor instance
 * @returns boolean indicating if the mark exists in the schema
 */
var isMarkInSchema = function (markName, editor) {
    if (!(editor === null || editor === void 0 ? void 0 : editor.schema))
        return false;
    return editor.schema.spec.marks.get(markName) !== undefined;
};
exports.isMarkInSchema = isMarkInSchema;
/**
 * Checks if a node exists in the editor schema
 * @param nodeName - The name of the node to check
 * @param editor - The editor instance
 * @returns boolean indicating if the node exists in the schema
 */
var isNodeInSchema = function (nodeName, editor) {
    if (!(editor === null || editor === void 0 ? void 0 : editor.schema))
        return false;
    return editor.schema.spec.nodes.get(nodeName) !== undefined;
};
exports.isNodeInSchema = isNodeInSchema;
/**
 * Checks if a value is a valid number (not null, undefined, or NaN)
 * @param value - The value to check
 * @returns boolean indicating if the value is a valid number
 */
function isValidPosition(pos) {
    return typeof pos === "number" && pos >= 0;
}
/**
 * Checks if one or more extensions are registered in the Tiptap editor.
 * @param editor - The Tiptap editor instance
 * @param extensionNames - A single extension name or an array of names to check
 * @returns True if at least one of the extensions is available, false otherwise
 */
function isExtensionAvailable(editor, extensionNames) {
    if (!editor)
        return false;
    var names = Array.isArray(extensionNames)
        ? extensionNames
        : [extensionNames];
    var found = names.some(function (name) {
        return editor.extensionManager.extensions.some(function (ext) { return ext.name === name; });
    });
    if (!found) {
        console.warn("None of the extensions [".concat(names.join(", "), "] were found in the editor schema. Ensure they are included in the editor configuration."));
    }
    return found;
}
/**
 * Finds a node at the specified position with error handling
 * @param editor The Tiptap editor instance
 * @param position The position in the document to find the node
 * @returns The node at the specified position, or null if not found
 */
function findNodeAtPosition(editor, position) {
    try {
        var node = editor.state.doc.nodeAt(position);
        if (!node) {
            console.warn("No node found at position ".concat(position));
            return null;
        }
        return node;
    }
    catch (error) {
        console.error("Error getting node at position ".concat(position, ":"), error);
        return null;
    }
}
/**
 * Finds the position and instance of a node in the document
 * @param props Object containing editor, node (optional), and nodePos (optional)
 * @param props.editor The Tiptap editor instance
 * @param props.node The node to find (optional if nodePos is provided)
 * @param props.nodePos The position of the node to find (optional if node is provided)
 * @returns An object with the position and node, or null if not found
 */
function findNodePosition(props) {
    var _a;
    var editor = props.editor, node = props.node, nodePos = props.nodePos;
    if (!editor || !((_a = editor.state) === null || _a === void 0 ? void 0 : _a.doc))
        return null;
    var hasValidNode = node !== undefined && node !== null;
    var hasValidPos = isValidPosition(nodePos);
    if (!hasValidNode && !hasValidPos) {
        return null;
    }
    if (hasValidNode) {
        var foundPos_1 = -1;
        var foundNode_1 = null;
        editor.state.doc.descendants(function (currentNode, pos) {
            if (currentNode === node) {
                foundPos_1 = pos;
                foundNode_1 = currentNode;
                return false;
            }
            return true;
        });
        if (foundPos_1 !== -1 && foundNode_1 !== null) {
            return { pos: foundPos_1, node: foundNode_1 };
        }
    }
    if (hasValidPos) {
        var nodeAtPos = findNodeAtPosition(editor, nodePos);
        if (nodeAtPos) {
            return { pos: nodePos, node: nodeAtPos };
        }
    }
    return null;
}
/**
 * Checks if the current selection in the editor is a node selection of specified types
 * @param editor The Tiptap editor instance
 * @param types An array of node type names to check against
 * @returns boolean indicating if the selected node matches any of the specified types
 */
function isNodeTypeSelected(editor, types) {
    if (types === void 0) { types = []; }
    if (!editor || !editor.state.selection)
        return false;
    var state = editor.state;
    var selection = state.selection;
    if (selection.empty)
        return false;
    if (selection instanceof state_1.NodeSelection) {
        var node = selection.node;
        return node ? types.includes(node.type.name) : false;
    }
    return false;
}
/**
 * Check whether the current selection is fully within nodes
 * whose type names are in the provided `types` list.
 */
function selectionWithinConvertibleTypes(editor, types) {
    var _a, _b;
    if (types === void 0) { types = []; }
    if (!editor || types.length === 0)
        return false;
    var state = editor.state;
    var selection = state.selection;
    var allowed = new Set(types);
    if (selection instanceof state_1.NodeSelection) {
        var nodeType = (_b = (_a = selection.node) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.name;
        return !!nodeType && allowed.has(nodeType);
    }
    if (selection instanceof state_1.TextSelection || selection instanceof state_1.AllSelection) {
        var valid_1 = true;
        state.doc.nodesBetween(selection.from, selection.to, function (node) {
            if (node.isTextblock && !allowed.has(node.type.name)) {
                valid_1 = false;
                return false;
            }
            return valid_1;
        });
        return valid_1;
    }
    return false;
}
var ATTR_WHITESPACE = /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;
function isAllowedUri(uri, protocols) {
    var allowedProtocols = [
        "http",
        "https",
        "ftp",
        "ftps",
        "mailto",
        "tel",
        "callto",
        "sms",
        "cid",
        "xmpp",
    ];
    if (protocols) {
        protocols.forEach(function (protocol) {
            var nextProtocol = typeof protocol === "string" ? protocol : protocol.scheme;
            if (nextProtocol) {
                allowedProtocols.push(nextProtocol);
            }
        });
    }
    return (!uri ||
        uri.replace(ATTR_WHITESPACE, "").match(new RegExp("^(?:(?:".concat(allowedProtocols.join("|"), "):|[^a-z]|[a-z0-9+.\\-]+(?:[^a-z+.\\-:]|$))"), "i")));
}
function sanitizeUrl(inputUrl, baseUrl, protocols) {
    if (baseUrl === void 0) { baseUrl = window.location.href; }
    try {
        var url = new URL(inputUrl, baseUrl);
        if (isAllowedUri(url.href, protocols)) {
            return url.href;
        }
    }
    catch (_a) {
        // If URL creation fails, it's considered invalid
    }
    return "#";
}
