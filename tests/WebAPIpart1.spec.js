// REQUEST --> usato per WEB API TESTING
const {test, expect, request} = require('@playwright/test'); 
const {APIutils} = require('../Utils/APIutils');

const loginPayload = {userEmail: "flameman19@gmail.com", userPassword: "Iamking@000"};
const orderPayload = {orders: [{country: "Italy", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};

let response;

// Esegue il blocco di codice prima di tutti i test, UNA volta sola, poi li esegue tutti in sequenza
// Dentro ".newContext()" si possono passare tutte le extra info che si hanno tipo headers ecc...
// Per fare DEBUG anche di questa parte, bisogna aggiungere in "package.json" nello "script" --> "test": "comando del test da debuggare"
test.beforeAll( async ()=> {
    const apiContext = await request.newContext(); 
    const apiUtils = new APIutils(apiContext, loginPayload);  
    response = await apiUtils.createOrder(orderPayload);
});   

/* Esegue il blocco di codice prima di ogni test
test.beforeEach( async () => {

}); 
*/

// Create order is success
test('Raulshetty Client App Place Order Playwright Test', async ({page}) => { 
    // Per inserire codice JS ed inserire un valore nella memoria locale
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.getByRole("button", {name: " ORDERS"}).click();

    await page.locator('.table').waitFor(); 
    const rows = page.locator("tbody tr");
    
    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if(response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }    
    }         
    const orderDetails = await page.locator(".col-text").textContent();
    expect(await response.orderId.includes(orderDetails)).toBeTruthy();

});