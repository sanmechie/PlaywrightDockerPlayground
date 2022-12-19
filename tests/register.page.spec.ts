import test, {
  Browser,
  chromium,
  expect,
  Page,
  BrowserContext,
} from '@playwright/test';
import endpoint from '../configTypes';
import Register from '../pages/Register';

test.describe('POM Framework for register page', async () => {
  let page: Page;
  let browser: Browser;
  let context: BrowserContext;
  let register: Register;

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
    register = new Register(page);
    await register.navigate(endpoint.BASEURL);
  });

  test('Simple form validation', async () => {
    await register.setFirstName('Sandeep');
    expect(await register.getFirstName()).toEqual('Sandeep');
  });

  //  test('Test header menu', async()=>{
  //   await expect (page.locator("ul[class='navbar-nav horizontal'] > li")).
  //   toContainText(["Home", "Blog"

  //   ]);

  //  })
});
