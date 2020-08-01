const controller = require("./user.controller");
const config = require("../../environments/index");
const handler = require("./user.handler");
const auth = require("../../services/auth.service");

const Consumer = require("../../services/kafka.service").Consumer;
const Producer = require("../../services/kafka.service").Producer;
Consumer.on('kafkaMessage', async (data) => {
    let message = data.message, topic = data.topic;
    if (topic == `${config.service.name}_register_req`) {
        await register(message)
    }
    else if (topic == `${config.service.name}_login_req`) {
        await login(message)
    }
    else if (topic == `${config.service.name}_update_req`) {
        await update(message)
    }
    else if (topic == `${config.service.name}_get_req`) {
        await get(message)
    }
});

async function register(message) {
    let event = 'register';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let req = {
                body: message
            }
            let res = await handler.register(req);
            res.data.requestId = message.requestId;
            console.log(res); // 
            //Produce back to kafka
            await Producer.send({
                topic: `${config.service.name}_${event}_res`,
                messages: [
                    { key: 'data', value: JSON.stringify(res.data) }
                ],
            })
        }
        return 1;
    }
    catch (err) {
        console.log(err);
        let res = {
            status: false
        }
        await Producer.send({
            topic: `${config.service.name}_${event}_res`,
            messages: [
                { key: 'data', value: JSON.stringify(res) }
            ],
        })
    }
}

async function login(message) {
    let event = 'login';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let req = {
                body: message
            }
            let res = await handler.login(req);
            res.data.requestId = message.requestId;
            console.log(res); // 
            //Produce back to kafka
            await Producer.send({
                topic: `${config.service.name}_${event}_res`,
                messages: [
                    { key: 'data', value: JSON.stringify(res.data) }
                ],
            })
        }
        return 1;
    }
    catch (err) {
        console.log(err);
        let res = {
            status: false
        }
        await Producer.send({
            topic: `${config.service.name}_${event}_res`,
            messages: [
                { key: 'data', value: JSON.stringify(res) }
            ],
        })
    }
}

async function get(message) {
    let event = 'get';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let req = {
                body: message
            }
            let res = await handler.get(req);
            res.data.requestId = message.requestId;
            console.log(res); // 
            //Produce back to kafka
            await Producer.send({
                topic: `${config.service.name}_${event}_res`,
                messages: [
                    { key: 'data', value: JSON.stringify(res.data) }
                ],
            })
        }
        return 1;
    }
    catch (err) {
        console.log(err);
        let res = {
            status: false
        }
        await Producer.send({
            topic: `${config.service.name}_${event}_res`,
            messages: [
                { key: 'data', value: JSON.stringify(res) }
            ],
        })
    }
}

async function update(message) {
    let event = 'update';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let decoded = auth.decode(message.auth);
            console.log(decoded);
            let req = {
                body: message,
                user: {
                    id: decoded
                }
            }
            let res = await handler.update(req);
            res.data.requestId = message.requestId;
            console.log(res); // { code: 200, data: { status: true } }
            //Produce back to kafka
            await Producer.send({
                topic: `${config.service.name}_${event}_res`,
                messages: [
                    { key: 'data', value: JSON.stringify(res.data) }
                ],
            })
        }
        return 1;
    }
    catch (err) {
        console.log(err);
        let res = {
            status: false
        }
        await Producer.send({
            topic: `${config.service.name}_${event}_res`,
            messages: [
                { key: 'data', value: JSON.stringify(res) }
            ],
        })
    }
}