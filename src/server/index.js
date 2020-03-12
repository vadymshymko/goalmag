import express from 'express';

import getResponse from './getResponse';

const app = express();

app.set('views', `./getServerResponse/views`);
app.set('view engine', 'pug');

app.get('*', getResponse);

export default app;
