class OrdersPage {

    constructor(page) {
        this.page = page;
        this.goShopBtn = page.getByText("Go Back to Shop");
        this.goCartBtn = page.locator("Go Back to Cart");
        this.orderProductsHistory = page.locator('.ng-star-inserted tbody');
    }

    async checkLastOrder() {
        
    }

    async clickGoShopBtn() {
        await this.goShopBtn.click();
    }

    async clickGoCartBtn() {
        await this.goCartBtn.click();
    }

}