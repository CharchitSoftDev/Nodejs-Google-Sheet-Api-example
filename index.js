const { google } = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);

client.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('connected');
        gsrun(client);
    }
});

async function gsrun(cl) {
    const sheets = google.sheets({ version: 'v4', auth: cl });

    const opt = {
        spreadsheetId: '<Your Sheet ID>',
        range: 'Sheet1!A1:D4',
    }
    let data = await sheets.spreadsheets.values.get(opt);

    console.log(JSON.stringify(data.data.values));
}