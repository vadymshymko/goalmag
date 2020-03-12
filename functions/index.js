const functions = require('firebase-functions');
const getServerResponse = require('./getServerResponse');

console.log(process.env.NODE_ENV);

exports.getServerResponse = functions.https.onRequest(getServerResponse.default);
