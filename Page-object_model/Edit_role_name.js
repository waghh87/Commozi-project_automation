const{expect} = require('@playwright/test');
exports.edit_role = class edit_role{
    constructor(page){
        this.page = page;
        this.search_box = page.getByPlaceholder("Search by name");
        this.edit_rol = page.getByPlaceholder("Enter Role Name");
        this.update_success_toast = page.locator('.Toastify__toast--success');
        this.save_btn = page.getByRole('button',{name: 'Save'});

        this.search_enter = page.getByPlaceholder("Search by name");
 
    }

    async edit_role_name(rol,rol_edit){
        this.rol_edit = rol_edit;
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
         //search button details
        await this.search_box.type(rol);
        
        await expect(this.page.getByRole('row',{name: rol})).toBeVisible();

        //Edit Button - Click
        const rol1 = await this.page.getByRole('row',{name: rol});
        await expect(rol1).toBeVisible();
        await rol1.locator(".edit").click();

        await this.edit_rol.click({clickCount: 3});
        await this.edit_rol.press('Backspace');
        await this.edit_rol.type(this.rol_edit);
        await this.save_btn.click();

        const update_alert_success = await this.update_success_toast.textContent();
        console.log(update_alert_success);
        expect(update_alert_success).toBe("Role updated successfully");    

    }
    async search_update_name(){
        await this.search_enter.type(this.rol_edit);
    }
    async Verify_update_name(){
        await expect(this.page.getByRole('row',{name: this.rol_edit})).toBeVisible();
    }
    async clear_searchbox(){
        await this.search_enter.clear();
    }

}