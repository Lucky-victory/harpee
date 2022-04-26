const util = require("../helpers/util");

const harpeeConnectConfig = require("./harpeeConnectConfig");

/**
 * 
 * @typedef {{host:string,username:string,password:string,token?:string}} Config
 */
/** 
 * Creates a Connection to your harperDB instance, this is the only connection you will need. it covers the connections required for `Utilities` and `Logger` classes.
 * @param {Config} config - config object that takes in `host`, `username`,`password` and/or `token`.
 * @param {(info?:Config,error?:any)=>void} [connectionInfo] - get the connection details or error if any
 * @returns {void}
 */
function createConnection(config,connectionInfo) {
    try{

        if (!util.isObject(config)) {
            throw new TypeError("connection `config` must be an Object");
    }
    if (!config.host) {
        throw new Error("`host` is required");
    }
    const host = config.host || null;
    const username = config.username || null;
    const password = config.password || null;
    const token = config.token || null;
    
    if ((username && !password) || (password && !username)) {
        throw new Error("you must include both `username` and `password`");
    }
    if ((username && password && token)) {
        throw new Error(
            "you should include `username` and `password` or only `token`"
            );
        }
        const connectionConfig = { host, username, password, token };
        harpeeConnectConfig.setConfig(connectionConfig);
        if(util.isFunction(connectionInfo)){
            connectionInfo(connectionConfig,null)
        }
    }
    catch(error){
        if(util.isFunction(connectionInfo)){
        connectionInfo(null,error);
     }   
    }
}

/** 
 * An alias for  `createConnection`,  to support older versions of **Harpee**.
 * @deprecated
 * 
 **/
function connect(config) {
   createConnection(config) 
   
}

module.exports= {createConnection,connect};
