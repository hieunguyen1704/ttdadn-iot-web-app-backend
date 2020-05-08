var mqtt = require('mqtt')
var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

var topic = "M1"

export const publish = (req) => {
    try {
        client.on('connect', function () {
            console.log("Pub connect OK")

            client.publish(topic, req)
            console.log("Publish OK")
        })
    }
    catch (error) {
        console.error(error.message);
        return res.status(400).json({ error: error.message });
    }
};

