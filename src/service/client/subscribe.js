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

var topic_TempHumi = 'Topic/TempHumi';
var topic_Light = 'Topic/Light';
// var test = 'test_02';

export const subscribe = () => {
  try {
    client.on('connect', function () {
      console.log('Sub connect OK');
      client.subscribe(topic_TempHumi);
      client.subscribe(topic_Light);
      // client.subscribe(test);
    });

    var temp = -1;
    var humid = -1;
    var light = -1;

    client.on('message', async function (topic, message) {
      var mes = message;
      // console.log(mes);
      // console.log(mes.toString());

      var jsonMessage = JSON.parse(mes.toString());
      console.log(jsonMessage[0])


      if (jsonMessage[0].device_id == 'TempHumi '){
          temp = parseFloat(jsonMessage[0].values[0]);
          humid = parseFloat(jsonMessage[0].values[1]);
      }
      
      if (jsonMessage[0].device_id == 'Light'){
          light = parseFloat(jsonMessage[0].values[0]);

      }
    
      if(temp !== -1 && humid !== -1 && light !== -1){
        db.Data.create({
          temperature: temp,
          humid: humid,
          light: light
        })
      }
      
      const users = await db.User.findAll({where: {isAuto: true, isAdmin: true}});

      if (users.length > 0 ){
        const user = users[0];
        const userConfig = await db.UserConfig.findByPk(user.id);

        if (parseFloat(jsonMessage[0].temperature) > parseFloat(userConfig.tempeThreshold) && 
            parseFloat(jsonMessage[0].humid) < parseFloat(userConfig.humidThreshold) && 
            parseFloat(jsonMessage[0].light) > parseFloat(userConfig.lightThreshold)){
              const stateLog = await db.motorLog.findAll();
              if (!stateLog[stateLog.length-1].state){
                publish();

                db.motorLog.create({
                  state: true,
                });
              }
            }

        else {
              const stateLog = await db.motorLog.findAll();

              if (stateLog[stateLog.length-1].state){
                publish();

                db.motorLog.create({
                  state: false,
                });
            }
        }
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};
