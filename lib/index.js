const {createConnection,connect}=require('./connect');
module.exports = {
    createConnection:createConnection,
    connect:connect,
    Schema: require("./schema"),
    Model: require("./model"),
    Utilities: require("./utilities"),
    Logger: require("./logger"),
    Sqler: require("./sqler"),
};
