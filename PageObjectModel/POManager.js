const {LoginPage} = require('../PageObjectModel/LoginPage');
const {DashboardPage} = require('../PageObjectModel/DashboardPage');
const {CartPage} = require('../PageObjectModel/CartPage');
const {Navbar} = require('../PageObjectModel/Navbar');
const {CheckoutPage} = require('../PageObjectModel/CheckoutPage');
const {ConfirmOrderPage} = require('../PageObjectModel/ConfirmOrderPage');
const {OrdersPage} = require('../PageObjectModel/OrdersPage');

class POManager {

    constructor(page) {
        this.page = page;
        this.cartPage = new CartPage(page);
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.navbar = new Navbar(page);
        this.checkoutPage = new CheckoutPage(page);
        this.confirmOrderPage = new ConfirmOrderPage(page);
        this.ordersPage = new OrdersPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getNavbar() {
        return this.navbar;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getConfirmOrderPage() {
        return this.confirmOrderPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }
}

module.exports = {POManager};
