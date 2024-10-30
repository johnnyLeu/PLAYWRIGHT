const { expect, selectors } = require("@playwright/test");

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.creditCardBox = page.locator('.text-validated').first();
        this.nameOnCardBox = page.locator('[type ="text"]').nth(2);
        this.cardMonth = page.locator('.ddl').first();
        this.cardYear = page.locator('.ddl').last();
        this.ccvBox = page.locator('.field.small input').first();
        this.couponBox = page.locator('[name="coupon"]');
        this.couponBtn = page.getByRole('button', {name: "Apply Coupon"});
        this.emailBox = page.locator('.mt-5 input[type="text"]');
        this.emailToCheck = page.locator('.mt-5 label[type="text"]');
        this.countryBox = page.getByPlaceholder("Select Country");
        this.placeOrderBtn = page.getByText("PLACE ORDER ");
    } 
    
    async checkEmail(email) {    
        await expect(this.emailToCheck).toHaveText(email)
    }

    async selectCountry(country) {
        await this.countryBox.pressSequentially(country);
        await this.page.getByRole("button", {name: country}).click();
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }

    async insertDataPayment(creditCard, cardMonth, cardYear, ccv, nameOnCard) {
        await this.creditCardBox.fill("");
        await this.creditCardBox.fill(creditCard); 
        await this.cardMonth.selectOption(cardMonth);
        await this.cardYear.selectOption(cardYear);
        await this.ccvBox.fill(ccv);
        await this.nameOnCardBox.fill(nameOnCard); 
    } 


}

module.exports = {CheckoutPage};
