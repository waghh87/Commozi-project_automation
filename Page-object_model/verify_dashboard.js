const { expect } = require("@playwright/test");

exports.Das = class Das {

    constructor(page) {
        this.page = page;
        this.txt = page.getByRole('button', { name: 'Dashboard', exact: true });

    }

    async assert_URL() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL("https://staging-crm.commozi.com/dashboard");
        await expect(this.txt).toContainText('Dashboard');
    }
}