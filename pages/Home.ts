import { Page } from '@playwright/test';
import Base from './Base';

export default class Home extends Base {
  readonly home_myAccountMenu: string;

  constructor(page: Page) {
    super(page);
    this.home_myAccountMenu = "ul[class='mz-sub-menu-96 dropdown-menu'] > li";
  }

  public async myAccountMenuOptions() {
    let options: string[] = [];
    let text = await this.page.$$(`${this.home_myAccountMenu}`);
    await Promise.all(
      text.map(async (ele) => {
        options.push((await ele.innerText()).trim());
      })
    );

    return options;
  }
}
