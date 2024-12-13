// import { test as it } from "@playwright/test";
// import { DatePicker } from "../../pageObject/LambdaTest/Solutions/DatePicker";
// import {expect} from "@playwright/test"

// it.describe("Date Picker PAGE", () => {
//   it("set and validate random date for From input field", async ({ page }) => {
//     const datePicker = new DatePicker(page);
//     await datePicker.open();
//     await datePicker.verifyHeader();
//     await datePicker.dateFromToday();
//   });
//
//   it("set and validate random date for To input field", async ({ page }) => {
//     const datePicker = new DatePicker(page);
//     await datePicker.open();
//     await datePicker.verifyHeader();
//     await datePicker.dateToToday();
//   });
//
//   it("validate February in a leap year", async ({ page }) => {
//     const datePicker = new DatePicker(page);
//     await datePicker.open();
//     await datePicker.verifyHeader();
//
//     // Navigate to February of a known leap year
//     await datePicker.page.locator(datePicker.fromInput).click();
//
//     // Simulate leap year by selecting February 2024
//     for (let i = 0; i < 50; i++) {
//       await datePicker.page.locator(datePicker.prevMonth).click();
//     }
//
//     const year = "2024"; // Leap year
//     const month = "Feb";
//     const daysInMonth = new Date(parseInt(year), 2, 0).getDate();
//
//     // Validate February has 29 days in a leap year
//     expect(daysInMonth).toBe(29);
//     console.log(`Leap year validation passed: February ${year} has ${daysInMonth} days.`);
//   });
//
//   it("validate that To date is after From date", async ({ page }) => {
//     const datePicker = new DatePicker(page);
//     await datePicker.open();
//     await datePicker.verifyHeader();
//
//     // Set From date
//     await datePicker.page.locator(datePicker.fromInput).click();
//     const fromYear = "2022";
//     const fromMonth = "12";
//     const fromDay = "15";
//     const fromDate = `${fromMonth}/${fromDay}/${fromYear}`;
//
//     await datePicker.page
//       .locator(datePicker.dayFromComponent)
//       .getByRole("link", { name: fromDay, exact: true })
//       .click();
//
//     expect(await datePicker.page.locator(datePicker.fromInput).inputValue()).toBe(fromDate);
//
//     // Set To date and ensure it is after From date
//     await datePicker.page.locator(datePicker.toInput).click();
//     const toYear = "2022";
//     const toMonth = "12";
//     const toDay = "20";
//     const toDate = `${toMonth}/${toDay}/${toYear}`;
//
//     await datePicker.page
//       .locator(datePicker.dayToComponent)
//       .getByRole("link", { name: toDay, exact: true })
//       .click();
//
//     expect(await datePicker.page.locator(datePicker.toInput).inputValue()).toBe(toDate);
//
//     // Validate that To date is after From date
//     const fromDateObject = new Date(`${fromYear}-${fromMonth}-${fromDay}`);
//     const toDateObject = new Date(`${toYear}-${toMonth}-${toDay}`);
//     expect(toDateObject.getTime()).toBeGreaterThan(fromDateObject.getTime());
//     console.log("Validation passed: To date is after From date.");
//   });
// });





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
    await datePicker.open();
    await datePicker.verifyHeader();

    // Define the range of years
    const startYear = 1980;
    const endYear = 2050;

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
})






