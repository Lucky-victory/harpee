import { HarpeeResponseCallback, IHarpeeAuthConfig, IHarpeeResponse, IHarpeeSchemaConfig } from '../interfaces/harpee.interface';
export declare class HarpeeHttp {
    protected config: IHarpeeAuthConfig;
    protected schemaConfig: IHarpeeSchemaConfig;
    protected static _config: IHarpeeAuthConfig;
    static _schemaConfig: IHarpeeSchemaConfig;
    constructor();
    protected static set _setConfig(config: IHarpeeAuthConfig);
    protected static set _setSchemaConfig(schemaConfig: IHarpeeSchemaConfig);
    private $requestHandler;
    protected $callbackOrPromise<T>(reqBody: any, callback?: HarpeeResponseCallback<T>, single?: boolean): Promise<IHarpeeResponse<T>> | undefined;
}
