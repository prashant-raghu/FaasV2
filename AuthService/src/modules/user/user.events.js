const controller = require("./user.controller");
const Consumer = require("../../services/kafka.service").Consumer;

Consumer.on('event', (message) => {
    if (message.value) {
        let req = {
            body: {
                email: "test@example.com",
                password: "a"
            }
        }, res = {};
        controller.login(req, res);
        console.log(res);
        let msg = message.value.toString();
        console.log(msg);
    }
    console.log('an event occurred!');
});