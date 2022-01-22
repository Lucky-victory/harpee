import util from "../helper/utils";

import harpeeConnectConfig from "./harpeeConnectConfig";

/** 
 * Creates a Connection to your harperDB instance, this is the only connection you will need. it covers the connections required for `Utilities` and `Logger` classes.
 * @param {object} config - config object that takes in `host`, `username`,`password` and `token`.
 * @param {string} config.host - your harperdb host url.
 * @param {string} config.username - your harperdb username.
 * @param {string} config.password - your harperdb password.
 * @param {string} [config.token] - your generated JWT token.
 * @returns {void}
 **/
function createConnection(config) {
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
}

/** 
 * An alias for  `createConnection`,  to support older versions of **Harpee**.
 * @param {object} config - config object that takes in `host`, `username`,`password` and `token`.
 * @param {string} config.host - your harperdb host url.
 * @param {string} config.username - your harperdb username.
 * @param {string} config.password - your harperdb password.
 * @param {string} [config.token] - your generated JWT token.
 * @returns void
 * @deprecated
 * 
 **/
function connect(config) {
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
}

export {createConnection,connect};
