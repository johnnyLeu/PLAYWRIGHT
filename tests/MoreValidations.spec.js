const {test, expect} = require('@playwright/test'); 

// per lanciare tutti i test in parallelo usa: 
// test.describe.configure({mode:'parallel'}); 
// oppure 'serial' quando abbiamo test dipendenti l'un l'altro. 
// Così se uno fallisce non eseguirà gli altri test.
test("Pop-up validations", async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // Torna indietro
    // await page.goBack();
    // Va avanti
    // await page.goForward();

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

    // Per gestire eventi, come i pop up. Nel primo argomento va il tipo di evento, poi il come gestirlo
    page.on('dialog', dialog => dialog.accept());
    // Ovunque accada l'evento, il flusso andra dove viene gestito l'evento
    await page.locator("#confirmbtn").click();
    // Muove il cursore sopra l'elemento senza cliccare
    await page.locator("#mousehover").hover();
    
    // Se abbiamo una child page all'interno di una main page, playwright non riesce ad interagire direttamente
    // con essa. Per riconoscere una child page verificare la presenza del tag "IFRAME" o "FRAMESET".
    // Per switchare al child frame 
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator('li a[href*="lifetime-access"]:visible').click();
    // await framesPage.getByRole('link', {name: "Learning paths"}).click();

    const takeTest = await framesPage.locator('.text h2').textContent();
    console.log(takeTest.split(" ")[1]);

})

test("Screenshots & Visual comparision", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 

    await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await page.locator("#hide-textbox").screenshot({path: 'screenshot2.png'});
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();

})
 
/* Visual Testing = tecnica di test del software che si concentra sulla verifica visiva dell'interfaccia utente (UI) di un'applicazione.
Cattura screenshot della UI in determinati stati (per esempio, dopo una determinata azione) e li 
confronta con immagini di riferimento ("baseline images") che rappresentano la versione corretta e attesa dell'applicazione.
*/