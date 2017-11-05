const jsonData = require('./data.json');

export default function() {
  return new Promise((resolve, reject) => {
    resolve();
  }).then(() => jsonData);
}
