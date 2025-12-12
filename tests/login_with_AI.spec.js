const{ test, expect } = require('@playwright/test');

test('Google Login popup handling', async ({browser}) => {
 // const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://staging-crm.commozi.com/sign-in');
  
  // Click on 'Continue with Google'
  const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page.click('text=Continue with Google'),
  ]);

  // Wait for the popup to load Google login page
  await popup.waitForLoadState();

  // Fill email
  await popup.fill('input[type="email"]', 'dev@commozi.com');
  await popup.click('#identifierNext');

  /*
  // Wait for password input to appear
  await popup.waitForSelector('input[type="password"]', { timeout: 10000 });
  await popup.fill('input[type="password"]', 'yourpassword');
  await popup.click('#passwordNext');
*/
  // Wait until redirected back to your app
  await popup.waitForLoadState('networkidle');

 // await browser.close();

 await page.getByLabel('Members').getByRole('checkbox',{name: 'Assign Role'});
});
