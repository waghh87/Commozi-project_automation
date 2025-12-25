const { expect } = require("@playwright/test");

exports.members_cls = class members_cls {
    constructor(page) {
        this.page = page;
        this.crm_drop = page.getByRole('button', { name: 'CRM' });
        this.members_btn = page.locator("//a[normalize-space()='Members']");

        //Search member locator
        this.search_by_name = page.getByPlaceholder('Search Name, Handle or Email');
        this.search_by_email = page.getByPlaceholder('Search Name, Handle or Email');
        this.search_by_handle = page.getByPlaceholder('Search Name, Handle or Email');

        this.clear_btn = page.locator(".clear-icon");

        //Filter functionality
        this.com_drop_btn = page.locator('svg');
        this.community_btn = page.getByText('Mr Addie POD Academy');

        this.filter_btn = page.getByRole('button', { name: 'Filters' });

        //Subscription Interval filter
        this.subs_interval_drop_down_btn = page.getByText('Select Subscription Interval');
        this.monthly_option_drop_down = page.getByRole('option', { name: 'Monthly' });
        this.click_filter_dialog_side = page.locator('.MuiStack-root.css-1kb08vh > div:nth-child(2) > .select-ui > .select__control > .select__indicators > .select__indicator > .css-8mmkcg');

        //Subscription Price
        this.subscription_price_opt1 = page.getByRole('option', { name: '$39' });
        this.subscription_price_opt2 = page.getByRole('option', { name: '$49' });

        //Subscription Status filter
        this.subscription_status_drop_down = page.getByText('Select Subscription Status');
        this.sub_status_option = page.getByRole('option', { name: 'Active' });

        //Commozi Role Filter
        this.commozi_Role_drop_down_btn = page.getByText('Select Commozi Role');
        this.role_option = page.getByRole('option', { name: 'Member', exact: true });

        //Apply and Reset button
        this.apply_btn = page.getByRole('button', { name: 'Apply' });
    }

    async members() {
        await this.crm_drop.click();
        await this.members_btn.click();

        await this.page.waitForSelector('.loader', { state: 'hidden' });
        const title = await this.page.locator("(//p[@class='MuiTypography-root MuiTypography-body1 css-fyswvn'])").textContent();
        expect(title).toBe("Members");
    }

    async search_member() {
        // Search By Name 
        await this.search_by_name.fill("Daisy");

        const name = await this.page.locator('div.sc-eqNDNG.lnqPEg.rdt_TableBody p').filter({ hasText: 'Daisy Bhavsar' }).textContent();
        expect(name).toMatch("Daisy Bhavsar");

        //click the clear button which show on hover action
        await this.page.waitForSelector('.loader', { state: 'hidden' });

        await this.search_by_name.hover();
        await this.clear_btn.waitFor({ state: 'visible' });
        await this.clear_btn.click();

        // await this.search_by_email.clear();

        //Search by email
        await this.page.waitForSelector('.loader', { state: 'hidden' });
        await this.search_by_email.fill("daisybhavsar185@gmail.com");

        const email = await this.page.locator('div.sc-eqNDNG.lnqPEg.rdt_TableBody p').filter({ hasText: 'daisybhavsar185@gmail.com' }).textContent();
        expect(email).toMatch("daisybhavsar185@gmail.com");

        //click the clear button which show on hover action        
        await this.page.waitForTimeout(3000);
        await this.search_by_email.hover();
        await this.clear_btn.waitFor({ state: 'visible' });
        await this.clear_btn.click();

        await this.page.waitForTimeout(3000);

        //Search By Handle URL
        await this.search_by_handle.type("daisy-bhavsar-bhavsar-8911");

        const handle = await this.page.locator('div.sc-eqNDNG.lnqPEg.rdt_TableBody div a').filter({ hasText: 'daisy-bhavsar-bhavsar-8911' }).textContent();
        expect(handle).toMatch("daisy-bhavsar-bhavsar-8911");

        //click the clear button which show on hover action
        await this.page.waitForTimeout(3000);
        await this.search_by_handle.hover();
        await this.clear_btn.waitFor({ state: 'visible' });
        await this.clear_btn.click();
    }

    async check_member_count() {
        //click the clear button which show on hover action
        await this.page.waitForSelector('.loader', { state: 'hidden' });
        // await this.page.waitForTimeout(3000);

        const All_count = await this.page.locator('div .css-r42wmg span').nth(0).textContent();
        console.log(All_count);

    }

    async check_table_record() {

        // await this.page.waitForSelector('.loader', { state: 'hidden' });
        // await this.page.waitForTimeout(3000);
        const number_of_records = await this.page.locator('div .select__single-value.select__single-value.css-1dimb5e-singleValue').nth(1).textContent();
        console.log(number_of_records);


        //get the second last page value pagination
        const pagination_button = this.page.locator("//ul[@class = 'MuiPagination-ul css-532ebf']//li");
        const btn_count = await pagination_button.count();
        console.log(btn_count);

        const last_page = await pagination_button.nth(btn_count - 2).textContent();
        console.log(last_page);
        // console.log(last_page.textContent())
        const convert_records = Number(number_of_records?.trim());
        const convert_last = Number(last_page?.trim());

        const second_last_page = convert_last - 1;

        const pages_total = convert_records * second_last_page;
        console.log(pages_total);

        //click on the last button.
        const click_lastbutton = await pagination_button.nth(btn_count - 2).last();
        await click_lastbutton.click();
    }

    async filter_functionality() {
        // await this.page.waitForSelector('.loader', { state: 'hidden' });
        await this.com_drop_btn.first().click();
        await this.community_btn.click();
        await this.filter_btn.click();

        await this.subs_interval_drop_down_btn.click();
        await this.monthly_option_drop_down.click();
        await this.click_filter_dialog_side.click();
        await this.subscription_price_opt1.click();
        await this.subscription_price_opt2.click();

        await this.click_filter_dialog_side.click();
        // await this.page.getByText('Member Status', { exact: true }).click();

        await this.subscription_status_drop_down.click();
        await this.sub_status_option.click();

        await this.commozi_Role_drop_down_btn.click();
        await this.role_option.click();

        await this.apply_btn.click();
    }

    async verify_user_records_with_pagination() {
        let pagenumber = 1;

        while (true) {
            console.log(`\n processing page ${pagenumber}`);

            //wait for current page table to load
            await this.page.locator('.rdt_TableBody').waitFor({ state: 'visible' });

            // Print current page rows (row-wise as requested)
            const rows = this.page.locator('.rdt_TableBody [role="row"]:not(.rdt_TableRow--select-all-rows)');
            const rowCount = await rows.count();
            console.log(`total rows:, ${rowCount} rows on page ${pagenumber}`);

            for (let i = 0; i < rowCount; i++) {
                const filter_records = await rows.nth(i).textContent();
                console.log(`Row ${i + 1}/${rowCount}:`);
                console.log(filter_records?.trim());
                console.log('─'.repeat(150));
            }

            // Find Next button
            const next_button = await this.page.locator("//button[@aria-label= 'Go to next page']");

            //  Check if next button exists and is enabled
            if (await next_button.count() === 0 || await next_button.isDisabled()) {
                console.log("Next button is disabled");
                break;
            }

            console.log('clicking Next button');
            await next_button.click();
            await this.page.waitForLoadState('domcontentloaded');
            await this.page.waitForTimeout(2000);

            pagenumber++;
        }

        console.log(`\n pagination completed! ${pagenumber} pages`);
    }

}
