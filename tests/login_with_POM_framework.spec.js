const { test, expect } = require('@playwright/test');
const { Login } = require('../Page-object_model/login');
const { Das } = require('../Page-object_model/verify_dashboard');
const { role } = require('../Page-object_model/role_management_module');
const { add_new_role } = require('../Page-object_model/Add_new_role');
const { edit_role } = require('../Page-object_model/Edit_role_name');
const { Delete_role } = require('../Page-object_model/delete_role');

let crd;
test.describe('', () => {
    test('Login Test Case', async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();

        const login_ob = new Login(page);

        await login_ob.goTO();

        await login_ob.login_feature();

        //expect the page to have commozi url after login
        const dash = new Das(page);
        await dash.assert_URL();

        
        const role_ob = new role(page);

        //click on the CRM Menu
        //click on the Role Management option
        await role_ob.role_list_page();

        //Assert the Page URL and Text
        await role_ob.Verify_role_URL();

        //click to add new role
        const add_roles = new add_new_role(page);

       await add_roles.new_role('test_aut_23', 'only_use for testing purpose');

        //Edit role name
        const edit_roles = new edit_role(page);
        // here. rol variable use in the another file variable
        
        await edit_roles.edit_role_name(add_roles.rol,'harshad 7');
        await edit_roles.search_update_name();
        await edit_roles.Verify_update_name();
       await edit_roles.clear_searchbox();

        //Delete the role
        const delete_role_ob = new Delete_role(page);
        await delete_role_ob.deleted_roel(edit_roles.rol_edit);
        await delete_role_ob.search_after_delete(edit_roles.rol_edit);
        

      

        /*
               
             const rol_edit = "harshad 1";

           
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
              */
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



