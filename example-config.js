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
    useeucookie: false,
    uselogin: false,
    useagency: false,
    uselocation: false
};

const firedepartment = {
    chromepath: '/usr/bin/chromium-browser',
    kioskurl: 'https://dashboard.iamresponding.com/',

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
    uselogin: true,
    username_selector: '#Input_Username',
    password_selector: '#Input_Password',
    rememberme_selector: 'body > div.split-page > div.container-fluid > div > div.col-xl-7.col-lg-7.left-border > div.left-wrap > div > div > form > div.checkbox-container > label > span',
    login_selector: 'body > div.split-page > div.container-fluid > div > div.col-xl-7.col-lg-7.left-border > div.left-wrap > div > div > form > div.row.mt-4 > div > button.btn.btn-iar.me-3',

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
