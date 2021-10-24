const U = require("../helpers/utils");
const axios = require("axios");
/** Create a Connection to your database.
 * @param {object} options - An object that takes in `host`, `username`,`password` and `token`.
 * @param {string} options.host - your harperdb host url.
 * @param {string} options.username - your harperdb username.
 * @param {string} options.password - your harperdb password.
 * @param {string} [options.token] - your generated JWT token.
 * @return {void} .
 **/
function connect(options) {
  if (!U.isObject(options)) {
    throw new TypeError("connection options must be an Object");
  }
  if (!options.host) {
    throw new Error("host is required");
  }
  let auth;
  const USERNAME = options.username;
  const PASSWORD = options.password;
  const TOKEN = options.token;
  if ((USERNAME && !PASSWORD) || (PASSWORD && !USERNAME)) {
    throw new Error("you must include both username and password");
  }
  if (!USERNAME && !PASSWORD && !TOKEN) {
    throw new Error(
      "you can should include username and password or only token"
    );
  }
  if (USERNAME && PASSWORD) {
    auth =
      "Basic " +
      Buffer.from(`${USERNAME}:${PASSWORD}`, "utf-8").toString("base64");
  } else if (TOKEN) {
    auth = `Bearer ${TOKEN}`;
  }
  // @ts-ignore
  axios.defaults.baseURL = `${options.host}`;
  // @ts-ignore
  axios.defaults.headers.common["Authorization"] = auth;
  // @ts-ignore
  axios.defaults.headers.post["Content-Type"] = "application/json";
  // @ts-ignore
  axios.defaults.method = "post";
}
export default connect;
module.exports = connect;