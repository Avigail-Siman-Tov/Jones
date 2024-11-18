const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://testsite.getjones.com/ExampleForm/');

    await page.waitForSelector('input[name="name"]');
    await page.type('input[name="name"]', 'Avigail');
    await page.type('input[name="email"]', 'avigailsi123@gmail.com');
    await page.type('input[name="phone"]', '0556722735');
    await page.type('input[name="company"]', 'Jones');

    const dropdownSelector = 'select[name="number_of_employees"]';
    await page.waitForSelector(dropdownSelector);
    await page.select(dropdownSelector, '51-500');

    await page.screenshot({ path: 'form_filled.png' });

    const submitButtonSelector = 'button.primary.button'; 
    await page.waitForSelector(submitButtonSelector, { timeout: 60000 });
    await page.click(submitButtonSelector);

    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    console.log('Successfully reached the thank you page!');

    await browser.close();
  } catch (error) {
    console.error('Error during Puppeteer execution:', error);
  }
})();
