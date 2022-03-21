import util from "../helpers/util";

const HarpeeSchema:HarpeeSchemaConstructor= class HarpeeSchema implements HarpeeSchemaStatic{
   /** 
 * Let's you specify your schema name, also configure your table's column names and types.
 * @param {string } [schemaConfig.name="defaultShema"] - the name of your schema, default is 'defaultSchema'.
 * @param {string } [schemaConfig.primaryKey="id"] - a primary key for your tables an alias for hash_attribute, default is 'id'.
 * @param {Fields} schemaConfig.fields - specify the table column name and types.
 */

   
constructor(schemaConfig:SchemaConfig) {
    if (!util.isObject(schemaConfig)) {
   throw new TypeError("`schemaConfig` must be an object");
    }
    if (!(schemaConfig.fields || util.isObject(schemaConfig.fields))) {
      throw new Error(
            " schemaConfig `fields` is required and must be an object"
        );
    }
   
    const schemaName:string = schemaConfig.name || "defaultSchema";
    const primaryKey:string = schemaConfig.primaryKey || "id";
    const silent:boolean = schemaConfig.silent || false;
    
   
    return {
        name: schemaName,
        fields: schemaConfig.fields,
        primaryKey,
        silent,
    };
}
}
export type Fields<T>=T & {[key:string]:any}
export interface SchemaConfig{
   name:string;
   primaryKey?:string;
   silent?:boolean;
   fields:Fields<{}>
}
interface HarpeeSchemaConstructor{
   new(schemaConfig:SchemaConfig):HarpeeSchemaStatic
}
export interface HarpeeSchemaStatic{

   
}


export default HarpeeSchema;
