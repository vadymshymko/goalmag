const functions = require('firebase-functions');
const getSSRApp = require('./getSSRApp/').default;

exports.getSSRApp = functions.https.onRequest(getSSRApp);
