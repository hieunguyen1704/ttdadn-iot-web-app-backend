import { publish } from './publish';
import { json } from 'body-parser';

const db = require('../../models');

var mqtt = require('mqtt');

// var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

var client = mqtt.connect({
  servers: [
    {host: '13.76.250.158', port: 1883, protocol: 'tcp'}
  ],
  username: 'BKvm2',
  password: 'Hcmut_CSE_2020'
});

var topic = 'M1';

export const subscribe = () => {
  try {
    client.on('connect', function () {
      console.log('Sub connect OK');
      client.subscribe(topic);
    });

    client.on('message', async function (topic, message) {
      var mes = message;
      // console.log(mes.toString());
      var jsonMessage = JSON.parse(mes.toString());



      const users = await db.User.findAll({where: {isAuto: true, isAdmin: true}});

      if (users.length > 0 ){
        const user = users[0];
        const userConfig = await db.UserConfig.findByPk(user.id);
        // console.log(userConfig);
        

        if (parseFloat(jsonMessage[0].temperature) > parseFloat(userConfig.tempeThreshold) && 
            parseFloat(jsonMessage[0].humid) < parseFloat(userConfig.humidThreshold) && 
            parseFloat(jsonMessage[0].light) > parseFloat(userConfig.lightThreshold)){
              // console.log("OK")

              // console.log("Keo ra")

              const stateLog = await db.motorLog.findAll();
              
              if (!stateLog[stateLog.length-1].state){
                publish(true);

                var pushMotor = setTimeout(function(){}, 5000);
                clearTimeout(pushMotor);

                publish(false);

                db.motorLog.create({
                  state: true,
                });
              }
            }

        else {
              const stateLog = await db.motorLog.findAll();

              if (stateLog[stateLog.length-1].state){
                publish(true);

                var pushMotor = setTimeout(function(){}, 5000);
                clearTimeout(pushMotor);

                publish(false);

                db.motorLog.create({
                  state: false,
                });
            }
        }
      }

      db.Data.create({
        temperature: parseFloat(jsonMessage[0].temperature),
        humid: parseFloat(jsonMessage[0].humid),
        light: parseInt(jsonMessage[0].light),
      });

    });
  } catch (error) {
    console.error(error.message);
  }
};
