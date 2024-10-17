const { test, expect, request } = require('@playwright/test');
const {APIutils} = require('./Utils/APIutils');
const loginPayload = {userEmail: "flameman19@gmail.com", userPassword: "Iamking@000"};
const orderPayload = {orders: [{country: "Italy", productOrderedId: "6581ca979fd99c85e8ee7faf"}]};
const fakePayLoadOrders = { data: [], message: "No Orders" };
 
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIutils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
})
 
// Qui andiamo ad effettuare una richiesta e modifichiamo la RISPOSTA PRIMA di inviarla al browser
test('@SP Place the order', async ({ page }) => {
// Aggiungi il token per l'accesso alla localStorage:    
  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      await route.fulfill({
          response,
          body,
        });
      // Intercepting response -APi response-> { playwright fakeresponse } ->browser->render data on front end
    });
   
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
 
});
 