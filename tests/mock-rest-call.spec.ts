
import test, { Browser, chromium, expect, Page, BrowserContext } from "@playwright/test";
import Home from "../pages/Home";
import endpoint from "../configTypes"


test.describe('Test Homepage', async() =>{ 

      let page: Page;
      let browser: Browser;
      let context: BrowserContext;

    
    test.beforeAll(async()=>{
      browser = await chromium.launch({
        headless: false,
      }
      );
      context = await browser.newContext();
      page = await context.newPage();
    })


    test('Example of mockking api call', async()=>{

        // this is return a mocked respone
        await page.route("http://127.0.0.1:9091/cities", async (route)=>{

            const response = await route.fetch()
            const json = response.json()
            console.log(json)
            route.fulfill({
                body: JSON.stringify([{'name': 'London', 'area': 2000}])
            })
        })
        await page.goto(endpoint.MOCKURL);
        await page.locator("div > div[id='mat-select-value-1']").click()
        let data = await page.locator('div > div > div[role="listbox"]>mat-option').allInnerTexts()
        console.log(data)

       
    });




})