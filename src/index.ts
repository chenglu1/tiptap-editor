// ==========================================
// UI 组件 - 工具栏按钮和菜单
// ==========================================
// 注意：SimpleEditor 和 MarkdownEditorDemo 已移至 examples 目录
// 作为使用示例，不再作为库的一部分导出
export { BlockquoteButton } from './components/tiptap-ui/blockquote-button'
export { CodeBlockButton } from './components/tiptap-ui/code-block-button'
export { HeadingDropdownMenu } from './components/tiptap-ui/heading-dropdown-menu'
export { ImageUploadButton } from './components/tiptap-ui/image-upload-button'
export { ListDropdownMenu } from './components/tiptap-ui/list-dropdown-menu'
export { MarkButton } from './components/tiptap-ui/mark-button'
export { TableDropdownMenu } from './components/tiptap-ui/table-dropdown-menu'
export { TableFloatingToolbar } from './components/tiptap-ui/table-floating-toolbar'
export { TextAlignButton } from './components/tiptap-ui/text-align-button'
export { UndoRedoButton } from './components/tiptap-ui/undo-redo-button'

// Color Highlight Popover
export {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from './components/tiptap-ui/color-highlight-popover'

// Link Popover
export {
  LinkPopover,
  LinkContent,
  LinkButton,
} from './components/tiptap-ui/link-popover'

// ==========================================
// UI 原始组件 (Primitives)
// ==========================================
export { Badge } from './components/tiptap-ui-primitive/badge'
export { Button } from './components/tiptap-ui-primitive/button'
export { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter, 
  CardItemGroup, 
  CardGroupLabel 
} from './components/tiptap-ui-primitive/card'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './components/tiptap-ui-primitive/dropdown-menu'
export { Input } from './components/tiptap-ui-primitive/input'
export {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from './components/tiptap-ui-primitive/popover'
export { Separator } from './components/tiptap-ui-primitive/separator'
export { Spacer } from './components/tiptap-ui-primitive/spacer'
export {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from './components/tiptap-ui-primitive/toolbar'
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './components/tiptap-ui-primitive/tooltip'

// ==========================================
// Tiptap 节点扩展
// ==========================================
export { ImageUploadNode } from './components/tiptap-node/image-upload-node/image-upload-node-extension'
export { HorizontalRule } from './components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension'

// ==========================================
// React Hooks
// ==========================================
export { useTiptapEditor } from './hooks/use-tiptap-editor'
export { useIsMobile } from './hooks/use-mobile'
export { useWindowSize } from './hooks/use-window-size'
export { useCursorVisibility } from './hooks/use-cursor-visibility'
export { useComposedRef } from './hooks/use-composed-ref'
export { useElementRect } from './hooks/use-element-rect'
export { useMenuNavigation } from './hooks/use-menu-navigation'
export { useScrolling } from './hooks/use-scrolling'
export { useThrottledCallback } from './hooks/use-throttled-callback'
export { useUnmount } from './hooks/use-unmount'

// ==========================================
// 工具函数
// ==========================================
export {
  cn,
  handleImageUpload,
  MAX_FILE_SIZE,
} from './lib/tiptap-utils'

// ==========================================
// 图标组件
// ==========================================
export { AlignCenterIcon } from './components/tiptap-icons/align-center-icon'
export { AlignJustifyIcon } from './components/tiptap-icons/align-justify-icon'
export { AlignLeftIcon } from './components/tiptap-icons/align-left-icon'
export { AlignRightIcon } from './components/tiptap-icons/align-right-icon'
export { ArrowLeftIcon } from './components/tiptap-icons/arrow-left-icon'
export { BanIcon } from './components/tiptap-icons/ban-icon'
export { BlockquoteIcon } from './components/tiptap-icons/blockquote-icon'
export { BoldIcon } from './components/tiptap-icons/bold-icon'
export { ChevronDownIcon } from './components/tiptap-icons/chevron-down-icon'
export { CloseIcon } from './components/tiptap-icons/close-icon'
export { CodeBlockIcon } from './components/tiptap-icons/code-block-icon'
export { Code2Icon } from './components/tiptap-icons/code2-icon'
export { CornerDownLeftIcon } from './components/tiptap-icons/corner-down-left-icon'
export { ExternalLinkIcon } from './components/tiptap-icons/external-link-icon'
export { HeadingIcon } from './components/tiptap-icons/heading-icon'
export { HeadingOneIcon } from './components/tiptap-icons/heading-one-icon'
export { HeadingTwoIcon } from './components/tiptap-icons/heading-two-icon'
export { HeadingThreeIcon } from './components/tiptap-icons/heading-three-icon'
export { HeadingFourIcon } from './components/tiptap-icons/heading-four-icon'
export { HeadingFiveIcon } from './components/tiptap-icons/heading-five-icon'
export { HeadingSixIcon } from './components/tiptap-icons/heading-six-icon'
export { HighlighterIcon } from './components/tiptap-icons/highlighter-icon'
export { ImagePlusIcon } from './components/tiptap-icons/image-plus-icon'
export { ItalicIcon } from './components/tiptap-icons/italic-icon'
export { LinkIcon } from './components/tiptap-icons/link-icon'
export { ListIcon } from './components/tiptap-icons/list-icon'
export { ListOrderedIcon } from './components/tiptap-icons/list-ordered-icon'
export { ListTodoIcon } from './components/tiptap-icons/list-todo-icon'
export { MoonStarIcon } from './components/tiptap-icons/moon-star-icon'
export { Redo2Icon } from './components/tiptap-icons/redo2-icon'
export { StrikeIcon } from './components/tiptap-icons/strike-icon'
export { SubscriptIcon } from './components/tiptap-icons/subscript-icon'
export { SunIcon } from './components/tiptap-icons/sun-icon'
export { SuperscriptIcon } from './components/tiptap-icons/superscript-icon'
export { TableIcon } from './components/tiptap-icons/table-icon'
export { TrashIcon } from './components/tiptap-icons/trash-icon'
export { UnderlineIcon } from './components/tiptap-icons/underline-icon'
export { Undo2Icon } from './components/tiptap-icons/undo2-icon'

// ==========================================
// 样式文件 (需要用户手动导入)
// ==========================================
// 用户需要在应用中导入:
// import '@yourpackage/tiptap-editor/dist/style.css'
