const { When, Then, Given } = require('@cucumber/cucumber');
const POManager = require('../../PageObjectModel/POManager.cjs');
const { chromium } = require('@playwright/test');

// Write code here that turns the phrase belowe into concrete actions
Given('A login to E-commerce application with {string} and {string}', async function (email, passsword) {
    const browser = await chromium.launch({headless:false});
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

Then('Verify {string} is displayed in the Cart', {timeout: 100*1000}, async function (productName) {
    const navbar = this.poManager.getNavbar();
    const cartPage = this.poManager.getCartPage(); 
    await navbar.clickCartBtn();
    await cartPage.checkProduct(productName);
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
    this.confirmOrderPage = this.poManager.getConfirmOrderPage(); 
    const ordersId = await this.confirmOrderPage.getOrderIds();  
    await this.confirmOrderPage.checkOrderIds(ordersId);
    await this.confirmOrderPage.checkThanks();   
});

When('Go to Order History Page', async function () { 
    const navbar = this.poManager.getNavbar();
    await navbar.clickOrdersBtn();
});
 
Then('Verify that the order is in History', {timeout: 100*1000}, async function () {
    const ordersPage = this.poManager.getOrdersPage();
    const ordersId = await this.confirmOrderPage.getOrderIds();  
    const isOrderInHistory = await ordersPage.clickOnOrderById(ordersId);
    
    // Controllo se isOrderInHistory è vero
    if (!isOrderInHistory) {
        throw new Error(`Order ID ${ordersId} not found in order history.`);
    } 
});

