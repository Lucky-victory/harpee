const U = require('../utils/helpers');
/** creates a schema .
 *
 * @param {Object} options - an object takes in `name` and `fields` .
 * @param {string } [options.name=defaultShema] - the name of your schema.
 * @param {string } [options.primary_key=id] - a primary key for your table.
 * @param {object} options.fields - an object to specify the table columns.
 * @returns {object} - returns an object.
 * */
function Schema(options) {
  if (!U._isObj(options)) {
    throw new TypeError('Schema options must be an object');
  }
  if (!options.fields) {
    throw new Error('fields are required');
  }
  const SCHEMA_NAME = options && options.name ? options.name : 'defaultSchema';
  const PRIMARY_KEY=options.primary_key ? options.primary_key : 'id';
  return {
    name: SCHEMA_NAME,
    fields: options.fields,
    primary_key:PRIMARY_KEY
  };
}

module.exports = Schema;
