import util from "../helpers/util";
import HarpeeSchema from "./harpeeSchema";
import harpeeConnectConfig from "./harpeeConnectConfig";

/** 
 * Creates a Connection to your harperDB instance, this is the only connection you will need. it covers the connections required for `Utilities` and `Logger` classes.
 * @param {string} config.host - your harperdb host url.
 * @param {string} config.username - your harperdb username.
 * @param {string} config.password - your harperdb password.
 * @param {string} [config.token] - your generated JWT token.
 * 
 **/
function createConnection(config:ConnectionConfig):void {
    if (!util.isObject(config)) {
        throw new TypeError("connection `config` must be an Object");
    }
    if (!config.host) {
        throw new Error("`host` is required");
    }
   
    const {password,username,host,token}= config;

    if ((username && !password) || (password && !username)) {
        throw new Error("you must include both `username` and `password`");
    }
    if ((username && password && token)) {
        throw new Error(
            "you should include `username` and `password` or only `token`"
        );
    }
    harpeeConnectConfig.setConfig({ host, username, password, token });
}

/** 
 * An alias for  `createConnection`,  to support older versions of **Harpee**.
 * @deprecated
 * 
 **/
function connect(config:ConnectionConfig):void {
   createConnection(config) 
   
}

export interface ConnectionConfig{
   host:string;
   password:string;
   username:string;
   token?:string;
}
export {createConnection,connect};
