const Util = require("../helpers/utils");
/** @typedef {Object} HarpeeSchemaObject
 * @property {string} [name=defaultSchema]
 * @property {string} [primaryKey=id]
 * @property {Object} fields
 * @property {boolean} [silent=false]
 *  */

/** Creates a schema .
 *
 * @param {Object} schemaConfig - an object that takes in `name`, `fields`,`primaryKey` and `silent`.
 * @param {string } [schemaConfig.name="defaultShema"] - the name of your schema.
 * @param {string } [schemaConfig.primaryKey="id"] - a primary key for your tables an alias for hash_attribute.
 * @param {boolean } [schemaConfig.silent=false] - turns on/off error throwing if `options.fields` values doesn't match `model.create` values .
 * @param {object} schemaConfig.fields - an object to specify the table columns.
 * @returns {HarpeeSchemaObject} - an object to be passed as a second argument to {@link Model}
 * */
function Schema(schemaConfig) {
    if (!Util.isObject(schemaConfig)) {
        throw new TypeError("`schemaConfig` must be an object");
    }
    if (!(schemaConfig.fields || Util.isObject(schemaConfig.fields))) {
        throw new Error(
            " schemaConfig `fields` is required and must be an object"
        );
    }
    const schema_name = schemaConfig.name ? schemaConfig.name : "defaultSchema";
    const primaryKey = schemaConfig.primaryKey ? schemaConfig.primaryKey : "id";
    const silent = schemaConfig.silent ? schemaConfig.silent : false;
    return {
        name: schema_name,
        fields: schemaConfig.fields,
        primaryKey,
        silent,
    };
}

module.exports = Schema;
