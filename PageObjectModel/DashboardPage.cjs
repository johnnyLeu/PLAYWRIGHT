class DashboardPage {

    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.viewBtn = page.getByRole('button', {name: " View"});
        this.addToCartBtn = page.getByRole('button', {name: " Add To Cart"});
    } 

    async searchAddProduct(productName) { 
        const titles = await this.productsText.allTextContents();
        console.log(titles);    
        await this.products.filter({hasText: productName}).getByRole('button', {name: " Add To Cart"}).click();
    }

    async viewDetails() {
        await this.viewBtn.click();
    }

}

module.exports = {DashboardPage};
