class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.signinButton = page.getByRole("button", {name: "Login"});;
        this.mailBox = page.getByPlaceholder("email@example.com");
        this.passwordBox = page.getByPlaceholder("enter your passsword"); 
    }

    async goToLoginPage() {
        await this.page.goto("https://rahulshettyacademy.com/client");  
    }

    async loginProcess(email, passsword) {
        await this.mailBox.fill(email);
        await this.passwordBox.fill(passsword);
        await this.signinButton.click()
        await this.page.locator(".card-body b").first().waitFor();          
    }

}

module.exports = {LoginPage};
