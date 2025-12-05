"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizontalRule = void 0;
var react_1 = require("@tiptap/react");
var extension_horizontal_rule_1 = require("@tiptap/extension-horizontal-rule");
exports.HorizontalRule = extension_horizontal_rule_1.default.extend({
    renderHTML: function () {
        return [
            "div",
            (0, react_1.mergeAttributes)(this.options.HTMLAttributes, { "data-type": this.name }),
            ["hr"],
        ];
    },
});
exports.default = exports.HorizontalRule;
