var mqtt = require('mqtt');

const db = require('../../models');
// var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

var client = mqtt.connect({
  servers: [{ host: '13.76.250.158', port: 1883, protocol: 'tcp' }],
  username: 'BKvm2',
  password: 'Hcmut_CSE_2020',
});

var topic = 'Topic/Speaker';

var turnOnMes = '{"device_id": "Speaker", "values": ["1", "2000"]}';
var turnOffMes = '{"device_id": "Speaker", "values": ["0", "2000"]}';

// export const publish = (state) => {
//   //false, true
//   try {
//     client.on('connect', async function () {
//       const stateLog = await db.motorLog.findAll({
//         limit: 1,
//         order: [['id', 'DESC']],
//       });
//       const lastState = stateLog.length > 0 ? stateLog[0].state : true;
//       // console.log(lastState)
//       if (lastState && state === true) {
//         db.motorLog.create({
//           state: true,
//         });
//         client.publish(topic, turnOnMes);
//         setTimeout(() => {
//           client.publish(topic, turnOffMes);
//         }, 5000);
//       } else if (lastState && state === false) {
//         db.motorLog.create({
//           state: false,
//         });
//         client.publish(topic, turnOnMes);
//         setTimeout(() => {
//           client.publish(topic, turnOffMes);
//         }, 5000);
//       }
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// };



export const publish = (status) => {
  //false, true
  try {
    client.on('connect', async function () {
    
      client.publish(topic, turnOnMes);
      setTimeout(() => {
        client.publish(topic, turnOffMes);
      }, 5000);

      if (status){
        db.motorLogs.create({
              state: true,
            });
      }
      else if (!status){
        db.motorLogs.create({
          state: false,
        });
      }
    });
  } catch (error) {
    console.error(error.message);
  }
};
