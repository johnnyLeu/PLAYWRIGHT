class OrdersPage {

    constructor(page) {
        this.page = page;
        this.goShopBtn = page.getByText("Go Back to Shop");
        this.goCartBtn = page.locator("Go Back to Cart");
        this.orderProductsHistory = page.locator('.ng-star-inserted tbody tr');
    }

    async clickOnOrderById(orderIds) {
        await this.page.waitForSelector('.ng-star-inserted tbody tr');  
        const ordersCount = await this.orderProductsHistory.count();

        console.log("Order count in history:", ordersCount);   
    
        for (let i = 0; i < ordersCount; i++) {
            let toCheckOrderId = await this.orderProductsHistory.nth(i).locator('th').textContent();
            console.log(`Checking Order ID: ${toCheckOrderId.trim()}`);  
            toCheckOrderId = toCheckOrderId.trim();  // Pulisce eventuali spazi
        
            if (toCheckOrderId.includes(orderIds)) {
            await this.orderProductsHistory.nth(i).locator('.btn.btn-primary').click();
            return true;
        }
    }
        return false; 
    }    

    async clickGoShopBtn() {
        await this.goShopBtn.click();
    }

    async clickGoCartBtn() {
        await this.goCartBtn.click();
    }

}

module.exports = {OrdersPage};
