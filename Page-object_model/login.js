 const { request } = require("@playwright/test");
 const fs = require('fs');
const path = require("path");

 exports.Login = class Login {

    constructor(page) {
        this.page = page;
        this.context = page.context();
        this.request = this.context.request;
        // this.btn = page.getByRole('button', { name: 'Continue with Google' });
    }

    async goTO() {
        //await this.page.setViewportSize({width: 1536, height: 816});
        await this.page.goto("https://staging-crm.commozi.com/dashbaord");
    }

    async login_feature() {
        const [popup] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.btn.click(),
        ]);

        await popup.locator("input[type='email']").fill("dev@commozi.com");
        // await popup.locator("input[type='email']").fill("harshad.w@crestinfosystems.com");
        await popup.getByRole('button', { name: 'Next' }).click();
        await popup.locator("input[type='password']").fill("G6qYAj_uYZmtfeEq6BnK");
        // await popup.locator("input[type='password']").fill("Wagh@9996");
        await popup.getByRole('button', { name: 'Next' }).click();
    }
    
    async login_API(){
        const login_payload = await this.request.post("https://staging-api.commozi.com/crm/authentication/login",
        {
            data:
            {
                crm_login_email: "dev@commozi.com",
                crm_login_name: "Dev Commozi"
            },
            headers: 'content-type: application/json'
        })

    const login_response = await login_payload.json();
    const access_token = login_response.data.access_token;
    console.log(login_response.data.access_token);

    fs.writeFileSync('token.txt',access_token);

    }
    
    async cookies_add(){
        const read_access_token = fs.readFileSync('token.txt','utf-8');

        await this.context.addCookies([
            { name: 'access_token', value: read_access_token, domain: 'staging-crm.commozi.com', path: '/'}
        ]);
    }
}

