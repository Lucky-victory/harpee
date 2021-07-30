/** creates a schema .
 *
 * @param {Object} options - an object takes in `name` and `fields` .
 * @param {string } [options.name=defaultShema] - the name of your schema.
 * @param {Object} options.fields - an object to specify the table columns. 
 * @returns {Object} - returns an object.
 **/
function Schema(options) {
  if (!U._isObj(options)) {
    throw new TypeError('Schema options must be an object');
  }
  if (!options.fields) {
    throw new Error('fields are required')
  }
  const SCHEMA_NAME = options && options.name ? options.name : options.name = 'defaultSchema';
  return {
    name: SCHEMA_NAME,
    fields: options.fields
  }
}

//module.exports=Schema;