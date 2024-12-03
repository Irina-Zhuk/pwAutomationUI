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
  it ('Fill all forms for form page', async ({page}) => {
   await page.goto ('https://www.lambdatest.com/selenium-playground/input-form-demo')
   // await page.pause ()
    await page.locator('#name').fill('Michael')
    await page.locator('[placeholder="Password"]').pressSequentially('password123', {delay:500})
    await page.locator('[for="companyname"] ~ [placeholder="Company"]').fill('Happy LLC')
    await page.selectOption('[name="country"]', {label: 'United States'})
    await page.getByPlaceholder('Address 1').fill ('701 Tobie ct')
    await page.locator('label:has-text("City*") ~ input#inputCity').fill('New York')
    await page.getByRole('textbox', {name: 'Zip Code'}).fill('10001')
    // await page.pause ()
  })
})
