import {expect, Locator, Page} from "@playwright/test"
import  _ from 'lodash'

export class DatePicker {

  page: Page;

  constructor(page: Page) {
    this.page = page
  }

  //selectors
  header = "h1"
  url = 'https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo'
  // From
  fromInput = '#from'
  prevMonth = "[title='Prev']"
  dateOfTheYear = ".ui-datepicker-year"
  dateOfTheMonth = '[class="ui-datepicker-month"]'
  dayFromComponent = '#ui-datepicker-div'
  // To
  toInput = '#to'
  prevMonthTo = "[title='Prev']"
  nextMonthTo = "[title='Next']"
  dateOfTheYearTo = ".ui-datepicker-year"
  dateOfTheMonthTo = '[class="ui-datepicker-month"]'
  dayToComponent = '#ui-datepicker-div'

  public async open() {
    await this.page.goto(this.url)
  }

  public async verifyHeader() {
    const header = this.page.locator(this.header)
    await expect(header).toContainText('Date Picker')
  }

  // randomYearNumber = Math.floor(Math.random() * 1000)
  randomYearNumber = _.random(1, 50)

  // day = _.random(1, 31).toString().padStart(2, '0');

  day = _.random(1, 31).toString().padStart(2, '0');

  public async dateFromToday() {
    let obj = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    }
    await this.page.locator(this.fromInput).click()
    for (let i = 0; i < this.randomYearNumber; i++) {
      await this.page.locator(this.prevMonth).click()
    }
    console.log(this.randomYearNumber)

    let year = await this.page.locator(this.dateOfTheYear).textContent()
    let month = await this.page
      .locator(this.dateOfTheMonth)
      .locator('[selected="selected"]')
      .textContent()
    console.log(year, 'year')
    console.log(month, 'month')
    console.log(this.day, 'day')

    await this.page
      .locator(this.dayFromComponent)
      .getByRole('link', {name: this.day, exact: true})
      .click()

    expect(await this.page.locator(this.fromInput).inputValue()).toBe(
      `${obj[month]}/${this.day}/${year}`,
    ); //mm/dd/yyyy
  }

  public async dateToToday() {
    let obj1 = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    }
    await this.page.locator(this.toInput).click()
    for (let i = 0; i < this.randomYearNumber; i++) {
      await this.page.locator(this.nextMonthTo).click()
    }
    console.log(this.randomYearNumber)

    let year = await this.page.locator(this.dateOfTheYear).textContent()
    let month = await this.page
      .locator(this.dateOfTheMonth)
      .locator('[selected="selected"]')
      .textContent()
    console.log(year, 'year')
    console.log(month, 'month')
    console.log(this.day, 'day')

    await this.page
      .locator(this.dayToComponent)
      .getByRole('link', {name: this.day, exact: true})
      .click()

    expect(await this.page.locator(this.toInput).inputValue()).toBe(
      `${obj1[month]}/${this.day}/${year}`,
    ); //mm/dd/yyyy
  }


    /**
     * Attempts to select a To date earlier than the given From date.
     * @param {Date} fromDate - The From date.
     * @returns {Promise<string>} - The attempted invalid To date.
     */
  public async attemptToSelectBeforeFromDate(fromDate:Date):Promise < string > {
      await this.page.locator(this.toInput).click();

      // Navigate to the previous month
      await this.page.locator(this.prevMonthTo).click();

      // Attempt to select the last day of the previous month
      const previousYear = fromDate.getFullYear();
      const previousMonth = fromDate.getMonth(); // Previous month (0-based)
      const daysInPreviousMonth = new Date(previousYear, previousMonth, 0).getDate();
      const invalidDay = daysInPreviousMonth.toString();

      let month = await this.page
        .locator(this.dateOfTheMonthTo)
        .locator('[selected="selected"]')
        .textContent();
      let year = await this.page.locator(this.dateOfTheYearTo).textContent();

      await this.page
        .locator(this.dayToComponent)
        .getByRole("link", {name: invalidDay, exact: true})
        .click();

      return `${month}/${invalidDay}/${year}`;
    }
  }




