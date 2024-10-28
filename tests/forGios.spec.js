/*  import { test, expect } from "@playwright/test";

test.describe("Check Google search", () => {

  // Prima dell'esecuzione di ogni test
  test.beforeEach(async ({ page }) => {
    await test.step("Navigate to Google page", async () => {
      await page.goto("https://www.google.com/");
      await page.getByRole("button", { name: "Accetta tutto" }).click();
    });

    await test.step("Check we are in Google section", async () => {
      await expect(page).toHaveURL(/google/);
    });
  });
  
  test.skip("Validate search Google", async ({ page }) => {
    // await test.step("Navigate to Google page", async () => {
    //   await page.goto("https://www.google.com/");
    //   await page.getByRole("button", { name: "Accetta tutto" }).click();
    // });

    // await test.step("Check we are in Google section", async () => {
    //   await expect(page).toHaveURL(/google/);
    // });

    await test.step("Write 'Test Automation' on searchbar", async () => {
      await page.getByLabel("Cerca", { exact: true }).fill("Test Automation");
    });

    await test.step("Click on Search With Google", async () => {
      await page.getByRole("button", { name: "Cerca con Google" }).click();
    });

    await test.step("Validate the results", async () => {
      await expect(page.locator("#rso")).toBeVisible();
      const centerColumn = page.locator("#center_col");
      const allTexts = await centerColumn.allTextContents();
      const allInner = await centerColumn.allInnerTexts();
      const h3 = centerColumn.getByRole("heading");
      const a = await h3.allTextContents();
      const b = await h3.allInnerTexts();

      const asd = page.locator("#rso").getByLabel("h3");
      const allLinks = page.locator("h3");
      for (let i = 0; i < (await asd.count()); i++) {
        console.log(await asd.nth(i).textContent());
      }
    });
  });

  test("Manage API Google", async ({ page }) => {
    await test.step("Listener API Google", async () => {
      await page.route("https://www.google.com/*",
        async route => {
          const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      await route.fulfill({
          response,
          body,
        }); 
          const giovanni = {"nome": "pippo"};
          await route.fulfill({response: response, body: giovanni});
        });

        await page.waitForResponse("https://www.google.com/*")
        await page.goto("https://www.google.com/");
    });
  });

  // Dopo l'esecuzione di ogni test
  test.afterEach(async ({ page }) => {
    // Andiamo a pulire i cookies
    await page.context().clearCookies();
  });

  // Dopo l'esecuzione di ogni test
  test.afterAll(async () => {});
});

*/