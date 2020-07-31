// export kafka consumers

const { Kafka } = require('kafkajs')
const { v4: uuidv4 } = require('uuid');
const config = require('../environments/index');
const kafka = new Kafka({
    clientId: 'faasv2_auth',
    brokers: config.kafka.brokers,
})
const EventEmitter = require('events');

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'faasTrialv1' });

class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

// app.get('/', async function (req, res) {
//     //send an event to a topic, consume that, and respond that as the res of this api
//     let id = uuidv4();
//     let toSend = {
//         id,
//         message: "Sent to recieve"
//     }
//     myEmitter.on('event', (message) => {
//         if (message.value) {
//             let msg = message.value.toString();
//             msg = JSON.parse(msg);
//             if (msg && msg.id == id) {
//                 console.log(msg);
//                 res.status(200).send(msg);
//             }
//         }
//         console.log('an event occurred!');
//     });
//     await producer.send({
//         topic: 'faasTrialv1',
//         messages: [
//             { value: JSON.stringify(toSend) },
//         ],
//     })
// });
function init() {
    producer.connect()
        .then(r => {

        })

    consumer.connect()
        .then(r => {
            return consumer.subscribe({ topic: 'faasTrialv1' });
        })
        .then(r => {
            return consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    myEmitter.emit('event', message);
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

exports.Consumer = myEmitter;
exports.init = init;