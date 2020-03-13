const functions = require('firebase-functions');
const getSSRApp = require('./getSSRApp/').default;

exports.getSSRApp = functions.region('europe-west1').https.onRequest(getSSRApp);
