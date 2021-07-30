/** function to Connect to your database.
 * @param {Object} options - An object that takes in `host`, `username`,`password`,`token`.
 * @param {string} options.host - your harperdb host url.
 * @param {string} options.username - your harperdb username.
 * @param {string} options.password - your harperdb password.
 * @param {string} [options.token] - your generated JWT token.
 * @return {void} - returns nothing.
 **/
function connect(options) {
  if (!U._isObj(options)) {
    throw new TypeError('connection options must be an Object');
  }
  if (!options.host) {
    throw new Error('host is required')
  }
  let auth;
  const USERNAME = options.username;
  const PASSWORD = options.password;
  const TOKEN = options.token;
  if (USERNAME && !PASSWORD || PASSWORD && !USERNAME) {
    throw new Error('you must include both username and password')
  }
  if (USERNAME && PASSWORD && TOKEN) {
    throw new Error('you can only use username and password or only token')
  }
  if (USERNAME && PASSWORD) {
    auth = Buffer.from(`${USERNAME}:${PASSWORD}`, 'utf-8').toString('base64');
  }
  else {
    auth = `${TOKEN}`;
  }
  axios.defaults.baseURL = `${options.host}`;
  axios.defaults.headers.common['Authorization'] = `Basic ${auth}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.method = 'post';

}
// module.exports=connect