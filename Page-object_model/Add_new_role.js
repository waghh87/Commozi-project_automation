const { expect } = require('@playwright/test');
exports.add_new_role = class add_new_role {
    constructor(page) {
        this.page = page;
        this.add_btn = page.getByRole('button', { name: 'Add Role' });
        this.txt = page.locator("//h6[normalize-space()='Role Info']");
        this.add_role = page.getByPlaceholder("Enter Role Name");
        this.add_desc = page.getByPlaceholder("Add Description");
        this.role_radio = page.getByRole('radio', { name: 'Checked Active' });

        this.dash_per = page.locator("//div[@id='cell-2-dashboard']//div[@class='MuiStack-root css-razd9h']");
       // this.dash_per_btn = this.dash_per.getByRole("label",{name: "View"});

        this.roles_per = page.locator("//div[@id='row-roles']//div[@class='MuiStack-root css-razd9h']//label[1]");
        this.roles_per_create = page.locator("//div[@id='row-roles']//div[@class='MuiStack-root css-razd9h']//label[2]");
        // this.roles_per_btn = this.roles_per.getByRole('button', { name: 'Full' });

        // this.member_select_All = page.locator("//body/div[@id='root']/div[@class='main-content MuiBox-root css-0']/div[@class='body-content MuiBox-root css-0']/div[@class='MuiContainer-root MuiContainer-maxWidthLg css-1cg8y6n']/form/div[@class='MuiStack-root add-role-wrapper css-1v8my8o']/div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-12vtj1p']/div[@class='sc-fVHBlr ecMQWb table-ui start-header add-role-table-ui']/div[@class='sc-ipUnzB cTGbf']/div[@role='table']/div[@role='rowgroup']/div[@id='row-members']/div[@id='cell-2-members']/div[@class='MuiBox-root css-0']/div[@class='MuiStack-root css-pb4y8c']/label[1]")
        this.members_per_view = page.locator("//div[@id='cell-2-members']//div[@class='MuiStack-root css-razd9h']//label[1]");
        //  this.members_per_btn = this.members_per_cell.getByRole('button', { name: 'View' });

        this.tag_select_All = page.locator("//body/div[@id='root']/div[@class='main-content MuiBox-root css-0']/div[@class='body-content MuiBox-root css-0']/div[@class='MuiContainer-root MuiContainer-maxWidthLg css-1cg8y6n']/form/div[@class='MuiStack-root add-role-wrapper css-1v8my8o']/div[@class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 css-12vtj1p']/div[@class='sc-fVHBlr ecMQWb table-ui start-header add-role-table-ui']/div[@class='sc-ipUnzB cTGbf']/div[@role='table']/div[@role='rowgroup']/div[@id='row-tags']/div[@id='cell-2-tags']/div[@class='MuiBox-root css-0']/div[@class='MuiStack-root css-pb4y8c']/label[1]");
        this.save_btn = page.getByRole('button',{name: 'Save'});

         this.success_toast = page.locator('.Toastify__toast--success');        
    }

    async new_role(rol, desc) {
        this.rol = rol;
        await this.add_btn.click();

        // Assert the Text Add Role    
        await expect(this.txt).toHaveText("Role Info");

        //compare to text
        const text = await this.txt.textContent();
        expect(text).toBe("Role Info");

        //Fill Roles details
        //Case: when the textbox value is hide after the enter then use the waitForLocaState('networkidle')
        await this.page.waitForTimeout(3000);
        await this.add_role.type(rol);
        // await this.page.waitForLoadState('networkidle');
        await this.add_desc.type(desc);

        //radio button
        await this.role_radio.click();

        //Selecting the Module Permissions
        await this.dash_per.click();
        await this.roles_per.click();
        await this.roles_per_create.click();
        // await this.member_select_All.click();
        await this.members_per_view.click();
        await this.tag_select_All.click();

        // click on the save button
        await this.save_btn.click();

        await this.page.waitForLoadState('networkidle');
        const alert_text = await this.success_toast.textContent();
        console.log(alert_text);
        expect(alert_text).toBe("Role created successfully");
        await this.page.pause();        
    }

}