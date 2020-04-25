<h1 align="center">线索池</h1>

<div align="center">
An out-of-box UI solution for enterprise applications as a Vue boilerplate. based on  <a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>


环境和依赖
----
- node
- yarn
- webpack
- eslint
- @vue/cli ~3
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- [vue-cropper](https://github.com/xyxiao001/vue-cropper) - 头像裁剪组件
- [echarts](https://www.echartsjs.com/zh/download.html) - 数据可视化图表
> 请注意，我们强烈建议本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本，而引入了新版本所照成的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。



项目下载和运行
----

- 拉取项目代码
```bash
git clone http://gitlab.example.com/change/pool-front.git
cd pool-front
```

- 安装依赖
```
npm install
```

- 开发模式运行
```
npm run serve
```

- 编译项目
```
npm run build
```

- Lints and fixes files
```
yarn run lint
```



## 目录结构如下
```
|   |--- dist  打包后生成的目录文件
|   |--- docs  框架一些说明内容
|   |--- public 
|   |--- src 
|   | |--- api  调用接口
|   | |--- assets  图片，图标
|   |--- config
|   | |--- router.config.js  路由文件
|   |--- views
|   | |--- exception  403 404 
|   | |--- market  市场相关
|   | | | |-- analysis  数据分析
|   | | | |-- bidding  竞价数据
|   | | | |-- configureServer  配置服务器
|   | | | |-- cusSearch  客户查询
|   | | | |-- customerVolumeSetting  客户量设置
|   | | | |-- otherSettings  其他设置
|   | | | |-- pushList  推送列表
|   | | | |-- service  数据录入
|   | | | |-- setUpTheSystem  系统设置
|   | | | |-- source  来源设置
|   | | | |-- swt  商务通设置
|   | |--- sysSetting  系统设置
|   | | | |-- depament  员工与部门管理
|   | | | |-- permission  角色权限控制
|   | | | |-- menu  菜单管理
|   | | | |-- log 系统日志
|   | |--- user  登陆，用户设置相关
|   | | | |-- center  用户设置
|   | | | |-- team  组员管理
|   | | | |-- message  消息中心
```

其他说明
----

- 项目使用的 [vue-cli3](https://cli.vuejs.org/guide/), 请更新您的 cli

- 关闭 Eslint (不推荐) 移除 `package.json` 中 `eslintConfig` 整个节点代码

- 开启组件按需加载 `/src/main.js` L7 修改为 `import './core/lazy_use'`

- 修改 Ant Design 配色，在文件 `vue.config.js` 中，其他 less 变量覆盖参考 [ant design](https://ant.design/docs/react/customize-theme-cn) 官方说明
```ecmascript 6
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
        },
        javascriptEnabled: true,
      }
    }
  }
```
- **使用polyfill兼容至 IE10**

- 移除polyfill。 polyfill用于兼容IE，不需要兼容IE可移除。减少体积
  > 参考 [Vue CLI Polyfill](https://cli.vuejs.org/zh/guide/browser-compatibility.html#usebuiltins-usage)
  
  - 移除入口文件的 `import '@babel/polyfill'`
    
  - 删除 `babel.conflg.js` 中的
    ```ecmascript 6
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry'
      }
    ]
    ```


附属文档
----

- [路由/菜单说明](https://github.com/sendya/ant-design-pro-vue/blob/master/src/router/README.md)
- [Table 重封装组件](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/table/README.md) [@Saraka](https://github.com/saraka-tsukai)
- [ANTD 默认配置项](https://github.com/sendya/ant-design-pro-vue/blob/master/src/defaultSettings.js)
- [按需加载/减少打包大小](https://github.com/sendya/ant-design-pro-vue/blob/master/docs/load-on-demand.md)  
- [为首屏增加 Loading 动画](https://github.com/sendya/ant-design-pro-vue/blob/master/docs/add-page-loading-animate.md)
- [多标签页组件 feature/multi-tabs](https://github.com/sendya/ant-design-pro-vue/tree/feature/multi-tabs) [如何移除](https://github.com/sendya/ant-design-pro-vue/blob/master/docs/multi-tabs.md)
- [按需加载用例 feature/demand_load](https://github.com/sendya/ant-design-pro-vue/tree/feature/demand_load)
- [多语言使用案例 feature/lang](https://github.com/sendya/ant-design-pro-vue/tree/feature/lang) [@musnow](https://github.com/musnow) 提供
- [为项目增加依赖项分析工具 analyzer](https://github.com/sendya/ant-design-pro-vue/blob/master/docs/webpack-bundle-analyzer.md)  
- ANTD PRO 额外组件
  - Trend 趋势标记 [Trend.md](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/Trend/index.md)
  - AvatarList 用户头像列表 [AvatarList.md](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/AvatarList/index.md)
  - CountDown 倒计时 [CountDown.md](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/CountDown/index.md)
  - Ellipsis 文本自动省略号 [Ellipsis.md](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/Ellipsis/index.md)
  - NumberInfo 数据文本 [NumberInfo.md](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/NumberInfo/index.md)
  - FooterToolbar 底部工具栏 [FooterToolbar.md](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/FooterToolbar/index.md)
  - IconSelector 图标选择组件 [IconSelector.md](https://github.com/sendya/ant-design-pro-vue/blob/master/src/components/IconSelector/README.md) 提供: [@Saraka](https://github.com/saraka-tsukai)
- 其他待补充...




