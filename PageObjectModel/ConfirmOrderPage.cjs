const { expect } = require('@playwright/test');
class ConfirmOrderPage {

    constructor(page) {
        this.page = page;
        this.thanks4order = page.getByText(" Thankyou for the order. ");
        this.orderIds = page.locator('.em-spacer-1 .ng-star-inserted');
        this.orderHistoryBtn = page.getByText(" Orders History Page ");
        this.csvDwlBtn = page.getByText("Click To Download Order Details in CSV");
        this.exlDwlBtn = page.getByText("Click To Download Order Details in Excel");
    }

    async getOrderIds() {
        await this.orderIds.waitFor();
        const count = await this.orderIds.count();
        const orderIdsArray = [];

        for (let i = 0; i < count; i++) {
            let orderId = await this.orderIds.nth(i).textContent();
            orderId = orderId.replace(/[| ]/g, '').trim();  // Rimuove sia i delimitatori '|' che eventuali spazi
            orderIdsArray.push(orderId);
        }

        return orderIdsArray;
    }

    /* async checkOrderIds(orderIds) {
        const count = await this.orderIds.count();
        for(let i = 0; i < count; i++) {
            let orderText = await this.orderIds.nth(i).textContent();
            orderText = orderText.replace(/[| ]/g, '').trim();  // Rimuove sia i delimitatori '|', che eventuali spazi
            expect(orderIds).toContain(orderText);  
        }
    } */

    async checkItemsId(itemsId) {    
        const count = await this.orderIds.count();
        for (let i = 0; i < count; i++) {
            let orderText = await this.orderIds.nth(i).textContent();
            orderText = orderText.replace(/[| ]/g, '').trim(); // Rimuove delimitatori e spazi
            console.log(orderText);
            console.log(itemsId);
    
            if (itemsId === orderText) {
                console.log("ID corrispondente");
                return true;  
            } else {
                console.log("ID non corrispondente");
            }
        }
        return false; 
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
