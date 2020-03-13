import express from 'express';
import compression from 'compression';
import cors from 'cors';

import getResponse from './getResponse';

const app = express();

app.set('views', `./getSSRApp/views`);
app.set('view engine', 'pug');

app.use(cors());
app.use(compression());
app.get('*', getResponse);

export default app;
