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
    uselogin: true,
    login_button_selector: '#subscriberLogin',
    username_selector: '#memberfname',
    password_selector: '#memberpwd',
    rememberme_selector: '#chkRemberMe',
    login_selector: '#login',

    useagency: true,
    agency_selector: '#ddlsubsciribers'
};

const firedepartment-newiar = {
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
    uselogin: true,
    login_button_selector: '#gatsby-focus-wrapper > header > div.container-fluid > nav > div > ul > li:nth-child(6) > a',
    username_selector: '#memberfname',
    password_selector: '#memberpwd',
    rememberme_selector: '#loginForm > div.checkbox-container > label > span',
    login_selector: '#login',

    useagency: true,
    agency_selector: '#ddlsubsciribers'
};

const config = {
    signagesite,
    firedepartment
};

const agency = process.env.AGENCY;

module.exports = config[agency];
