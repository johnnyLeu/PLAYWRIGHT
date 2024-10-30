const { When, Then, Given } = require('@cucumber/cucumber');
const POManager = require('../../PageObjectModel/POManager.cjs');
const { chromium } = require('@playwright/test');

// Write code here that turns the phrase belowe into concrete actions
Given('A login to E-commerce application with {string} and {string}', async function (email, passsword) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    this.poManager = new POManager(page);
    const loginPage = this.poManager.getLoginPage(); 

    await loginPage.goToLoginPage();
    await loginPage.loginProcess(email, passsword);
}); 
  
When('Add {string} to Cart', async function (productName) {
    const dashboardPage = this.poManager.getDashboardPage(); 
    await dashboardPage.searchAddProduct(productName);
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    const navbar = this.poManager.getNavbar();
    const cartPage = this.poManager.getCartPage(); 
    await navbar.clickCartBtn();
    await cartPage.checkProduct(productName);
    this.itemsId = await cartPage.getItemsId(); 
    await cartPage.goToCheckout();
}); 

When('Enter valid data payments with email {string}, country {string}, credit card {string}, card month {string}, card year {string}, ccv {string}, and name on card {string} and Place the Order'
    , async function (email, country, creditCard, cardMonth, cardYear, ccv, nameOnCard) {
    const checkoutPage = this.poManager.getCheckoutPage(); 
    await checkoutPage.insertDataPayment(creditCard, cardMonth, cardYear, ccv, nameOnCard);
    await checkoutPage.checkEmail(email);
    await checkoutPage.selectCountry(country);
    await checkoutPage.placeOrder();
});

Then('Verify that the info in the confirmation order page are correct', async function () {
    const confirmOrderPage = this.poManager.getConfirmOrderPage(); 
    this.ordersId = await confirmOrderPage.getOrderIds();
    console.log("Order IDs from Confirm Order Page: ", this.ordersId); 
    await confirmOrderPage.checkItemsId(this.itemsId);   
    await confirmOrderPage.checkThanks();   
});

When('Go to Order History Page', async function () { 
    const navbar = this.poManager.getNavbar();
    await navbar.clickOrdersBtn();
});
 
Then('Verify that the order is in History', {timeout: 100*1000}, async function () {
    const ordersPage = this.poManager.getOrdersPage(); 
    
    /// Itera su ogni ID per verificarne la presenza nella cronologia
    for (const orderId of this.ordersId) {
        const isOrderInHistory = await ordersPage.clickOnOrderById(this.ordersId);
        
        // Controllo se isOrderInHistory è vero
        if (!isOrderInHistory) {
            throw new Error(`Order ID ${orderId} not found in order history.`);
        } 
    }
});

