import test, {
  Browser,
  chromium,
  expect,
  Page,
  BrowserContext,
} from '@playwright/test';
import endpoint from '../configTypes';

test.describe('Test Homepage', async () => {
  let page: Page;
  let browser: Browser;
  let context: BrowserContext;

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
    });
    context = await browser.newContext();
    page = await context.newPage();
  });

  test('Validate table info text', async () => {
    await page.goto(endpoint.MOCKURL);
    const text = await page.textContent('h3');
    expect(text).toEqual('City and Area');
  });

  test('Validate table column headers', async () => {
    const texts = await page.locator('thead > tr > th').allInnerTexts();
    expect(texts.sort()).toEqual(['Area', 'City']);
  });

  test('Validate cell values using mocked response', async () => {
    //this is return a mocked respone
    await page.route('http://127.0.0.1:9091/cities', async (route) => {
      route.fulfill({
        body: JSON.stringify([{ name: 'London', area: 2000 }]),
      });
    });
    await page.goto(endpoint.MOCKURL);
    expect(await page.textContent('tbody > tr >td>>nth=0')).toEqual('London');
    expect(await page.textContent('tbody > tr >td>>nth=1')).toEqual('2000');
  });

  test('Validate cell values by updating mocked response', async () => {
    //this is return a mocked respone
    await page.route('http://127.0.0.1:9091/cities', async (route) => {
      const response = await route.fetch();
      let json_res = await response.json();
      json_res.push({ name: 'Delhi', area: 5000 });
      route.fulfill({
        body: JSON.stringify(json_res),
      });
    });
    await page.goto(endpoint.MOCKURL);

    let rows = await page.locator('tbody > tr').all();
    const cityData = [];
    for (let i = 0; i < rows.length; i++) {
      cityData.push(
        await page
          .locator(`tbody > tr>>nth=${i}`)
          .locator('td>>nth=0')
          .innerHTML()
      );
    }

    expect(cityData.sort()).toContain(['Bangalore', 'Delhi', 'Mumbai']);
  });

  test('Validate empty City Name cannot be added', async () => {
    await page.goto(endpoint.MOCKURL);
    await page.locator('button').click();
    expect(await page.textContent('div > p')).toEqual('Name cannot be empty');
  });

  test('Validate Area should be greater than 0', async () => {
    await page.goto(endpoint.MOCKURL);
    await page.locator('div>input[placeholder="Name"]').fill('Dummy');
    await page.locator('button').click();
    expect(await page.textContent('div > p')).toEqual(
      'Area should be greater than 0'
    );
  });

  test('Validate new city is added and table updated', async () => {
    await page.route('http://127.0.0.1:9091/cities', async (route, request) => {
      if (route.request().method()) {
        route.fulfill({
          body: JSON.stringify([{ name: 'London', area: 1 }]),
        });
      }
    });
    await page.goto(endpoint.MOCKURL);
    await page.locator('div>input[placeholder="Name"]').fill('London');
    await page.locator('div>input[placeholder="Area"]').fill('1');
    await page.locator('button').click();
    expect(await page.textContent('div > p')).toEqual(
      'London posted successfuly'
    );
    expect(await page.textContent('tbody > tr >td>>nth=0')).toEqual('London');
  });
});
