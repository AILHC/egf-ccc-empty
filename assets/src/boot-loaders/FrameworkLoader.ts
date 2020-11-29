import { HelloWorld } from "../HelloWorld";


export class FrameworkLoader implements egf.IBootLoader {
    onBoot(app: egf.IApp, bootEnd: egf.BootEndCallback): void {
        const helloWorld = new HelloWorld();
        app.loadModule(helloWorld);
        bootEnd(true);
    }

}