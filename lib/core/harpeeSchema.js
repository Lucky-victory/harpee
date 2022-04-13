const util = require("../helpers/util");


class HarpeeSchema{
   /** 
 * Let's you specify your schema name, also configure your table's columns and types.
 *
 * @param {{name?:string,primaryKey?:string,fields:{[key:string]:any},silent?:boolean}} schemaConfig 
 * @param {string } [schemaConfig.name="defaultShema"] - the name of your schema, default is 'defaultSchema'.
 * @param {string } [schemaConfig.primaryKey="id"] - a primary key for your tables an alias for hash_attribute, default is 'id'.
 * @param {boolean } [schemaConfig.silent=true] .
 * @param {{[key:string]:any}} schemaConfig.fields - specify the table columns and types.
* 
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
    const silent = schemaConfig.silent || true;
    
   
    return {
        name: schemaName,
        fields: schemaConfig.fields,
        primaryKey,
        silent,
    };
}
}


module.exports=HarpeeSchema;
