import {expect, Page} from "@playwright/test"
export class DatePicker {

  page: Page;
  constructor(page:Page) {
    this.page = page
  }
  //selectors
  header = "h1"
  url = 'https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo'
  // From

  fromInput = '#from'
  prevMonth = "[title='Prev']"
  dayOfTheYear =
  dayOfTheMonth =
  dayFromComponent =
  public async open() {
    await this.page.goto(this.url)
  }
  public async verifyHeader(){
     const header = this.page.locator (this.header)
     await expect (header).toContainText('Date Picker')
  }
  randomYearNumber = _.random(1,50)
  date = _.random(1,30)
  public async dateFromToday(){
    await this.page.locator(this.fromInput).click()
    for (let i=0; i < randomNumber; i++)
    await this.page.locator(this.prevMonth).click()

    let year = await this.page.locator(this.dayOfTheYear).textContent()
    let month = await this.page.locator(this.dayOfTheMonth)
      .locator('')
      .textContent()
    let obj = {
      Jan:"01",
      Feb:"02",
      Mar:"03",
      Apr:"04",
      May:"05",
      Jun:"06",
      Jul:"07",
      Aug:"08",
      Sep:"09",
      Oct:"10",
      Nov:"11",
      Dec:"12"
    }


    await this.page.pause()
  }


}
