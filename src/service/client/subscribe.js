import { publish } from './publish';

const db = require('../../models');

var mqtt = require('mqtt');

export const subscribe = () => {
  var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');

  // var client = mqtt.connect({
  //   servers: [{ host: '52.187.125.59', port: 1883, protocol: 'tcp' }],
  //   username: 'BKvm',
  //   password: 'Hcmut_CSE_2020',
  // });

  var topic_TempHumi = 'Topic/TempHumi';

  var topic_Light = 'Topic/Light';

  // var topic_test = 'test_hieu';
  try {
    client.on('connect', function () {
      console.log('Sub connect OK');
      client.subscribe(topic_TempHumi);
      client.subscribe(topic_Light);
      // client.subscribe(topic_test);
    });
    var temp = -1;
    var humid = -1;
    var light = -1;
    client.on('message', function (topic, message) {
      try {
        var mes = message;

        var jsonMessage = JSON.parse(mes.toString());
        console.log(jsonMessage[0]);

        if (jsonMessage[0].device_id == 'TempHumi ') {
          temp = parseFloat(jsonMessage[0].values[0]);
          humid = parseFloat(jsonMessage[0].values[1]);
        }

        if (jsonMessage[0].device_id == 'Light') {
          light = parseFloat(jsonMessage[0].values[0]);
        }

        if (temp != -1 && humid != -1 && light != -1) {
          if (global.saveDB) {
            db.Data.create({
              temperature: temp,
              humid: humid,
              light: light,
            });

            doIt(temp, humid, light);
          }

          temp = -1;
          humid = -1;
          light = -1;
        }
      } catch (error) {
        console.error(error.message);
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};

const doIt = async (temp, humid, light) => {
  const users = await db.User.findAll({
    where: { isAuto: true, isAdmin: true },
  });
  if (users.length > 0) {
    const user = users[0];
    const userConfig = await db.UserConfig.findAll({
      where: {
        userId: user.id,
      },
      limit: 1,
      order: [['id', 'DESC']],
    });

    console.log(
      'Last User Config:  ',
      userConfig[0].tempeThreshold,
      userConfig[0].humidThreshold,
      userConfig[0].lightThreshold
    );

    if (
      temp != -1 &&
      temp > parseFloat(userConfig[0].tempeThreshold) &&
      humid != -1 &&
      humid < parseFloat(userConfig[0].humidThreshold) &&
      light != -1 &&
      light > parseFloat(userConfig[0].lightThreshold)
    ) {
      publish(true);
      console.log('publish true');
    } else {
      publish(false);
      console.log('publish false');
    }
  }
};
