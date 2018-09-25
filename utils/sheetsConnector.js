const fs = require('fs');
const {google} = require('googleapis');
const authorize = require('./auth.js');
const uuid = require('./uuid.js');

// Reads your secrets from a file and kick starts the process.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file: ' + err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), fetchData);
});

function writeJSON(data, fileName) {
  fs.writeFile(`${fileName}.json`, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

// Fetches data from a sheet, should prolly generalize this.
function fetchData(auth) {
  const sheets = google.sheets({
    version: process.env.GOOGLE_SHEET_API_VERSION || 'v4',
    auth
  });

  const sheet = {
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A1:E'
  };

  sheets.spreadsheets.values.get(sheet, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    return parseJSON(response);
  });
}

// Callback for parsing the aquired sheet-data into a most lovable JSON-format.
function parseJSON(response) {
  const rows = response.data.values; // Values are rows of data
  if (!rows || rows.size === 0) return console.log('Data was empty.');

  const labels = rows[0];
  const parsedData = rows.map((row, index) => {

    return {
      id: uuid(),
      [labels[0]]: row[0],
      [labels[1]]: row[1],
      [labels[2]]: row[2],
      [labels[3]]: parseBoolean(row[3]),
    }
  });
  console.log(parsedData);
  writeJSON(parsedData, 'data');
}

const parseBoolean = (str) => str.toLowerCase() === 'true';
