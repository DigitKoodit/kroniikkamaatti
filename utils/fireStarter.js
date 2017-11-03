
// TODO: Like, everything my dude.

// Srsly tho, this script is supposed to pre-populate our backend once sheetsConnector has finished parsing stuff.
// Doesn't do anything yet.
// TODO: Write all the code.
const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.FIREBASE_SENDER_ID,
};

firebase.initializeApp(config);