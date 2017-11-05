const fs = require('fs');
const google = require('googleapis');
const authorize = require('./auth.js');
const uuid = require('./uuid.js');

// Reads your secrets from a file and kick starts the process.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }

  authorize(JSON.parse(content), fetchData);
});

function writeJSON(data, fileName) {
  fs.writeFile(fileName+'.json',JSON.stringify(data));
}

// Fetches data from a sheet, should prolly generalize this.
function fetchData(auth) {
  let sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A1:E',
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    return parseJSON(response);
  });
}

// Callback for parsing the aquired sheet-data into a most lovable JSON-format.
function parseJSON(response) {
  const { values } = response; // Values are rows of data
  if (!values || values.size === 0) return console.log('Data was empty.');

  const labels = values[0];
  const parsedData = values.map((row, index) => {

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
