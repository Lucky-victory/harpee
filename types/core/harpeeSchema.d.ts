export = HarpeeSchema;
/**
 * @typedef {{name?:string,primaryKey?:string,fields:{[key:string]:any},silent?:boolean}} HarpeeSchemaConfig
 *
 */
declare class HarpeeSchema {
    /**
  * Let's you specify your schema name, also configure your table's columns and types.
  *
  * @param {HarpeeSchemaConfig} schemaConfig
  */
    constructor(schemaConfig: HarpeeSchemaConfig);
}
declare namespace HarpeeSchema {
    export { HarpeeSchemaConfig };
}
type HarpeeSchemaConfig = {
    name?: string;
    primaryKey?: string;
    fields: {
        [key: string]: any;
    };
    silent?: boolean;
};
