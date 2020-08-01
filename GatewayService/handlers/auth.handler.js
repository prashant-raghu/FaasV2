const reqResMsg = require("../config").reqResMsg;
const { v4: uuidv4 } = require('uuid');
const consumer = require("../services/kafka.service").consumer;
const producer = require("../services/kafka.service").producer;
const serviceName = "authservice";

async function register(req, res) {
    const topicReq = `${serviceName}_register_req`;
    console.log(req.body)
    req.body.requestId = uuidv4();
    let toSend = req.body;

    function listenerRegister(data) {
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
            consumer.removeListener('kafkaMessage', listenerRegister);
            res.status(200).send(msgData);
        }
    }
    consumer.on('kafkaMessage', listenerRegister);
    await producer.send({
        topic: topicReq,
        messages: [
            { value: JSON.stringify(toSend) },
        ],
    })
}

async function login(req, res) {
    const topicReq = `${serviceName}_login_req`;
    console.log(req.body)
    req.body.requestId = uuidv4();
    let toSend = req.body;

    function listenerLogin(data) {
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
            consumer.removeListener('kafkaMessage', listenerLogin);
            res.status(200).send(msgData);
        }
    }
    consumer.on('kafkaMessage', listenerLogin);
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

async function get(req, res) {
    const topicReq = `${serviceName}_get_req`;
    console.log(req.body)
    req.body.requestId = uuidv4();
    let toSend = req.body;

    function listenerGet(data) {
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
            consumer.removeListener('kafkaMessage', listenerGet);
            res.status(200).send(msgData);
        }
    }
    consumer.on('kafkaMessage', listenerGet);
    await producer.send({
        topic: topicReq,
        messages: [
            { value: JSON.stringify(toSend) },
        ],
    })
}
exports.login = login;
exports.register = register;
exports.update = update;
exports.get = get;