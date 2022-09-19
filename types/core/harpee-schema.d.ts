import { IHarpeeSchemaConfig } from "../interfaces/harpee.interface";
/**
 * Let's you specify the schema name, also configure your table's column names.
 */
export declare class HarpeeSchema {
    private schemaName;
    private primaryKey;
    private silent;
    private fields;
    constructor(schemaConfig: IHarpeeSchemaConfig);
}
