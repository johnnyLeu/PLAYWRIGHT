const {test, expect} = require('@playwright/test'); 
const { request } = require('https');

// istanza di un browser che può quindi gestire più pagine
test('Browser Context Playwright Test', async function({browser}) { 

    await page.goto("https://google.com");

    const context = await browser.newContext();
    const page = await context.newPage();
    console.log(await page.title());

});   

// istanza di una singola pagina
// PAGE da un context e una nuova pagina di default
test('Raulshetty Page Playwright Test', async function({page}) { 

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const usernameBox = page.locator('#username');
    const passwordBox = page.locator('#password');
    const roleBox = page.locator('select.form-control'); 
    const radioBtn = page.locator(".radiotextsty");
    const signInBtn = page.locator('#signInBtn'); 
    const okeyBtn = page.locator("#okayBtn"); 
    const termsBtn = page.locator('#terms'); 

    // prendo il titolo della pagina - controllo con un assertion 
    // console.log(await page.title());
    //await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");  

    // css selector -->   #id / .class / [attribute='value'] / text="string..."
    await usernameBox.fill("rahulshetty");
    await passwordBox.fill("learning");

    // per selezionare un opzione di un menù a tendina
    await roleBox.selectOption("Student");
    // per selezionare l'ultimo di tot. botton radio (a pallino) 
    await radioBtn.last().click();
    await okeyBtn.click();
    await termsBtn.click();

    await signInBtn.click();
    // const errAccessBanner = page.locator('#login-form');

    // controlla che tutti i button da spuntare siano stati correttamente selezionati
    console.log("radio button is checked: " + await radioBtn.last().isChecked());
    await expect(radioBtn.last()).toBeChecked();
    
    console.log("terms button is checked: " + await termsBtn.isChecked());
    await expect(termsBtn).toBeChecked();

    // await page.pause();

    // ASSERT the wrong password's message
    // console.log(await errAccessBanner.textContent());
    // await expect(errAccessBanner).toContainText('Incorrect'); 
 
    await usernameBox.fill("");
    await usernameBox.fill("rahulshettyacademy");
    await signInBtn.click();

});

test('Raul Shop Page Playwright Test', async function({page}) {

    await page.goto("https://rahulshettyacademy.com/angularpractice/shop");

    // Seleziona l'elemento "a" all'interno della classe "card-body" 
    const cardTitles = page.locator('.card-body a');
    const allTitles = await cardTitles.allTextContents();
 
    console.log(await cardTitles.first().textContent());
    
    console.log(allTitles);
 
});

test('Child window hadl', async ({browser}) => {
    // usando "PAGE" lo scope è su una singola pagina, quindi per aprire una pagina da link esterno
    // dobbiamo usare "BROWSER" e creare più variabili per ogni pagina
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");
    
    // verranno eseguite in contemporanea e aspetterà che tutte le operazioni siano "FULFILLED" per proseguire 
    const [newPage] = await Promise.all([   
        context.waitForEvent('page'), // aspetta che l'evento nuova pagina accada
        documentLink.click(), // una nuova pagina è aperta
    ]) 
    const text = await newPage.locator('.red').textContent();
    console.log(text);
 
})  

// Modifica della response 
test('Browser Context-Validating Error Login', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const usernameBox = page.locator('#username');
    const passwordBox = page.locator('#password'); 
    const roleBox = page.locator('select.form-control'); 
    const radioBtn = page.locator(".radiotextsty");
    const signInBtn = page.locator('#signInBtn'); 
    const okeyBtn = page.locator('#okayBtn'); 
    const termsBtn = page.locator('#terms'); 

    // page.route('**/*.css', route => route.abort());

    /* Utilizzato per ascoltare eventi che si verificano durante l'interazione con pagina web
    In questo caso l'evento "request", emesso ogni volta che la pagina effettua una richiesta 
    HTTP (caricamento immagine, chiamata API, file CSS, ecc.) */    
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await passwordBox.fill("learning");
    await usernameBox.fill("rahulshettyacademy");
    await roleBox.selectOption("Student"); 
    await radioBtn.last().click();
    await okeyBtn.click();
    await termsBtn.click();
    
    // page.route('**/*.{jpeg,png,jpg}', route => route.abort());
    
    await signInBtn.click(); 

    await page.pause();
 
})  

// npx playwright codegen http://google.com ---> puoi generare codice playwright in automatico  