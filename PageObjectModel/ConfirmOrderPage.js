const { expect } = require("playwright/test");

class ConfirmOrderPage {

    constructor(page) {
        this.page = page;
        this.thanks4order = page.getByText(" Thankyou for the order. ");
        this.ordersId = page.locator('.em-spacer-1 .ng-star-inserted');
        this.orderHistoryBtn = page.getByText(" Orders History Page ");
        this.csvDwlBtn = page.getByText("Click To Download Order Details in CSV");
        this.exlDwlBtn = page.getByText("Click To Download Order Details in Excel");
    }

    async checkOrdersId(ordersId) {
        const count = await this.ordersId.count();
        for(let i = 0; i < count; i++) {
            const orderText = await this.ordersId.nth(i).textContent(); 
            expect(orderText).toContain(ordersId[i]); 
        }
    }

    async checkThanks() {
        await expect(this.thanks4order).toBeVisible();
    }

    async clickOrderHistoryBtn() {
        await this.orderHistoryBtn.click();
    }

    async clickCsvDwlBtn() {
        await this.csvDwlBtn.toBeVisible();
    }

    async clickExlDwlBtn() {
        await this.exlDwlBtn.click();
    }

}

module.exports = {ConfirmOrderPage};
