import { HeroWorld } from "../hello-world";


export class FrameworkLoader implements egf.IBootLoader {
    onBoot(app: egf.IApp, bootEnd: egf.BootEndCallback): void {
        const helloWorld = new HeroWorld();
        app.loadModule(helloWorld);
        bootEnd(true);
    }

}