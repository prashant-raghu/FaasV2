const { Kafka } = require('kafkajs')
const { v4: uuidv4 } = require('uuid');
const config = require('../environments/index');
const kafka = new Kafka({
    clientId: config.kafka.clientId,
    brokers: config.kafka.brokers,
})
const EventEmitter = require('events');
let group = 'faasTrialv1';

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: group });

class kafkaEmitter extends EventEmitter { }
const kafkaEmitterInst = new kafkaEmitter();

function init() {
    producer.connect()
        .then(r => {
        })
    consumer.connect()
        .then(async r => {
            for (let event of config.kafka.events)
                await consumer.subscribe({ topic: `${config.service.name}_${event}_req` });
            return 1;
        })
        .then(r => {
            return consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    let data = {
                        topic,
                        message
                    }
                    kafkaEmitterInst.emit('kafkaMessage', data);
                }
            })
        })
        .then(r => {
            console.log("kafka Initiated")
        })
        .catch(err => {
            console.log(err)
        })
}

exports.Consumer = kafkaEmitterInst;
exports.Producer = producer;
exports.init = init;