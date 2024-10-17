class Navbar {

    constructor(page) {
        this.page = page;
        this.cartBtn = page.locator("li").filter({ hasText: "  Cart " });
        this.signOutBtn = page.getByRole('button', {name: " Sign Out "});
        this.ordersBtn = page.locator("button[routerlink*='myorders']"); 
        this.homeBtn = page.getByRole('button', {name: " HOME "});
    }

    async clickCartBtn() {
        await this.cartBtn.click();
    }
    
    async clickSignOutBtn() {
        await this.signOutBtn.click();
    }

    async clickOrdersBtn() {
        await this.ordersBtn.click();
    }

    async clickHomeBtn() {
        await this.homeBtn.click();
    }

}

module.exports = { Navbar };


