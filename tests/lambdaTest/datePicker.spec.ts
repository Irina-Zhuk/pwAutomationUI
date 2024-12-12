import {test as it} from "@playwright/test"
import {DatePicker} from "../../pageObject/LambdaTest/Solutions/DatePicker";

it.describe ('Date Picker PAGE', () => {

  it ('set random date for From input field',  async ({page}) => {
    const datePicker = new DatePicker(page)
    await datePicker.open()
    // page.goto ('https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo')
    await datePicker.verifyHeader()
    await datePicker.dateFromToday()

  })
  it ('set random date for To input field',  async ({page}) => {
    const datePicker = new DatePicker(page)
    await datePicker.open()

    await datePicker.verifyHeader()
    await datePicker.dateToToday()
    // await page.pause ()
  })
})

