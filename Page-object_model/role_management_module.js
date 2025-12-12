const{expect} = require('@playwright/test');
exports.role = class role{
    constructor(page)
    {
        this. page = page;
        this.crm_drop = page.getByRole('button', { name: 'CRM' });
        this.roles_btn = page.locator("//a[normalize-space()='Roles']");
        this.txt = page.locator("//p[@class='MuiTypography-root MuiTypography-body1 css-fyswvn']");
    }

    async role_list_page()
    {   
        await this.crm_drop.click();
        await this.roles_btn.click();
     
    }

    async Verify_role_URL(){

        await expect(this.page).toHaveURL("https://staging-crm.commozi.com/roles");
        await expect(this.txt).toHaveText("Roles",{timeout: 10000});
    }


}