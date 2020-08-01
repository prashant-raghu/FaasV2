const reqResMsg = require("../config").reqResMsg;
const { v4: uuidv4 } = require('uuid');
const consumer = require("../services/kafka.service").consumer;
const producer = require("../services/kafka.service").producer;
const serviceName = "functionhandlerservice";

async function executeRead(req, res) {
    const topicReq = `${serviceName}_executeRead_req`;
    console.log(req.body)
    req.body.requestId = uuidv4();
    let toSend = req.body;

    function listenerRead(data) {
        console.log(data)
        let message = data.message, topic = data.topic;
        if (topic != reqResMsg[topicReq])
            return;
        if (!message.value)
            return;
        let msgData = message.value.toString();
        let key = message.key.toString()
        console.log(msgData)
        if (key == req.body.requestId) {
            console.log(msgData);
            consumer.removeListener('kafkaMessage', listenerRead);
            res.status(200).send(msgData);
        }
    }
    consumer.on('kafkaMessage', listenerRead);
    await producer.send({
        topic: topicReq,
        messages: [
            { value: JSON.stringify(toSend) },
        ],
    })
}
exports.executeRead = executeRead;