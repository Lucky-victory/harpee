const Util = require("../helpers/utils");
const harpeeConnect = require("./core/harpeeConnect");

/** Creates a Connection for your database.
 * @param {object} config - config object that takes in `host`, `username`,`password` and `token`.
 * @param {string} config.host - your harperdb host url.
 * @param {string} config.username - your harperdb username.
 * @param {string} config.password - your harperdb password.
 * @param {string} [config.token] - your generated JWT token.
 * @returns void
 **/
function createConnection(config) {
    if (!Util.isObject(config)) {
        throw new TypeError("connection `config` must be an Object");
    }
    if (!config.host) {
        throw new Error("host is required");
    }
    const username = config.username || null;
    const password = config.password || null;
    const token = config.token || null;

    if ((username && !password) || (password && !username)) {
        throw new Error("you must include both `username` and `password`");
    }
    if (!username && !password && !token) {
        throw new Error(
            "you should include username and password or only token"
        );
    }
    const connectionConfig = { username, password, token };
    harpeeConnect.setConfig(connectionConfig);
}

module.exports = createConnection;
