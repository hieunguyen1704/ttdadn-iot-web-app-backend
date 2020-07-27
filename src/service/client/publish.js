import mqtt from 'mqtt';

import db from '../../models';

const sendEmail = require("../email/sendEmail");
export const publish = (status) => {
  return new Promise((resolve, reject) => {
    try {
      // const client = mqtt.connect({
      //   servers: [{ host: '52.187.125.59', port: 1883, protocol: 'tcp' }],
      //   username: 'BKvm',
      //   password: 'Hcmut_CSE_2020',
      // });
      var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');
      let topic = 'Topic/Speaker';

      let turnOnMes = '[{"device_id": "Speaker", "values": ["1", "2000"]}]';
      let turnOffMes = '[{"device_id": "Speaker", "values": ["0", "2000"]}]';
      //false, true
      client.on('connect', async function () {
        const stateLog = await db.motorLogs.findAll({
          order: [['createdAt', 'ASC']],
        });
        //get admin info for email send
        const email = [];
        let threshold = {};
        let current = {}; 
        const users = await db.User.findAll({
          where: { isAuto: true, isAdmin: true },
        });
        if(users.length > 0){
          const user = users[0];
          email.push(user.email);
          const lastConfig = await db.UserConfig.findAll({
            where: {
              userId: user.id,
            },
            limit: 1,
            order: [['id', 'DESC']],
          });
          threshold = {
            temp : lastConfig[0].tempeThreshold,
            humid: lastConfig[0].humidThreshold,
            light: lastConfig[0].lightThreshold
          }
          const lastData = await db.Data.findAll({
            limit: 1,
            order: [['id', 'DESC']],
          })
          current = {
            temp : lastData[0].temperature,
            humid: lastData[0].humid,
            light: lastData[0].light
          }
        }
        console.log('Before State: ', stateLog[stateLog.length - 1].state);
        if (status) {
          // trạng thái cây phơi đồ
          // phơi đồ ra
          if (!stateLog[stateLog.length - 1].state) {
            // set trạng thái phơi đồ là true
            await db.motorLogs.create({
              state: true,
            });
            client.publish(topic, turnOnMes);
            setTimeout(() => {
              client.publish(topic, turnOffMes);
            }, 10000);
            if(users.length > 0){ // send email to admin
              if(users[0].isNotification == true){
                sendEmail(email, "Đồ đang được phơi", threshold, current);
              }
            }
          }
        } else {
          // lấy đồ vào
          if (stateLog[stateLog.length - 1].state) {
            // xét trạng thái phơi đồ là false
            await db.motorLogs.create({
              state: false,
            });
            client.publish(topic, turnOnMes);
            setTimeout(() => {
              client.publish(topic, turnOffMes);
            }, 10000);
            if(users.length > 0){ // send email to admin
              if(users[0].isNotification == true){
                sendEmail(email, "Đồ đang được lấy vào", threshold, current);
              }
            }
          }
        }
        resolve(true);
      });
      setTimeout(() => reject('Timeout'), 3500);
    } catch (error) {
      reject(error);
    }
  });
};
