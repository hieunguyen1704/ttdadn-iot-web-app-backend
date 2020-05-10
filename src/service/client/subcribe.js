const db = require('../../models');

var mqtt = require('mqtt')
var client  = mqtt.connect('ws://broker.hivemq.com:8000/mqtt')

var topic = "M1"

export const subscribe = () => {
    try {
        client.on('connect', function () {
            console.log("Sub connect OK")   
            client.subscribe(topic)
          })
        
        client.on('message', function (topic, message) {
            var mes = message
            console.log(mes.toString())
            var jsonMessage = JSON.parse(mes.toString())
            db.Data.bulkCreate(
                [
                    {
                        temperature: parseFloat(jsonMessage[0].temperature),
                        humid: parseFloat(jsonMessage[0].humid),
                        light: parseInt(jsonMessage[0].light)
                    }
                ]
            )
        })
    }
    catch (error) {
        console.error(error.message);
        return res.status(400).json({ error: error.message });
    }
};

