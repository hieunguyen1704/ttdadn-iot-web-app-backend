var mqtt = require('mqtt');

const db = require('../../models');

export const publish = (status) => {
  var client = mqtt.connect({
    servers: [{ host: '13.76.250.158', port: 1883, protocol: 'tcp' }],
    username: 'BKvm2',
    password: 'Hcmut_CSE_2020',
  });

  // var topic = 'Topic/Speaker';
  var topic = 'hahahahaha'

  var turnOnMes = '{"device_id": "Speaker", "values": ["1", "2000"]}';
  var turnOffMes = '{"device_id": "Speaker", "values": ["0", "2000"]}';
  //false, true
  client.on('connect', async function () {
    try {
      const stateLog = await db.motorLogs.findAll();
      console.log(stateLog[stateLog.length-1].state)
      if (status) { // trạng thái cây phơi đồ
        // phơi đồ ra 
        if (!stateLog[stateLog.length - 1].state) {
          client.publish(topic, turnOnMes);
          setTimeout(() => {
            client.publish(topic, turnOffMes);
          }, 5000);
          // set trạng thái phơi đồ là true
          db.motorLogs.create({
            state: true,
          });
        }
      } else {
        // lấy đồ vào
        if (stateLog[stateLog.length - 1].state) {
          client.publish(topic, turnOnMes);
          setTimeout(() => {
            client.publish(topic, turnOffMes);
          }, 5000);
          // xét trạng thái phơi đồ là false
          db.motorLogs.create({
            state: false,
          });
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  });
};
