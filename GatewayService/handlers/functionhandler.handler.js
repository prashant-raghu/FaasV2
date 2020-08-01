const reqResMsg = require("../config").reqResMsg;
const { v4: uuidv4 } = require('uuid');
const consumer = require("../services/kafka.service").consumer;
const producer = require("../services/kafka.service").producer;
const serviceName = "functionhandlerservice";

async function create(req, res) {
    const topicReq = `${serviceName}_create_req`;
    console.log(req.body)
    req.body.requestId = uuidv4();
    let toSend = req.body;

    function listenerCreate(data) {
        console.log(data)
        let message = data.message, topic = data.topic;
        if (topic != reqResMsg[topicReq])
            return;
        if (!message.value)
            return;
        let msgData = message.value.toString();
        try {
            msgData = JSON.parse(msgData);
        }
        catch (err) {
            console.log(err);
            return;
        }
        console.log(msgData)
        if (msgData.requestId == req.body.requestId) {
            console.log(msgData);
            consumer.removeListener('kafkaMessage', listenerCreate);
            res.status(200).send(msgData);
        }
    }
    consumer.on('kafkaMessage', listenerCreate);
    await producer.send({
        topic: topicReq,
        messages: [
            { value: JSON.stringify(toSend) },
        ],
    })
}

async function read(req, res) {
    const topicReq = `${serviceName}_read_req`;
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
        try {
            msgData = JSON.parse(msgData);
        }
        catch (err) {
            console.log(err);
            return;
        }
        console.log(msgData)
        if (msgData.requestId == req.body.requestId) {
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

async function update(req, res) {
    const topicReq = `${serviceName}_update_req`;
    console.log(req.body)
    req.body.requestId = uuidv4();
    let toSend = req.body;

    function listenerupdate(data) {
        console.log(data)
        let message = data.message, topic = data.topic;
        if (topic != reqResMsg[topicReq])
            return;
        if (!message.value)
            return;
        let msgData = message.value.toString();
        try {
            msgData = JSON.parse(msgData);
        }
        catch (err) {
            console.log(err);
            return;
        }
        console.log(msgData)
        if (msgData.requestId == req.body.requestId) {
            console.log(msgData);
            consumer.removeListener('kafkaMessage', listenerupdate);
            res.status(200).send(msgData);
        }
    }
    consumer.on('kafkaMessage', listenerupdate);
    await producer.send({
        topic: topicReq,
        messages: [
            { value: JSON.stringify(toSend) },
        ],
    })
}

async function remove(req, res) {
    const topicReq = `${serviceName}_delete_req`;
    console.log(req.body)
    req.body.requestId = uuidv4();
    let toSend = req.body;

    function listenerDelete(data) {
        console.log(data)
        let message = data.message, topic = data.topic;
        if (topic != reqResMsg[topicReq])
            return;
        if (!message.value)
            return;
        let msgData = message.value.toString();
        try {
            msgData = JSON.parse(msgData);
        }
        catch (err) {
            console.log(err);
            return;
        }
        console.log(msgData)
        if (msgData.requestId == req.body.requestId) {
            console.log(msgData);
            consumer.removeListener('kafkaMessage', listenerDelete);
            res.status(200).send(msgData);
        }
    }
    consumer.on('kafkaMessage', listenerDelete);
    await producer.send({
        topic: topicReq,
        messages: [
            { value: JSON.stringify(toSend) },
        ],
    })
}
exports.create = create;
exports.read = read;
exports.update = update;
exports.remove = remove;