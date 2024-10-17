const {test, expect} = require('@playwright/test'); 

test('Raulshetty Playwright Special Locators Test', async ({page}) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice/");    
    // GetByLabel serve per localizzare un elemento con un determinato LABEL(parte di testo collegata ad un elemento)
    // Per eseguire azioni però, il label deve essere CLICCABILE
    await page.getByLabel("Check me out if you Love IceCreams!").click();  
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    // Scritta all'interno della casella
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: "Submit"}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    // npx playwright test --ui (apre un pannello di controllo per la gestione semplificata dei test)
    await page.getByRole("link", { name: "Shop"}).click();
    // Qui filtriamo tutte le card, poi concateniamo azioni per cliccare "add to cart". Il nome del button non serve perchè è uno solo
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();
    
});
