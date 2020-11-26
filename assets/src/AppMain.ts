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
