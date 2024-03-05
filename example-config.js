/*
 * You must set an appropriate chromepath, kioskurl, and booleans.
 *
 * Other settings are only necessary if the corresponding booleans are true.
 *
 * You must also set an AGENCY environment variable in order to select a config section.
 */

const signagesite = {
    chromepath: '/usr/bin/chromium-browser',
    kioskurl: 'https://signage-site.example.com/',
    dispWidth: 3840,
    dispHeight: 2400,
    useeucookie: false,
    use2ndeucookie: false,
    useinterstitiallogin: false,
    uselogin: false,
    useagency: false,
    uselocation: false
};

const firedepartment = {
    chromepath: '/usr/bin/chromium-browser',
    kioskurl: 'https://dashboard.iamresponding.com/',

    // Need to know the display resolution for optimal sizing.
    dispWidth: 1920,
    dispHeight: 1080,

    // Your specific agency credentials go here:
    username: 'username',
    password: 'password',
    agency:   'MYAGENCYID',

    // If you want to see accurate directions, put your agency GPS location below:
    uselocation: true,
    kioskurlperms: ['geolocation','notifications'],
    lat: 40.578627,
    long: -75.335203,

    // If using IAmResponding, you shouldn't need to change these:
    useeucookie: true,
    eu_cookie_selector: '#accept-policy',

    use2ndeucookie: false,
    eu_cookie_selector_2: '#nolongerused',

    useinterstitiallogin: false,
    login_button_selector: '#menu-item-27 > a',

    uselogin: true,
    username_selector: '#Input_Username',
    password_selector: '#Input_Password',
    rememberme_selector: 'body > div.split-page > div.container-fluid > div > div.col-xl-7.col-lg-7.left-border > div.left-wrap > div > div > form > div.checkbox-container > label > span',
    login_selector: 'body > div.login-section.split-page > div > div > div:nth-child(1) > div > div.left-content > div > form > div.row.my-mt0-mob-4 > div:nth-child(1) > div > button',

    useagency: true,
    agency_selector: '#ddlsubsciribers'
};

const config = {
    signagesite,
    firedepartment,
    firedepartment-newiar
};

const agency = process.env.AGENCY;

module.exports = config[agency];
