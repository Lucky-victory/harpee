const util = require("../helpers/util");

/**
 * @typedef {{name?:string,primaryKey?:string,fields:{[key:string]:any},silent?:boolean}} HarpeeSchemaConfig
 * 
 */
class HarpeeSchema{
   /** 
 * Let's you specify your schema name, also configure your table's columns and types.
 *
 * @param {HarpeeSchemaConfig} schemaConfig 
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
