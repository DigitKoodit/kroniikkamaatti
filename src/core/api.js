import * as firebase from 'firebase';
const jsonData = require('./data.json');

export const ERROR_TYPE = 'RESPONSE_ERROR';
export const SUCCESS_TYPE = 'RESPONSE_SUCCESS';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);

function createResponse(type, message) {
  return { type, message };
}

export function pushMessage(studentId, message) {
  if (!studentId) return createResponse(ERROR_TYPE, 'Something went wrong, there is no user reference');
  if (message.size === 0) return createResponse(ERROR_TYPE, 'Message body was empty, try again.');

  const postKey = firebase.database().ref('/posts').push().key;

  return firebase.database().ref('posts/').update({[studentId + '/' + postKey]: message})
    .then(() => createResponse(SUCCESS_TYPE, 'Comment written for '+ studentId))
    .catch((err) => {
      createResponse(ERROR_TYPE, 'Something went wrong with writing data')
    });    
}

export default function() {
  return new Promise((resolve, reject) => {
    resolve();
  }).then(() => jsonData);
}
