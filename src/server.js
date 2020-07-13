import express from 'express';
import db from './models';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import userRouter from './resources/user/user.router';
import authRouter from './resources/user/auth.router';
import dataRouter from './resources/data/data.router';
import auth from './resources/user/middleware/auth';
import configRouter from './resources/user-config/userConfig.router';
import publishRouter from './resources/publish_rule/publish.router';
import getMotorState from './resources/motorState/motor.router';
import userInfoRouter from './resources/user-info/userInfo.router';
import changePassWordRouter from './resources/change-password/change-password.router';
import resetPasswordRouter from './resources/reset-password/resetPass.router';
import { corsOptions } from './config/cors';
import interactRouter from './resources/interact/interact.router';

import { subscribe } from './service/client/subscribe.js';
// import { publish } from './service/client/publish.js';

const app = express();

//global variable
global.saveDB = true;

const PORT = process.env.PORT || 5000;

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

app.use('/motor', auth);
app.use('/motor', getMotorState);

app.use('/user-info', auth);
app.use('/user-info', userInfoRouter);

app.use('/change-password',auth);
app.use('/change-password', changePassWordRouter);

app.use('/reset-password', resetPasswordRouter);

app.use('/interact', interactRouter);

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

    subscribe();
  } catch (e) {
    console.error(e);
  }
};
