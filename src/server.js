import express from 'express';
import db from './models';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import userRouter from './resources/user/user.router';

import configRouter from './resources/user-config/userConfig.router'
import authRouter from './resources/user/auth.router';
import dataRouter from './resources/data/data.router';

import { corsOptions } from './config/cors';

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));

app.use(json());

app.use('/user', userRouter);

//config router
app.use('/user-config', configRouter);

app.use('/auth', authRouter);
app.use('/data', dataRouter);

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
  } catch (e) {
    console.error(e);
  }
};
