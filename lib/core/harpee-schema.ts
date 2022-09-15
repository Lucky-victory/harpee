import Harpee from ".";
import Utils from "../helpers/utils";
import { IHarpeeSchemaConfig } from "../interfaces/harpee";

export default class HarpeeSchema extends Harpee {
    /**
     * Let's you specify the schema name, also configure your table's column names.
     */
    private schemaName: string;
    private primaryKey: string;
    private silent: boolean;
    private fields: IHarpeeSchemaConfig["fields"];
    constructor(schemaConfig: IHarpeeSchemaConfig) {
        super();
        if (!Utils.isObject(schemaConfig)) {
            throw new TypeError("`schemaConfig` must be an object");
        }
        if (!(schemaConfig.fields || Utils.isObject(schemaConfig.fields))) {
            throw new TypeError(
                " schemaConfig `fields` is required and must be an object"
            );
        }
        this.schemaName = schemaConfig.name || "defaultSchema";
        this.primaryKey = schemaConfig.primaryKey || "id";
        this.silent = schemaConfig.silent || true;
        this.fields = schemaConfig.fields;
    }
    get schema(): IHarpeeSchemaConfig {
        return {
            name: this.schemaName,
            fields: this.fields,
            primaryKey: this.primaryKey,
            silent: this.silent,
        };
    }
}
