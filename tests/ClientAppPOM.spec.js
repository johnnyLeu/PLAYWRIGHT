const {test, expect} = require('@playwright/test');  
const {POManager} = require('../PageObjectModel/POManager');
// Otteniamo i dati da un file esterno e lo convertiamo da file JSON ad oggetto JS 
// JS OBJECT <- STRING <- JSON
const dataOrder = JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));
const data = JSON.parse(JSON.stringify(require("../Utils/PaymentsData.json")));

for(const data of dataOrder) {

test(`Buy product (${data.productName}), Pom Manager Playwrigth Test `, async ({page}) => { 
    const poManager = new POManager(page);
    const cartPage = poManager.getCartPage();
    const loginPage = poManager.getLoginPage(); 
    const dashboardPage = poManager.getDashboardPage(); 
    const navbar = poManager.getNavbar(); 
    const checkoutPage = poManager.getCheckoutPage(); 
    const confirmOrderPage = poManager.getConfirmOrderPage(); 
    const ordersPage = poManager.getOrdersPage();

    await loginPage.goToLoginPage();
    await loginPage.loginProcess(data.email, data.passsword);

    await dashboardPage.searchAddProduct(data.productName);
    await navbar.clickCartBtn();

    await cartPage.checkProduct(data.productName);
    await cartPage.goToCheckout();

    await checkoutPage.insertdata(data.creditCard, data.cardMonth, data.cardYear, data.ccv, data.nameOnCard);
    await checkoutPage.checkEmail(data.email);
    await checkoutPage.selectCountry(data.country);

    await checkoutPage.placeOrder();

    const ordersId = await confirmOrderPage.getOrderIds();
    console.log("Order IDs from ConfirmOrderPage:", ordersId);  

    await confirmOrderPage.checkOrderIds(ordersId);
    await confirmOrderPage.checkThanks(); 
 
    await navbar.clickOrdersBtn();
    const isOrderInHistory = await ordersPage.clickOnOrderById(ordersId);
    
    expect(isOrderInHistory).toBe(true);   

    await page.pause();
});
    
}

 
 

 
