import {test as it} from "@playwright/test"
import {DatePicker} from "../../pageObject/LambdaTest/Solutions/DatePicker";

it.describe ('Date Picker PAGE', () => {
  it ('set random ate for From input field',  async ({page}) => {
    const datePicker = new DatePicker(page)
    await datePicker.open()
    // page.goto ('https://www.lambdatest.com/selenium-playground/jquery-date-picker-demo')
    await datePicker.verifyHeader()
    await datePicker.dateFromToday()
  })
})

