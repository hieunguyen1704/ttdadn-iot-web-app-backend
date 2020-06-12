var mqtt = require('mqtt')

// var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')


var client = mqtt.connect({
    servers: [
      {host: '13.76.250.158', port: 1883, protocol: 'tcp'}
    ],
    username: 'BKvm2',
    password: 'Hcmut_CSE_2020'
  });


var topic = "Topic/Speaker"

var turnOnMes = '{"device_id": "Speaker", "values": ["1", "2000"]}'
var turnOffMes = '{"device_id": "Speaker", "values": ["0", "2000"]}'

export const publish = () => {
    //false, true
    try {
        client.on('connect', function () {
            console.log("Pub connect OK")
            
            client.publish(topic, turnOnMes);

            var pushMotor = setTimeout(function(){}, 5000);
            clearTimeout(pushMotor);

            client.publish(topic, turnOffMes);
            
            console.log("Publish OK")
        })
    }
    catch (error) {
        console.error(error.message);
    }
};

