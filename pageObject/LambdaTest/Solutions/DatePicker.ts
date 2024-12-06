import {expect, Page} from "@playwright/test"
export class DatePicker {

  page: Page;
  constructor(page:Page) {
    this.page = page
  }
  header = "h1"
  url = 'https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo'
  async open() {
    await this.page.goto(this.url)
  }
  async verifyHeader(){
     const header = this.page.locator (this.header)
     await expect (header).toContainText('Date Picker')
  }
}
