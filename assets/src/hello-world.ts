declare global {
    interface IModuleMap {
        helloWorld: HeroWorld
    }
}
export class HeroWorld implements egf.IModule {
    key: string = "helloWorld";
    say(str?: string) {
        console.log(`hello ${str ? str : "world"}`);
    }
}