var mqtt = require('mqtt')

// var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')


var client = mqtt.connect({
    servers: [
      {host: '13.76.250.158', port: 1883, protocol: 'tcp'}
    ],
    username: 'BKvm2',
    password: 'Hcmut_CSE_2020'
  });


var topic = "M1"
var turnOnMes = '{"device_id": "id3", "values": "1"}'
var turnOffMes = '{"device_id": "id3", "values": "0"}'

export const publish = (req) => {
    //false, true
    try {
        client.on('connect', function () {
            console.log("Pub connect OK")
            // thiet lap cai motor neu false thi dua vao ma true thi dua ra
            if (req){
                client.publish(topic, turnOnMes)
            }
            else {
                client.publish(topic, turnOffMes)
            }
            
            console.log("Publish OK")
        })
    }
    catch (error) {
        console.error(error.message);
    }
};

