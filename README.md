
# Tiptap Editor 项目

本项目是一个基于 Tiptap 的富文本编辑器，支持 Markdown、表格、图片、代码块、任务列表、数学公式等多种内容类型，适用于技术文档、知识库、博客等场景。

## 主要功能
- Markdown 实时解析与渲染
- 富文本编辑（加粗、斜体、下划线、删除线、代码等）
- 表格节点支持行/列添加、删除，浮动工具栏操作
- 图片上传与插入
- 任务列表、待办清单
- 数学公式（KaTeX）
- 高亮、引用、标题、分割线等
- 支持移动端与响应式布局

## 快速开始
1. 克隆项目并安装依赖：
   ```bash
   git clone <your-repo-url>
   cd tiptap-editor
   pnpm install
   pnpm run dev
   ```
2. 打开浏览器访问本地开发地址（如 http://localhost:5173）。

## 编辑器界面说明
- 左侧为 Markdown 输入区，可直接粘贴或编写 Markdown 文本。
- 右侧为 Tiptap 富文本编辑区，支持所见即所得操作。
- 工具栏包含常用格式化按钮（撤销、重做、标题、列表、引用、代码块、表格、图片、链接、对齐、主题切换等）。
- 表格节点处会自动显示浮动工具栏，可直接添加/删除行列。

## 表格操作
- 插入表格：点击工具栏表格按钮，插入默认 2x2 表格。
- 行列操作：点击表格上方浮动工具栏的“+行”、“-行”、“+列”、“-列”按钮。

## 图片上传
- 点击工具栏图片按钮，选择本地图片上传。
- 支持拖拽图片到编辑区。

## 代码块与高亮
- 支持多语言代码块，语法高亮。
- 可插入高亮文本。

## 数学公式
- 支持 KaTeX 数学公式，输入 `$公式内容$` 或 `$$公式内容$$`。

## 任务列表
- 支持 Markdown 语法的任务列表（- [ ]、- [x]）。

## 主题与响应式
- 支持浅色/深色主题切换。
- 移动端自动适配。

## 目录结构简述
- `src/components/tiptap-templates/`：编辑器模板与主页面
- `src/components/tiptap-ui/`：UI 组件（工具栏、按钮、浮动工具栏等）
- `src/components/tiptap-node/`：自定义节点扩展（如表格、图片、代码块等）
- `src/hooks/`：自定义 React hooks
- `src/lib/`：工具函数
- `public/`：静态资源

## 常见问题
- 编辑器内容如何导出为 Markdown？点击“← Extract Markdown”按钮即可。
- 如何解析 Markdown 到编辑器？点击“Parse Markdown →”按钮。
- 表格工具栏未显示？请确保光标在表格节点内。

## 技术栈说明
- 本项目基于 Vite + React + TypeScript 构建，支持 HMR 热更新。
- 使用 Tiptap 作为富文本编辑器内核。
- 相关 ESLint 配置与 React/Vite 插件可参考下方原始模板说明。

---

# React + TypeScript + Vite

本项目基于 Vite 官方模板，原始说明如下：

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
