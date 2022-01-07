const Util = require("../helpers/utils");
const harpeeConnect = require("./core/harpeeConnect");

/** Create a Connection to your database.
 * @param {object} config - An object that takes in `host`, `username`,`password` and `token`.
 * @param {string} config.host - your harperdb host url.
 * @param {string} config.username - your harperdb username.
 * @param {string} config.password - your harperdb password.
 * @param {string} [config.token] - your generated JWT token.
 * @returns {void} .
 **/
function createConnection(config) {
  if (!Util.isObject(config)) {
    throw new TypeError("connection `config` must be an Object");
  }
  if (!config.host) {
    throw new Error("host is required");
  }
const USERNAME = config.username || null;
const PASSWORD = config.password || null;
const TOKEN = config.token || null;

  if ((USERNAME && !PASSWORD) || (PASSWORD && !USERNAME)) {
    throw new Error("you must include both `username` and `password`");
  }
  if (!USERNAME && !PASSWORD && !TOKEN) {
    throw new Error(
      "you should include username and password or only token"
    );
  }

  harpeeConnect.setConfig(config);

}

module.exports = createConnection;