const GroupId = "faasTrialv1";
const topics = [
    "authservice_get_res",
    "authservice_login_res",
    "authservice_register_res",
    "authservice_update_res",
    "computeengine_execute_res",
    "functionhandlerservice_create_res",
    "functionhandlerservice_delete_res",
    "functionhandlerservice_read_res",
    "functionhandlerservice_update_res"]

let reqResMsg = {
    //AuthService
    "authservice_register_req": "authservice_register_res",
    "authservice_login_req": "authservice_login_res",
    "authservice_update_req": "authservice_update_res",
    "authservice_get_req": "authservice_get_res",
    //ComputeEngine
    "functionhandlerservice_executeRead_req": "computeengine_execute_res",
    //FunctionHandler
    "functionhandlerservice_create_req": "functionhandlerservice_create_res",
    "functionhandlerservice_read_req": "functionhandlerservice_read_res",
    "functionhandlerservice_update_req": "functionhandlerservice_update_res",
    "functionhandlerservice_delete_req": "functionhandlerservice_delete_res",
}
const kafka = {
    brokers: ['192.168.0.109:9092'],
    clientId: 'faasv2_gateway',
}
exports.event = "kafkaMessage";
exports.serviceName = "gatewayservice";
exports.kafka = kafka;
exports.topics = topics;
exports.reqResMsg = reqResMsg;
exports.GroupId = GroupId;

const allTopics = ["authservice_get_req",
    "authservice_get_res",
    "authservice_login_req",
    "authservice_login_res",
    "authservice_register_req",
    "authservice_register_res",
    "authservice_update_req",
    "authservice_update_res",
    // "computeengine_execute_req",
    "computeengine_execute_res",
    "faasTrialv1",
    "functionhandlerservice_create_req",
    "functionhandlerservice_create_res",
    "functionhandlerservice_delete_req",
    "functionhandlerservice_delete_res",
    "functionhandlerservice_executeRead_req",
    "functionhandlerservice_execute_req",
    "functionhandlerservice_read_req",
    "functionhandlerservice_read_res",
    "functionhandlerservice_update_req",
    "functionhandlerservice_update_res"]