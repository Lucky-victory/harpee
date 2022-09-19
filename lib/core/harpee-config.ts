import {
    IHarpeeConfig,
    IHarpeeSchemaConfig,
} from "../interfaces/harpee.interface";

export class HarpeeConfig {
    private static _authConfig: IHarpeeConfig;
    private static _schemaConfig: IHarpeeSchemaConfig;

    static get authConfig() {
        return this._authConfig;
    }
    static set authConfig(config: IHarpeeConfig) {
        this._authConfig = config;
    }
    static get schemaConfig() {
        return this._schemaConfig;
    }
    static set schemaConfig(schemaConfig: IHarpeeSchemaConfig) {
        this._schemaConfig = schemaConfig;
    }
}
