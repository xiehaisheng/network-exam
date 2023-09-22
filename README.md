# React + Antd-Mobile + Axios + Typescript
## 快速开始
#### 本地

1. 安装依赖， npm install
2. 本地编译， npm run dev

#### 线上

1. 编译， npm run build:prod
2. 项目跟目录 /dist


## 路由

* 约定式路由，根据pathname自动解析到pages路径
* 404和异常会走error页面
* 最多建议两级

## 布局

1. 在 components/layout 新增对应的文件
2. 在 router 根据pathname增加对应的布局组件

## 资源

* 建议放在路由页面的assets文件夹下，通过require引入

## 合并基础仓库

* sh merge.sh

## 约定

* 文件名采用小写，多个单词用-连接

### 文件规范

外层可以嵌套路由目录前缀，到页面级别约定如下

├── components
│   └── common.tsx           通用组件
│   └── index-card.tsx       index页面中卡片组件
│   └── detail-card.tsx      详情页面中卡片组件
├── assets
│   └── index-bg.png
├── utils
│   └── time.ts
├── index.tsx                入口页面
├── detail.tsx               详情页面