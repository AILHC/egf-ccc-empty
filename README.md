# egf-ccc-empty
基于EasyGameFramework核心模块`egf-core`(模块管理器)的CocosCreator2.x的空项目

## 简介
可以通过 install 框架的npm包，或者通过typescript以添加模块扩展框架
## 安装
1. 安装框架

npm init 

npm install @ailhc/egf-core 即可使用

2. 安装扩展其他库
如果是本地开发的，可以在库的项目根目录 npm link 或者 yarn link

然后在cocos项目 npm link xxx 或yarn link

## 使用
1. 方式一:
打开 start 场景
看脚本 AppMain.ts
通过 CocosCreator加载脚本的逻辑，加载即运行框架的初始化
这个时机是在引擎加载完成后，插件脚本加载完后，场景组件脚本生命周期运行之前（场景加载运行之前）
但是如果你的其他脚本也是通过这种方式执行,那么这个时机就会有冲突，比如装饰器之类的

```ts
import { App } from "@ailhc/egf-core"
import { FrameworkLoader } from "./boot-loaders/FrameworkLoader";
import { setModuleMap, m } from "./ModuleMap";
/**
 * 这是一种启动和初始化框架的方式，在cocos加载脚本时启动
 * 不依赖场景加载和节点组件挂载
 */
export class AppMain {
    public static app: App<IModuleMap>;
    public static initFramework() {
        const app = new App<IModuleMap>();
        AppMain.app = app;
        app.bootstrap([new FrameworkLoader()]);
        setModuleMap(app.moduleMap);
        app.init();
        window["m"] = m;//挂在到全局，方便控制台调试，生产环境可以屏蔽=>安全
        m.helloWorld.say();
    }

}
AppMain.initFramework();

```

2. 方式二:
打开 start-with-comp 场景
看脚本AppMainComp.ts
通过场景中的节点组件的生命周期来启动和初始化框架
这个时机是引擎加载完成后，插件脚本加载后，框架所在场景加载后，框架在挂节点的生命周期运行后开始。
```ts

import { App } from '@ailhc/egf-core';

import { _decorator, Component, Node } from 'cc';
import { m, setModuleMap } from './ModuleMap';
import { FrameworkLoader } from './boot-loaders/FrameworkLoader';
const { ccclass, property } = _decorator;

@ccclass('AppMainComp')
export class AppMainComp extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;

    onLoad() {
        this._initFramework();
    }
    private _initFramework() {
        const app = new App<IModuleMap>();
        // new TestImport();
        app.bootstrap([new FrameworkLoader()]);
        // app.bootstrap([new FrameworkLoader2()]);
        setModuleMap(app.moduleMap);
        app.init();
        window["m"] = m;//挂在到全局，方便控制台调试，生产环境可以屏蔽=>安全
        m.helloWorld.say();
    }
    start() {

    }

    // update (dt) {}
}

```
>PS: 这里的时机就比较靠后了，依赖节点，注意这个组件实例会被切换场景后清掉。

## 每个文件的作用说明

1. AppMain.ts/AppMainComp.ts

    框架初始化用的
2. ModuleMap.ts

    这是一个安全的全局引用依赖点 ，而且只需要将m这个变量挂载到window下就可以方便调试了
    IModuleMap 这是全局模块接口声明
    
    这些都是可以自定义和框架无关。
    没有它你也可以通过 获取app来获取和调用模块
3. FrameworkLoader.ts

    这个的作用是进行模块加载，隔离模块加载的细节，可以通过替换来达到不同环境加载不同模块或者给予相同模块不同的初始化参数等等
4. HelloWorld.ts

    扩展模块

