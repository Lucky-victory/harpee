import { IHarpeeSchemaConfig } from "../interfaces/harpee.interface";
export declare class HarpeeSchema {
    /**
     * Let's you specify the schema name, also configure your table's column names.
     */
    private schemaName;
    private primaryKey;
    private silent;
    private fields;
    constructor(schemaConfig: IHarpeeSchemaConfig);
}
