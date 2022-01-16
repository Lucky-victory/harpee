const {createConnection,connect}=require('./connect');
module.exports = {
    createConnection,
    connect,
    Schema: require("./schema"),
    Model: require("./model"),
    Utilities: require("./utilities"),
    Logger: require("./logger"),
};
