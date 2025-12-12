// const { expect } = require("@playwright/test");
exports.Login = class Login {

    constructor(page) {
        this.page = page;
        this.btn = page.getByRole('button', { name: 'Continue with Google' });
    }

    async goTO() {
        //await this.page.setViewportSize({width: 1536, height: 816});
        await this.page.goto("https://staging-crm.commozi.com/sign-in");
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
}

