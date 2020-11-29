declare global {
    interface IModuleMap {
        helloWorld: HelloWorld
    }
}
export class HelloWorld implements egf.IModule {
    key: string = "helloWorld";
    say(str?: string) {
        console.log(`hello ${str ? str : "world"}`);
    }
}