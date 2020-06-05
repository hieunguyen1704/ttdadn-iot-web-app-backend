var mqtt = require('mqtt')
var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

var topic = "M1"

export const publish = (req) => {
    //false, true
    try {
        client.on('connect', function () {
            console.log("Pub connect OK")
            // thiet lap cai motor neu false thi dua vao ma true thi dua ra
            client.publish(topic, req)
            publish('[{"device_id": "id2","values": ["1", "3"]},{"device_id": "1","values": ["3.24"]}]')
            console.log("Publish OK")
        })
        return "Publish Ok";
    }
    catch (error) {
        console.error(error.message);
    }
};

