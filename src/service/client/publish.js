var mqtt = require('mqtt');

const db = require('../../models');

export const publish = (status) => {
  var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt');
  // var client = mqtt.connect({
  //   servers: [{ host: '13.76.250.158', port: 1883, protocol: 'tcp' }],
  //   username: 'BKvm2',
  //   password: 'Hcmut_CSE_2020',
  // });

  var topic = 'Topic/Speaker';

  var turnOnMes = '{"device_id": "Speaker", "values": ["1", "2000"]}';
  var turnOffMes = '{"device_id": "Speaker", "values": ["0", "2000"]}';
  //false, true
  client.on('connect', async function () {
    try {
      const stateLog = await db.motorLogs.findAll({
        order: [['createdAt', 'ASC']]
      });
      console.log("Before State: ",stateLog[stateLog.length - 1].state);
      if (status) {
        // trạng thái cây phơi đồ
        // phơi đồ ra
        if (!stateLog[stateLog.length - 1].state) {
          // set trạng thái phơi đồ là true
          db.motorLogs.create({
            state: true,
          });
          client.publish(topic, turnOnMes);
          setTimeout(() => {
            client.publish(topic, turnOffMes);
          }, 5000);
        }
      } else {
        // lấy đồ vào
        if (stateLog[stateLog.length - 1].state) {
          // xét trạng thái phơi đồ là false
          db.motorLogs.create({
            state: false,
          });
          client.publish(topic, turnOnMes);
          setTimeout(() => {
            client.publish(topic, turnOffMes);
          }, 5000);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  });
};
