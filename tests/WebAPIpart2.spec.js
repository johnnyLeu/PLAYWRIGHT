// Login from UI
const {test, expect} = require('@playwright/test');
let webContext; 

// Quando abbiamo più test è meglio mettere il login nel BEFORE ALL e iniettare i coockies del login
test.beforeAll( async({browser})=> { 
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
    const mailBox = page.getByPlaceholder("email@example.com");
    const passwordBox = page.getByPlaceholder("enter your passsword");  
    const logInBtn = page.getByRole("button", {name: "Login"});

    await mailBox.fill("flameman19@gmail.com");
    await passwordBox.fill("Iamking@000");
    await logInBtn.click();       
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: "state.json"});
     
});   

test('Client App Login Storage Data Playwright Test', async () => {  

    const zaraProduct = "ZARA COAT 3";
    const email = "flameman19@gmail.com"; 
    
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator('.card-body').filter({hasText: zaraProduct}).getByRole('button', {name: " Add To Cart"}).click();
     
    const cart = page.locator("li").filter({ hasText: "  Cart " });
    await cart.click(); 

    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3').filter({ hasText: zaraProduct }).isVisible();
    expect(bool).toBeTruthy();

    await page.getByRole("button", {name: "Checkout"}).click();

    const creditCardBox = page.locator('.text-validated').first();
    const nameCardBox = page.locator('[type ="text"]').nth(2);
    const cardMonth = page.locator('.ddl').first();
    const cardYear = page.locator('.ddl').last();
    const ccvBox = page.locator('.field.small input').first();

    await creditCardBox.fill("");
    await creditCardBox.fill("1234 5678 9000 1908"); 
    await cardMonth.selectOption("08");
    await cardYear.selectOption("19");
    await ccvBox.fill("019");
    await nameCardBox.fill("Giovanni"); 

    const emailCheck = page.locator('.user__name [type="text"]').first();
    await expect(emailCheck).toHaveText(email);

    await page.getByPlaceholder("Select Country").pressSequentially("ita");
    await page.getByRole("button", {name: "Italy"}).click();

    await page.getByText("PLACE ORDER ").click();

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    await page.getByRole("button", {name: " ORDERS"}).click();

    await page.locator('.table').waitFor(); 
    
    const orders = page.locator('tbody tr');
    const ordersCount = await orders.count();

    for(let i = 0; i < ordersCount; i++) {
        const toCheckOrderId = await orders.nth(i).locator('th').textContent();
        if(orderId.includes(toCheckOrderId)) {
            await orders.locator('.btn.btn-primary').nth(i).click();
            break;
        }        
    }   

});
    


 
 

 
