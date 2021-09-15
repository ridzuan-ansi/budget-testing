/* globals gauge*/
"use strict";
const path = require('path');
const {
    $,
	openBrowser,
    write,
    closeBrowser,
    goto,
	below,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate,
	waitFor
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless,
	    args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Login to KERISI with <username> dan <password>", async function(username, password) {
	await goto(process.env.application_url);
    await waitFor(2000);
	await write(username , into(textBox(below('username'))));
	await write(password , into(textBox(below('password'))));
	await click('log in');
});

step("Logout", async function() {
	await click($('//*[@id="header"]/div[2]/div/a'));
	await click('sign out');
    await waitFor(2000);
	await click('yes');
    await waitFor('Log In');
});

step("Open screen new budget initial", async function() {
	await click('new');
    await waitFor(2000);
});
