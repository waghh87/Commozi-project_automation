const {expect} = require('@playwright/test');

exports.Delete_role = class Delete_role{
    constructor(page){
        this.page = page;
        this.search_updated_name = page.getByPlaceholder("Search by name");
        this.confirm_delete_btn = page.getByRole('button', {name: 'Yes, Delete It'});
        this.delete_alert = page.locator('.Toastify__toast--success');
        this.after_delete_check = page.locator("//div[@class='sc-gvqKNf ieDCKp']");
    }

    async deleted_roel(rol_edit)
    {   
        await this.page.waitForTimeout(2000);
        await this.search_updated_name.type(rol_edit);
        await expect(this.page.getByRole('row',{name: rol_edit})).toBeVisible();

        const delete_btn = this.page.getByRole('row',{name: rol_edit});
        await delete_btn.locator('.delete').click();

        this.confirm_delete_btn.click();

        const delete_alert_text = await this.delete_alert.textContent();
        console.log(delete_alert_text);
        expect(delete_alert_text).toBe("Role delete successfully");
    }

    async search_after_delete(rol_edit){
        await this.search_updated_name.clear();
        await this.search_updated_name.type(rol_edit);
        const check_text = await this.after_delete_check.textContent();
        console.log(check_text);
        expect(check_text).toBe("No roles found");

    }
}