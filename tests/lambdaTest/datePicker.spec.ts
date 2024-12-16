import {test as it} from "@playwright/test"
import {DatePicker} from "../../pageObject/LambdaTest/Solutions/DatePicker";
import {expect} from "@playwright/test"

it.describe ('Date Picker PAGE', () => {

  it('set random date for From input field', async ({page}) => {
    const datePicker = new DatePicker(page)
    await datePicker.open()
    // page.goto ('https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo')
    await datePicker.verifyHeader()
    await datePicker.dateFromToday()

  })
  it('set random date for To input field', async ({page}) => {
    const datePicker = new DatePicker(page)
    await datePicker.open()
    await datePicker.verifyHeader()
    await datePicker.dateToToday()
    // await page.pause ()
  })


  it("should pick 29th February in a random leap year", async ({page}) => {
    const datePicker = new DatePicker(page);
    await page.reload()

    // Define the range of years
    const startYear = 1980;
    const endYear = 2036;

    // Generate a random leap year
    let randomYear: number;
    do {
      randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    } while (!isLeapYear(randomYear)); // Ensure it's a leap year

    console.log(`Randomly selected leap year: ${randomYear}`);

    // Navigate to February of the random leap year
    await datePicker.page.locator(datePicker.fromInput).click();
    await navigateToYear(datePicker, randomYear);
    await navigateToMonth(datePicker, "Feb");

    // Select 29th February
    const day = "29";
    await datePicker.page
      .locator(datePicker.dayFromComponent)
      .getByRole("link", {name: day, exact: true})
      .click();

    // Validate the selected date
    const selectedDate = await datePicker.page.locator(datePicker.fromInput).inputValue();
    expect(selectedDate).toBe(`02/${day}/${randomYear}`);
    console.log(`Selected date: ${selectedDate}`);
  });


  /**
   * Determines if a given year is a leap year.
   * @param {number} year - The year to check.
   * @returns {boolean} - Returns true if the year is a leap year, false otherwise.
   */
  function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  /**
   * Navigates to the specified year in the date picker.
   * @param {DatePicker} datePicker - The DatePicker page object.
   * @param {number} targetYear - The year to navigate to.
   */
  async function navigateToYear(datePicker: DatePicker, targetYear: number) {
    while (true) {
      const currentYear = await datePicker.page.locator(datePicker.dateOfTheYear).textContent();
      if (parseInt(currentYear!) === targetYear) break;

      if (parseInt(currentYear!) > targetYear) {
        await datePicker.page.locator(datePicker.prevMonth).click();
      } else {
        await datePicker.page.locator(datePicker.nextMonthTo).click();
      }
    }
  }

  /**
   * Navigates to the specified month in the date picker.
   * @param {DatePicker} datePicker - The DatePicker page object.
   * @param {string} targetMonth - The month to navigate to (e.g., "Feb").
   */
  async function navigateToMonth(datePicker: DatePicker, targetMonth: string) {
    while (true) {
      const currentMonth = await datePicker.page
        .locator(datePicker.dateOfTheMonth)
        .locator('[selected="selected"]')
        .textContent();
      if (currentMonth === targetMonth) break;

      await datePicker.page.locator(datePicker.prevMonth).click();
    }
  }

  it("should prevent selecting a To date before the From date", async ({ page }) => {
    const datePicker = new DatePicker(page);

    // Open the Date Picker page and verify the header
    await datePicker.open();
    await datePicker.verifyHeader();

    // Set a random "From" date
    await datePicker.dateFromToday();
    const fromDate = await page.locator(datePicker.fromInput).inputValue();
    console.log(`Selected From date: ${fromDate}`);

    // Attempt to select a "To" date before the "From" date
    await page.locator(datePicker.toInput).click(); // Open the "To" date picker
    await page.locator(datePicker.prevMonthTo).click(); // Navigate to the previous month

    // Select the last day of the previous month
    const lastDayOfPrevMonth =  page
      .locator(`${datePicker.dayToComponent} a`)
      .last(); // Select the last element directly

    const invalidDayText = await lastDayOfPrevMonth.textContent();
    console.log(`Attempting to select invalid To date: ${invalidDayText}`);

    await lastDayOfPrevMonth.click(); // Attempt to select the invalid date

    // Validate that the "To" date input value is not updated to the invalid date
    const toDate = await page.locator(datePicker.toInput).inputValue();
    console.log(`Actual To date after invalid selection attempt: ${toDate}`);

    // Ensure the "To" date is not before the "From" date
    expect(new Date(toDate).getTime()).toBeGreaterThanOrEqual(new Date(fromDate).getTime());
    console.log(
      `Validation passed: To date (${toDate}) is not before the From date (${fromDate}).`
    );
  });
});













