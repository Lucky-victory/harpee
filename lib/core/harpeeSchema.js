const util = require("../helpers/util");

/** 
 * @typedef {Object} HarpeeSchema
 * @property {string} [name="defaultSchema"]
 * @property {string} [primaryKey="id"]
 * @property {Object} fields
 * @property {boolean} [silent=false]
 *  
 */


class HarpeeSchema{
   /** 
 * Let's you specify your schema name, also configure your table's column names and types.
 *
 * @param {Object} schemaConfig 
 * @param {string } [schemaConfig.name="defaultShema"] - the name of your schema, default is 'defaultSchema'.
 * @param {string } [schemaConfig.primaryKey="id"] - a primary key for your tables an alias for hash_attribute, default is 'id'.
 * @param {boolean } [schemaConfig.silent=false] .
 * @param {Object} schemaConfig.fields - specify the table column name and types.
* @returns HarpeeSchema
 */

   
constructor(schemaConfig) {
    if (!util.isObject(schemaConfig)) {
   throw new TypeError("`schemaConfig` must be an object");
    }
    if (!(schemaConfig.fields || util.isObject(schemaConfig.fields))) {
      throw new Error(
            " schemaConfig `fields` is required and must be an object"
        );
    }
    const schemaName = schemaConfig.name || "defaultSchema";
    const primaryKey = schemaConfig.primaryKey || "id";
    const silent = schemaConfig.silent || false;
    
   
    return {
        name: schemaName,
        fields: schemaConfig.fields,
        primaryKey,
        silent,
    };
}
}


module.exports=HarpeeSchema;
