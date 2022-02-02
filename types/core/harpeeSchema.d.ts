export default HarpeeSchema;
export type HarpeeSchemaObject = {
    name?: string;
    primaryKey?: string;
    fields: any;
    silent?: boolean;
};
/**
 * @typedef {Object} HarpeeSchemaObject
 * @property {string} [name=defaultSchema]
 * @property {string} [primaryKey=id]
 * @property {Object} fields
 * @property {boolean} [silent=false]
 *
 */
/**
 * @returns {HarpeeSchemaObject}
 *
 */
declare class HarpeeSchema {
    /**
  * Let's you specify your schema name, also configure your table's column names and types.
  *
  * @param {Object} schemaConfig
  * @param {string } [schemaConfig.name="defaultShema"] - the name of your schema, default is 'defaultSchema'.
  * @param {string } [schemaConfig.primaryKey="id"] - a primary key for your tables an alias for hash_attribute, default is 'id'.
  * @param {boolean } [schemaConfig.silent=false] .
  * @param {Object} schemaConfig.fields - specify the table column name and types.
 
  */
    constructor(schemaConfig: {
        name?: string;
        primaryKey?: string;
        silent?: boolean;
        fields: any;
    });
}
//# sourceMappingURL=harpeeSchema.d.ts.map