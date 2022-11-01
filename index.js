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

  if (CONFIG.useeucookie) {
    // Below code is only needed for sites with an EU cookie interstitial
    const EU_COOKIE_BUTTON_SELECTOR = CONFIG.eu_cookie_selector;

    try {
      await page.waitForSelector(EU_COOKIE_BUTTON_SELECTOR);
      await page.click(EU_COOKIE_BUTTON_SELECTOR);
    }
    catch(err) {
      console.log(err);
    }
  }

  if (CONFIG.uselogin) {
    // Below code is only needed for sites with login required
    // LOGIN_BUTTON_SELECTOR is only needed if the site has an interstitial page offering "login"
    const LOGIN_BUTTON_SELECTOR = CONFIG.login_button_selector;
    const USERNAME_SELECTOR = CONFIG.username_selector;
    const PASSWORD_SELECTOR = CONFIG.password_selector;
    const REMEMBERME_SELECTOR = CONFIG.rememberme_selector;
    const LOGIN_SELECTOR = CONFIG.login_selector;

    // IaR seems to be flipping back and forth on a "login" interstitial page.
    // If it's not there, this will timeout in 30 seconds and proceed.
    try {
      await page.waitForSelector(LOGIN_BUTTON_SELECTOR);
      await page.click(LOGIN_BUTTON_SELECTOR);
    }
    catch(err) {
      // login interstitial didn't appear. Proceed without it.
      console.log(err);
    }

    try {
      await page.waitForSelector(LOGIN_SELECTOR);
    }
    catch(err) {
      console.log(err);
    }

    if (CONFIG.useagency) {
      const AGENCY_SELECTOR = CONFIG.agency_selector;
      try {
        await page.click(AGENCY_SELECTOR);
        await page.keyboard.type(CONFIG.agency);
      }
      catch(err) {
        console.log(err);
      }
    }

    try {
      await page.click(USERNAME_SELECTOR);
      await page.keyboard.type(CONFIG.username);
    }
    catch(err) {
      console.log(err);
    }

    try {
      await page.click(PASSWORD_SELECTOR);
      await page.keyboard.type(CONFIG.password);
    }
    catch(err) {
      console.log(err);
    }

    try {
      await page.click(REMEMBERME_SELECTOR);
    }
    catch(err) {
      console.log(err);
    }

    try {
      await page.click(LOGIN_SELECTOR);
    }
    catch(err) {
      console.log(err);
    }
  }
}

run();
