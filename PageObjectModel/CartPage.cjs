class CartPage {

    constructor(page) {
        this.page = page;  
        this.checkoutBtn = page.getByRole('button', {name: "Checkout"});
        this.cartProducts = page.locator('.cart ul h3');
        this.itemsId = page.locator('.itemNumber');
    } 

    async getItemsId() {
        await this.itemsId.waitFor();
        const count = await this.itemsId.count();
        const itemsIdArray = [];

        for (let i = 0; i < count; i++) {
            let itemId = await this.itemsId.nth(i).textContent();
            itemId = itemId.replace(/#/g, ''); // Rimuove il cancelletto '#'
            itemId = itemId.replace(/[| ]/g, '').trim();  // Rimuove sia i delimitatori '|' che eventuali spazi
            itemsIdArray.push(itemId);
        }

        return itemsIdArray;
    } 

    async checkProduct(productName) {
        await this.cartProducts.waitFor();   
        const cartProductsFilter = await this.cartProducts.filter(product => product.includes(productName)).allTextContents();
        const cartProducts = await this.cartProducts.allTextContents();
        console.log('Cart Products:', cartProducts); 
        
       if (cartProductsFilter.includes(productName)) {
            console.log(`${productName} is in the cart.`);
            return true;
        } else {
            console.log(`The selected product "${productName}" is not in the cart.`);
            return false;
        }
    }

    async goToCheckout() {
        await this.checkoutBtn.click();
    }
}

module.exports = CartPage;
