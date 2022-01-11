const HarpeeModel = require("./core/harpeeModel");
/** creates an instance that allows you to perform operations on a specific table, each model represents a table
 * @constructor Model
 * @param {string} modelName - a table name
 * @param {import("./core/harpeeModel").HarpeeSchemaObject} schemaObject - an object returned from {@link Schema} function
 *
 */
const Model = HarpeeModel;
module.exports = Model;
