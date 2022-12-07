import { Page } from "@playwright/test";


export default class Base {
    constructor(protected page: Page){
    
    }

    public async navigate(url: string){
        await this.page.goto(url);
    }
}