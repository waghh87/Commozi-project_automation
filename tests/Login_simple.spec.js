const { test, expect } = require('@playwright/test');

let crd;
test.describe('',()=> {
test('Login Test Case', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://staging-crm.commozi.com/sign-in");

    //click on the Google button
    const [popup] = await Promise.all([
        context.waitForEvent('page'),
        page.getByRole('button', { name: 'Continue with Google' }).click(),
    ]);

    // Wait for the popup to load Google login page
    await popup.waitForLoadState();

    //Fill Email on google popup
    await popup.locator("input[type='email']").fill("dev@commozi.com");
    await popup.getByRole('button', { name: 'Next' }).click();
    
    //fill password on google popup
    await popup.locator("input[type='password']").fill("G6qYAj_uYZmtfeEq6BnK");
    await popup.getByRole('button', { name: 'Next' }).click();
    await page.pause();
    
    await popup.waitForLoadState('networkidle');

    await page.waitForLoadState('networkidle');
    //expect the page to have commozi url after login
    await expect(page).toHaveURL("https://staging-crm.commozi.com/dashboard");
    await expect(page.getByRole('button',{name: 'Dashboard',exact:true})).toContainText('Dashboard');
    
    //click on the CRM Menu
    await page.getByRole('button', { name: 'CRM' }).click();

    //click on the Role Management option
    await page.locator("//a[normalize-space()='Roles']").click();

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL("https://staging-crm.commozi.com/roles");

    await expect(page.locator("//p[@class='MuiTypography-root MuiTypography-body1 css-fyswvn']")).toHaveText("Roles");

    //click to add new role
    await page.getByRole('button', { name: 'Add Role' }).click();

    await page.waitForLoadState('networkidle');
    //await expect(page.locator("//h2[@id='mui-2-dialog-title']").textContent()).toHaveText("Add Role");

   await page.waitForTimeout(3000);

//    await page.waitFor('')
    //fill role details
    const rol = "Test Automation 13";
   const role_name = await page.getByPlaceholder("Enter Role Name");
   await role_name.type(rol);
 // await role_name.
   console.log(rol);
    
   await page.getByPlaceholder("Add Description").type("This is test role created by automation script");
    
    //selected the radio button
    await page.getByRole('radio',{name: 'Checked Active'}).click();

    //Selecting the Module permissions
    const dashboard = await page.locator("//div[@id='cell-2-dashboard']");
    await dashboard.getByRole('button', {name: 'Full'}).click();

    const roles = await page.locator("#cell-2-roles");
    await roles.getByRole('button',{name: 'Full'}).click();
    
    const members = await page.locator("#cell-2-members");
    await members.getByRole('button',{name: 'View'}).click();

    await page.getByRole('button',{name: 'Save'}).click();

    await page.waitForLoadState('networkidle');

    // await page.waitForSelector('tr');

    await page.getByPlaceholder("Search by name").type(rol);

    await expect(page.getByRole('row',{name: rol})).toBeVisible();

    const rol1 = await page.getByRole('row',{name: rol});
    await rol1.locator(".edit").click();

    const rol_edit = "harshad 1";

    await page.waitForTimeout(2000);
    await page.getByPlaceholder("Enter Role Name").clear();
    await page.getByPlaceholder("Enter Role Name").type(rol_edit);
    await page.getByRole('button',{name: 'Save'}).click();

    await page.waitForLoadState('networkidle');

    await page.getByPlaceholder("Search by name").type(rol_edit);

    await expect(page.getByRole('row',{name: rol_edit})).toBeVisible();

    const rol_delete = page.getByRole('row',{name: rol_edit});
    await rol_delete.locator('.delete').click();
    await page.getByRole('button', {name: 'Yes, Delete It'}).click();



   // await page.pause();




    // await context.storageState({ path: 'cred.json' });
    // crd = await browser.newContext({ storageState: 'cred.json' });
    //await page.pause();
   
});
/*

test('role management page', async () => {
    const page = await crd.newPage();
    await page.goto("https://staging-crm.commozi.com/dashboard");

    //click on the CRM Menu
    await page.getByRole('button', { name: 'CRM' }).click();

    await page.waitForLoadState('networkidle');

    //click on the Role Management option
    await page.getByRole('link',{name:'Roles'}).click();

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL("https://staging-crm.commozi.com/roles");

    await expect(page.getByRole('heading', { name: 'Roles' })).toBeVisible();

    await page.page();
});*/
});