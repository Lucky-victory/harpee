const {createConnection,connect}=require('./lib/connect');
module.exports = {
    createConnection,
    connect,
    Schema: require("./lib/schema"),
    Model: require("./lib/model"),
    Utilities: require("./lib/utilities"),
    Logger: require("./lib/logger"),
};
