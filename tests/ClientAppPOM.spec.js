const {test, expect} = require('@playwright/test');  
const {POManager} = require('../PageObjectModel/POManager');
// Otteniamo i dati da un file esterno e lo convertiamo da file JSON ad oggetto JS 
// JS OBJECT <- STRING <- JSON
const dataOrder = JSON.parse(JSON.stringify(require("../Utils/PlaceOrderTestData.json")));
const dataPayment = JSON.parse(JSON.stringify(require("../Utils/PaymentsData.json")));

test.only('Raulshetty Client App Buy Products Playwright Test', async ({page}) => { 
    const poManager = new POManager(page);
    const cartPage = poManager.getCartPage();
    const loginPage = poManager.getLoginPage(); 
    const dashboardPage = poManager.getDashboardPage(); 
    const navbar = poManager.getNavbar(); 
    const checkoutPage = poManager.getCheckoutPage(); 
    const confirmOrderPage = poManager.getConfirmOrderPage(); 
    const ordersPage = poManager.getOrdersPage();

    await loginPage.goToLoginPage();
    await loginPage.loginProcess(dataOrder.email, dataOrder.passsword);

    await dashboardPage.searchAddProduct(dataOrder.zaraProduct);
    await navbar.clickCartBtn();

    await cartPage.checkProduct(dataOrder.zaraProduct);
    await cartPage.goToCheckout();

    await checkoutPage.insertDataPayment(dataPayment.creditCard, dataPayment.cardMonth, dataPayment.cardYear, dataPayment.ccv, dataPayment.nameOnCard);
    await checkoutPage.checkEmail(dataOrder.email);
    await checkoutPage.selectCountry(dataOrder.country);

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
    


 
 

 
