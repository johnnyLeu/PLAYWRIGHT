const {test, expect} = require('@playwright/test');  
const {LoginPage} = require('../PageObjectModel/LoginPage');
const {DashboardPage} = require('../PageObjectModel/DashboardPage');
const {CartPage} = require('../PageObjectModel/CartPage');
const {Navbar} = require('../PageObjectModel/Navbar');
const {CheckoutPage} = require('../PageObjectModel/CheckoutPage');
const {ConfirmOrderPage} = require('../PageObjectModel/ConfirmOrderPage');

test.only('Raulshetty Client App Buy Products Playwright Test', async ({page}) => { 
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const navbar = new Navbar(page);
    const checkoutPage = new CheckoutPage(page);
    const confirmOrderPage = new ConfirmOrderPage(page);

    const email = "flameman19@gmail.com"; 
    const passsword = "Iamking@000";
    const zaraProduct = "ZARA COAT 3";
    const adidasProduct = "ADIDAS ORIGINAL";
    const creditCard = "1234 5678 9000 1908"; 
    const cardMonth = "08";
    const cardYear = "19";
    const ccv = "000";
    const nameOnCard = "Giovanni Di Pietrantonio";
    const country = "Italy";  

    await loginPage.goToLoginPage();
    await loginPage.loginProcess(email, passsword);

    await dashboardPage.searchAddProduct(adidasProduct);
    await navbar.clickCartBtn();

    await cartPage.checkProduct(zaraProduct);
    await cartPage.goToCheckout();

    await checkoutPage.insertDataPayment(creditCard, cardMonth, cardYear, ccv, nameOnCard);
    await checkoutPage.checkEmail(email);
    await checkoutPage.selectCountry(country);

    await checkoutPage.placeOrder();

    const ordersId = cartPage.itemsId;
    await confirmOrderPage.checkOrdersId(ordersId);
    await confirmOrderPage.checkThanks();

    
    
    await page.pause();
});
    


 
 

 
