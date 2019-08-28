# ks-thanos-web
灭霸系统（web）-  打造灵活的前端模板

## 目录结构
````
|--ks-thanos-web  
    |--build    打包后到文件夹  
    |--config   webpack基础配置  
    |--public   入口html  
    |--scripts  webpack启动配置  
    |--src      开发目录  
        |--api  接口  
        |--bizComponents    拖拽组件  
        |--components       可配置组件  
            |--{componentFile}
                |--config.tsx   抽屉配置组件  
                |--index.tsx    组件入口
                |--utils.tsx    组件配置
        |--pages            页面
            |--components   页面公用组件
            |--{pageFile}
                |--components   页面内组件
                |--model        页面model
                |--index.tsx     页面入口
                |--index.scss   页面样式
        |--utils    公共方法
        |--index.tsx    入口文件
        |--index.scss   全局样式
        |--router.ts    路由配置

````
## 组件开发
### 示例：开发Select组件
1. 在创建 ./src/components/ 文件夹下创建Select文件夹；目录结构、内容参考Table、Input组件；
2. 开发抽屉配置组件 config.tsx;
3. 维护wiki文档；




