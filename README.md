# Novetra Tech

新纬科技 `Novetra Tech` 官网项目代码仓库。

这是一个面向东南亚市场的企业官网，重点展示新纬科技在数字平台开发、移动应用开发、AI 智能系统与数字内容制作方面的能力，帮助潜在客户快速了解公司定位、服务范围与合作方式。

## 项目简介

新纬科技是一家立足柬埔寨、服务东盟市场的创新科技公司，致力于为企业打造完整的数字基础设施，推动客户从传统经营模式向智能化、数据化、平台化升级。

本项目承载官网的品牌表达与业务介绍，核心目标包括：

- 展示公司品牌形象与市场定位
- 介绍核心服务与差异化优势
- 提供清晰的联系入口与商务转化路径
- 支持通过表单收集潜在客户咨询

## 网站内容结构

当前官网主要包含以下模块：

- `Hero`：品牌主视觉与核心价值主张
- `Services`：数字平台、移动应用、AI 系统、数字内容等服务介绍
- `WhyUs`：东盟市场、本地化经验、产品思维与 AI 落地能力说明
- `About`：公司简介与长期合作定位
- `Contact`：联系信息、二维码与咨询表单
- `Footer`：关联项目与站点补充信息

## 技术栈

- `React 19`
- `TypeScript`
- `Vite`
- `CSS Modules`
- `Supabase Edge Functions`（用于联系表单服务端处理）
- `Vercel`（用于站点部署）

## 本地开发

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

## 环境变量

联系表单依赖以下环境变量：

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

请在本地创建对应的环境变量文件，并通过安全方式管理生产环境配置，不要将密钥直接提交到仓库。

## 目录结构

```text
.
├── public/                    # 静态资源
├── src/
│   ├── components/            # 页面模块组件
│   ├── App.tsx                # 页面入口组合
│   ├── main.tsx               # 应用入口
│   └── index.css              # 全局样式
├── supabase/
│   └── functions/
│       └── send-contact/      # 联系表单服务端函数
├── package.json
└── vite.config.ts
```

## 部署说明

项目适合部署到 `Vercel`。标准流程如下：

```bash
npm run build
vercel deploy
```

如需正式发布，可使用：

```bash
vercel deploy --prod
```

## 项目定位

这个仓库不仅是一个官网前端项目，也是一套对外品牌表达载体。它的作用不只是“展示页面”，而是帮助新纬科技用更清晰、专业、可转化的方式向客户说明：

- 我们服务谁
- 我们能做什么
- 我们为什么值得合作
- 客户如何快速联系到我们
