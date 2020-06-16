import express from 'express';
import db from './models';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import userRouter from './resources/user/user.router';
import authRouter from './resources/user/auth.router';
import dataRouter from './resources/data/data.router';
import auth from './resources/user/middleware/auth';
import configRouter from './resources/user-config/userConfig.router';
import publishRouter from './resources/publish_rule/publish.router'
import { corsOptions } from './config/cors';

import { subscribe } from './service/client/subscribe.js';
import { publish } from './service/client/publish.js';

const app = express();

const PORT = process.env.PORT || 5001;

app.get('/', function (req, res) {
  res.send('Hello');
});

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));

app.use(json());

app.use('/user', userRouter);

//config router
app.use('/user-config', auth);
app.use('/user-config', configRouter);

app.use('/auth', authRouter);
app.use('/data', auth);
app.use('/data', dataRouter);

app.use('/publish', auth);
app.use('/publish', publishRouter);
export const start = () => {
  try {
    db.sequelize
      .sync({ logging: false })
      .then(() => {
        console.log('Database connected');
      })
      .catch((e) => console.error(e));

    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/`);
    });

    (function () {
      subscribe();
      // 
    })();
    // publish("Hello You");
    // ()
  } catch (e) {
    console.error(e);
  }
};
