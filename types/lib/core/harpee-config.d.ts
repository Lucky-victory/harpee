import { IHarpeeAuthConfig, IHarpeeSchemaConfig } from '../interfaces/harpee.interface';
export declare class HarpeeConfig {
    private static _authConfig;
    private static _schemaConfig;
    static get authConfig(): IHarpeeAuthConfig;
    static set authConfig(config: IHarpeeAuthConfig);
    static get schemaConfig(): IHarpeeSchemaConfig;
    static set schemaConfig(schemaConfig: IHarpeeSchemaConfig);
}
