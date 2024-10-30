const {LoginPage} = require('./LoginPage.cjs');
const {DashboardPage} = require('./DashboardPage.cjs');
const {CartPage} = require('./CartPage.cjs');
const {Navbar} = require('./Navbar.cjs');
const {CheckoutPage} = require('./CheckoutPage.cjs');
const {ConfirmOrderPage} = require('./ConfirmOrderPage.cjs');
const {OrdersPage} = require('./OrdersPage.cjs');

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
