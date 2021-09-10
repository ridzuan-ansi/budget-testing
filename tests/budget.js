"use strict";
const {
    $,
    click,
    write,
    text,
    textBox,
    into,
    waitFor,
    below
} = require('taiko');
const assert = require("assert");

step("Goto page Budget Initial", async function() {
	await click('budget');
	await click('initial');
});

step("Validate menu to Budget Initial", async function() {
	if (await text('budget').exists()) {
        await click('budget');
        if(await text('initial').exists()) {
            throw 'Failed because user can access menu to Budget Initial';
        } else {
            console.log('lulus kerana tiada akses');
        }
    } else {
        console.log('lulus kerana tiada akses');
    }
});

step("Save empty screen", async function() {
    await waitFor('ok', 3000);
    await click('save');
    await waitFor(4000);
	await click('ok');
});

step("Select Quarter and Authority Approval", async function() {
	await click($('//*[@id="inputArea_Quarter"]/span/span[2]/span'));
	await click('ALLOCATION 1');
    await waitFor(2000);
	await write('IDONTKNOW', into(textBox({'id' : 'AuthorityApproval'})));
});

step("Add new item to Budget Initial", async function() {
    await click('new');
    await waitFor(3000);
});

step("Verify complusory field for Budget Initial", async function() {
    await click('compulsory', below('fund'));
    await waitFor(1000);
	await click('compulsory', below('activity'));
    await waitFor(1000);
    await click('compulsory', below('ptj'));
    await waitFor(1000);
    await click('compulsory', below('cost center'));
    await waitFor(1000);
    await click('compulsory', below('amount'));
});

step("Close screen Initial Detail Modal", async function() {
	await click('cancel');
});