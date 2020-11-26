// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
/**
 * 这是一种依赖场景和组件的启动和初始化框架的方式
 */
const { ccclass, property } = cc._decorator;
import { App } from "@ailhc/egf-core"
import { FrameworkLoader } from "./boot-loaders/FrameworkLoader";
import { setModuleMap, m } from "./ModuleMap";
declare global {

}
@ccclass
export default class AppMain extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._initFramework();
    }
    private _initFramework() {
        const app = new App<IModuleMap>();
        app.bootstrap([new FrameworkLoader()]);
        setModuleMap(app.moduleMap);
        app.init();
        window["m"] = m;//挂在到全局，方便控制台调试，生产环境可以屏蔽=>安全
        m.helloWorld.say();
    }
    start() {

    }

    // update (dt) {}
}
