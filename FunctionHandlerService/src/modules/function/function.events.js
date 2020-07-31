const config = require("../../environments/index");
const handler = require("./function.handler");
const auth = require("../../services/auth.service");

const Consumer = require("../../services/kafka.service").Consumer;
const Producer = require("../../services/kafka.service").Producer;
Consumer.on('kafkaMessage', async (data) => {
    let message = data.message, topic = data.topic;
    if (topic == `${config.service.name}_create_req`) {
        await create(message)
    }
    else if (topic == `${config.service.name}_read_req`) {
        await read(message)
    }
    else if (topic == `${config.service.name}_update_req`) {
        await update(message)
    }
    else if (topic == `${config.service.name}_delete_req`) {
        await remove(message)
    }
    else if (topic == `${config.service.name}_executeRead_req`) {
        await executeRead(message)
    }
});

async function create(message) {
    let event = 'create';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let decoded = auth.decode(message.auth);
            message.userId = decoded;
            let req = {
                body: message
            }
            let res = await handler.create(req);
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

async function read(message) {
    let event = 'read';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let decoded = auth.decode(message.auth);
            message.userId = decoded;
            let req = {
                body: message
            }
            let res = await handler.read(req);
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

async function executeRead(message) {
    let event = 'execute';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let decoded = auth.decode(message.auth);
            message.userId = decoded;
            let req = {
                body: message
            }
            let res = await handler.read(req);
            res.data.requestId = message.requestId;
            console.log(res); // 
            //Produce back to kafka
            await Producer.send({
                topic: `${config.service.name}_${event}_req`,
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
            topic: `${config.service.name}_${event}_req`,
            messages: [
                { key: 'data', value: JSON.stringify(res) }
            ],
        })
    }
}

async function remove(message) {
    let event = 'delete';
    try {
        if (message.value) {
            message = JSON.parse(message.value.toString());
            let decoded = auth.decode(message.auth);
            message.userId = decoded;
            let req = {
                body: message
            }
            let res = await handler.remove(req);
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
            message.userId = decoded;
            let req = {
                body: message,
            }
            let res = await handler.update(req);
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