const Utils = require('../helpers/utils');
/** creates a schema .
 *
 * @param {Object} options - an object takes in `name` and `fields` .
 * @param {string } [options.name=defaultShema] - the name of your schema.
 * @param {string } [options.primary_key=id] - a primary key for your tables.
 * @param {boolean } [options.silent=false] - turns on/off error throwing is `options.fields` values doesn't match `model.create` values .
 * @param {object} options.fields - an object to specify the table columns.
 * @returns {object} - returns an object.
 * */
function Schema(options) {
  if (!Utils.isObject(options)) {
    throw new TypeError('Schema `options` must be an object');
  }
  if (!(options.fields || Utils.isObject(options.fields))) {
    throw new Error('fields are required and must be an object');
  }
  const SCHEMA_NAME = options.name ? options.name : 'defaultSchema';
  const PRIMARY_KEY=options.primary_key ? options.primary_key : 'id';
  const silent=options.silent ? options.silent : false;
  return {
    name: SCHEMA_NAME,
    fields: options.fields,
    primary_key:PRIMARY_KEY,
    silent
  };
}

module.exports = Schema;
