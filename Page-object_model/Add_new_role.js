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
        // this.roles_per_btn = this.roles_per.getByRole('button', { name: 'Full' });

        
        this.members_per_cell = page.locator("#cell-2-members");
        this.members_per_btn = this.members_per_cell.getByRole('button', { name: 'View' });

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
        await this.roles_per_btn.click();
        await this.members_per_btn.click();

        // click on the save button
        await this.save_btn.click();

        await this.page.waitForLoadState('networkidle');
        const alert_text = await this.success_toast.textContent();
        console.log(alert_text);
        expect(alert_text).toBe("Role created successfully");
        
    }

}