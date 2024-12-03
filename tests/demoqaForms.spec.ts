import {test as it} from "@playwright/test"


it.describe('FORM PAGE',()=>{
  // it.beforeAll(()=>{
  //   console.log('before all');
  // })
  // it.afterAll(()=>{
  //   console.log('after all');
  // })
  // it.beforeEach(()=>{
  //   console.log('before each');
  // })
  // it.afterEach(()=>{
  //   console.log('after each');
  // })
  it ('Fill all forms for form page DemoQa', async ({page}) => {
    await page.goto ('https://demoqa.com/automation-practice-form#google_vignette')
    // await page.pause ()
    await page.locator('#firstName').fill('Irina')
    await page.locator('#lastName').fill('DemoQa')
    await page.locator('#userEmail').fill('DemoQa@mailinator.com')
    await page.click('label[for="gender-radio-1"]');
    // await page.locator('input[type="date"]').fill('2000-12-12')
    await page.click('#dateOfBirthInput');
    // Select a year from the dropdown
    await page.selectOption('.react-datepicker__year-select', { label: '2000' });
    // Select a month from the dropdown
    await page.selectOption('.react-datepicker__month-select', { label: 'March' });
    // Click on the specific day
    await page.click('.react-datepicker__day--010');
    await page.locator('#subjectsInput').fill('Mathematics')
    await page.locator('label[for="hobbies-checkbox-1"]').click()
    await page.locator('[placeholder="Current Address"]').pressSequentially('12123 Mount Ave', {delay:500})
    await page.click('#state .css-yk16xz-control'); // Click on the dropdown container
    // Select the "NCR" option
    // await page.locator('div.css-1uccc91-singleValue:has-text("NCR")').click();
    // Adjust to the input or button element that triggers the dropdown

    // Wait for the dropdown option to appear and select "NCR"
    await page.locator('#react-select-3-option-1').click(); // Directly click the option with id "react-select-3-option-0"
    await page.locator('#city .css-yk16xz-control').click(); // Click to open the dropdown
    // Select "Gurgaon" from the dropdown
    await page.locator('#react-select-4-option-2').click();
    await page.pause ()

    // id="submit"

    // await page.locator('[placeholder="Password"]').pressSequentially('password123', {delay:500})
    // await page.locator('[for="companyname"] ~ [placeholder="Company"]').fill('Happy LLC')
    // await page.selectOption('[name="country"]', {label: 'United States'})
    // await page.getByPlaceholder('Address 1').fill ('701 Tobie ct')
    // await page.locator('label:has-text("City*") ~ input#inputCity').fill('New York')
    // await page.getByRole('textbox', {name: 'Zip Code'}).fill('10001')
    // await page.pause ()
  })
})
