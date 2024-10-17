const {test, expect} = require('@playwright/test'); 
const { constants } = require('buffer');
const exp = require('constants');
const { text } = require('stream/consumers');

// istanza di una singola pagina
// PAGE da un context e una nuova pagina di default
test('Raulshetty Client Login Playwright Test', async function({browser}) { 

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client");

    const mailBox = page.locator('#userEmail'); 
    const passwordBox = page.locator('#userPassword');  
    const logInBtn = page.locator('[value="Login"]');  

    // prendo il titolo della pagina - controllo con un assertion
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");  
 
    await mailBox.fill("flameman19@gmail.com");
    await passwordBox.fill("Iamking@000");
    await logInBtn.click();   

    // Seleziona il messaggio di errore (banner) e attendi che appaia
    const errorBanner = page.locator('div[role="alert"]');   
    
    // Verifica che il banner contenga il testo corretto
    await expect(errorBanner).toContainText('Incorrect email or password.');

    // Stampa il contenuto del banner (opzionale)s
    console.log(await errorBanner.textContent()); 
         
    // Controlla che la richiesta al server sia andata a buon fine e che i prodotti siano stati caricati
    // await page.waitForLoadState('networkidle'); --> NON FUNZIONA SEMPRE 
    await page.locator(".card-body b").first().waitFor(); 

    // Raccogliamo tutti i titoli degli articoli in un array "titles"
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

});

test('Raulshetty Client App Buy Products Playwright Test', async ({page}) => { 

    await page.goto("https://rahulshettyacademy.com/client");
    
    const email = "flameman19@gmail.com"; 
    const mailBox = page.getByPlaceholder("email@example.com");
    const passwordBox = page.getByPlaceholder("enter your passsword");  
    const logInBtn = page.getByRole("button", {name: "Login"});

    await mailBox.fill(email);
    await passwordBox.fill("Iamking@000");
    await logInBtn.click();   
    
    await page.locator(".card-body b").first().waitFor(); 

    const zaraProduct = "ZARA COAT 3";
    /* const products = page.locator('.card-body');
    const count = await products.count();
    for(let i = 0; i< count; i++) {
        if(await products.nth(i).locator("b").textContent() === zaraProduct) {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    } */
    await page.locator('.card-body').filter({hasText: zaraProduct}).getByRole('button', {name: " Add To Cart"}).click();
     
    // const cart = page.locator(".btn.btn-custom[routerlink='/dashboard/cart']");
    // const cart = page.getByRole("listitem").getByRole("button", {name: "Cart"});
    const cart = page.locator("li").filter({ hasText: "  Cart " });
    await cart.click(); 

    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3').filter({ hasText: zaraProduct }).isVisible();
    expect(bool).toBeTruthy();
    /*  Se bisogna controllare molti prodotti o fare controlli più complessi, meglio questa versione

    const cartProducts = page.locator('.cart');
    const cartCount = await cartProducts.count();
    
    if (cartCount === 0) {
        throw new Error("No products in the cart");  
    }

    let productFound = false;
    for (let i = 0; i < cartCount; i++) {
        if (await cartProducts.nth(i).textContent() === zaraProduct) {
            productFound = true;
            await expect(cartProducts.nth(i)).toContainText(zaraProduct);
            break; // Esci dal ciclo se il prodotto è trovato
        }
    }

    if (productFound) {
        throw new Error("The product was not found in the cart.");
    } */

    // await page.locator('[type="button"]').last().click();
    await page.getByRole("button", {name: "Checkout"}).click();

    // const couponBox = page.locator('[type ="text"]').nth(3);
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
    // await couponBox.fill("RAHULSHITTY10");
    
    const emailCheck = page.locator('.user__name [type="text"]').first();
    await expect(emailCheck).toHaveText(email);

    await page.getByPlaceholder("Select Country").pressSequentially("ita");
    await page.getByRole("button", {name: "Italy"}).click();

    /* const dropdown = page.locator('.ta-results'); 
    await dropdown.waitFor();
    await dropdown.filter({hasText: " Italy"}).getByRole("button").click();
    const optionsCount = await dropdown.locator("button").count(); 
    for(let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " Italy") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    } */ 
    
    // await page.locator('.btnn.action__submit').click();
    await page.getByText("PLACE ORDER ").click();

    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();

    // await page.locator('.btn.btn-custom[routerlink="/dashboard/myorders"]').click();
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
    


 
 

 
