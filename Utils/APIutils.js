const {expect} = require('@playwright/test'); 

class APIutils {
    // Le informazioni di log in vanno sempre passate prima di qualsiasi chiamata API
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    // Login API
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        });
        expect((loginResponse).ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token; 
        return token;
    } 
    
    // Create order API
    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToken();

        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayload,
            headers: {
                        'Authorization' : response.token,
                        'Content-Type' : 'application/json'
            },
        });
        const orderResponseJson = await createOrderResponse.json(); 
        response.orderId = orderResponseJson.orders[0];

        return response;
    }

}

module.exports = {APIutils};
