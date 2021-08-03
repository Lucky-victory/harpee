const connect = require('./src/connect');
const Schema = require('./src/Schema');
const model = require('./src/model');

/** harpee object
 * @type {Object} harpee
 * @property {function} harpee.connect
 * @property {function} harpee.model
 * @property {function} harpee.Schema
 */
const harpee = {
  model,
  connect,
  Schema
}
module.exports=harpee;