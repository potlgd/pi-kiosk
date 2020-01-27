const puppeteer = require('puppeteer-core');

const CONFIG = require('./config');

async function run() {
  const browser = await puppeteer.launch({
	executablePath: CONFIG.chromepath,
	headless: false,
	defaultViewPort: null,
	args: ['--disable-infobars', '--start-fullscreen', CONFIG.kioskurl],
	ignoreDefaultArgs: ['--enable-viewport'],
	slowMo: 50
	});
  const pages = await browser.pages();
  const page = pages[0];
  await page._client.send('Emulation.clearDeviceMetricsOverride');

  await page.goto(CONFIG.kioskurl);

  if (CONFIG.uselocation) {
    // Allow geolocation for apps that need it.
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(CONFIG.kioskurl, CONFIG.kioskurlperms);
    await page.setGeolocation({latitude: CONFIG.lat, longitude: CONFIG.long});
  }

  if (CONFIG.uselogin) {
    // Below code is only needed for sites with login required
    const LOGIN_BUTTON_SELECTOR = CONFIG.login_button_selector;
    const USERNAME_SELECTOR = CONFIG.username_selector;
    const PASSWORD_SELECTOR = CONFIG.password_selector;
    const REMEMBERME_SELECTOR = CONFIG.rememberme_selector;
    const LOGIN_SELECTOR = CONFIG.login_selector;

    await page.waitForSelector(LOGIN_BUTTON_SELECTOR);

    await page.click(LOGIN_BUTTON_SELECTOR);

    await page.waitForSelector(LOGIN_SELECTOR);

    if (CONFIG.useagency) {
      const AGENCY_SELECTOR = CONFIG.agency_selector;
      await page.click(AGENCY_SELECTOR);
      await page.keyboard.type(CONFIG.agency);
    }

    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(CONFIG.username);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(CONFIG.password);

    await page.click(REMEMBERME_SELECTOR);
    await page.click(LOGIN_SELECTOR);
  }
}

run();
