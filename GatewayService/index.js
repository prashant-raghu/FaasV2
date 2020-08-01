var express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
const KafkaService = require("./services/kafka.service").init()
//set auth from header to body to be then passed onto event log
const authorize = require("./middleware/token.middleware").authorize;
const authHandler = require("./handlers/auth.handler");
const functionhandlerHandler = require("./handlers/functionhandler.handler");
const computeengineHandler = require("./handlers/computeengine.handler");

app.post('/auth/register', authorize, authHandler.register);
app.post('/auth/login', authorize, authHandler.login);
app.post('/auth/update', authorize, authHandler.update);
app.post('/auth/get', authorize, authHandler.get);

app.post('/functionhandler/create', authorize, functionhandlerHandler.create);
app.post('/functionhandler/read', authorize, functionhandlerHandler.read);
app.post('/functionhandler/update', authorize, functionhandlerHandler.update);
app.post('/functionhandler/delete', authorize, functionhandlerHandler.remove);

app.post('/computeengine/execute', authorize, computeengineHandler.executeRead);

app.listen(8000, async function () {
    console.log('GatewayService listening on port 8000!');
});
