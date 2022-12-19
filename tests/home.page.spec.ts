
import test, { Browser, chromium, expect, Page, BrowserContext } from "@playwright/test";
import Home from "../pages/Home";
import endpoint from "../configTypes"


test.describe('Test Homepage', async() =>{ 

    let page: Page;
    let browser: Browser;
    let context: BrowserContext;
    let home: Home;

    
    test.beforeAll(async()=>{
      browser = await chromium.launch({
        headless: false,
      }
      );
      context = await browser.newContext();
      page = await context.newPage();
      home = new Home(page);
      await home.navigate(endpoint.BASEURL);
    })


    test('My Account Menu', async()=>{
         
      let options = await home.myAccountMenuOptions();
      expect( options.sort()).toEqual(["Login", "Register"])
       
    });




})