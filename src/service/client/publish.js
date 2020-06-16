var mqtt = require('mqtt');

const db = require('../../models');
// var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

var client = mqtt.connect({
  servers: [{ host: '13.76.250.158', port: 1883, protocol: 'tcp' }],
  username: 'BKvm2',
  password: 'Hcmut_CSE_2020',
});

// var topic = 'Topic/Speaker';
var topic = 'hahahahaha';

var turnOnMes = '{"device_id": "Speaker", "values": ["1", "2000"]}';
var turnOffMes = '{"device_id": "Speaker", "values": ["0", "2000"]}';

export const publish = (status) => {
  //false, true
  try {
    client.on('connect', async function () {

      const stateLog = await db.motorLogs.findAll();
      console.log("AAAAAAAAAAAa")
          
      console.log(stateLog[stateLog.length-1].state)

      if(status){
        if (!stateLog[stateLog.length-1].state){
          client.publish(topic, turnOnMes);
          setTimeout(() => {
            client.publish(topic, turnOffMes);
          }, 5000);
  
          db.motorLogs.create({
            state: true,
          });
        }
      }
      else{
        if (stateLog[stateLog.length-1].state){
          client.publish(topic, turnOnMes);
          setTimeout(() => {
            client.publish(topic, turnOffMes);
          }, 5000);

          db.motorLogs.create({
            state: false,
          });
      }
      }
      
    
    });
  } catch (error) {
    console.error(error.message);
  }
};
