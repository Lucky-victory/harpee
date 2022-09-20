import { IHarpeeConfig, IHarpeeSchemaConfig } from "../interfaces/harpee.interface";
export declare class HarpeeConfig {
    private static _authConfig;
    private static _schemaConfig;
    static get authConfig(): IHarpeeConfig;
    static set authConfig(config: IHarpeeConfig);
    static get schemaConfig(): IHarpeeSchemaConfig;
    static set schemaConfig(schemaConfig: IHarpeeSchemaConfig);
}
