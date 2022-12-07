import { Page } from '@playwright/test';
import Base from './Base';

export default class Register extends Base {
  readonly register_fname: string;

  constructor(page: Page) {
    super(page);
    this.register_fname = 'input#input-firstname';
  }

  public async setFirstName(fillText: string) {
    await this.page.locator(`${this.register_fname}`).fill(fillText);
  }

  public async getFirstName() {
    let firstName = this.page.locator(`${this.register_fname}`);
    return await firstName.inputValue();
  }
}
