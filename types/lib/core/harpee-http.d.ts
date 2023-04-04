import { HarpeeResponseCallback, IHarpeeAuthConfig, IHarpeeResponse, IHarpeeSchemaConfig } from '../interfaces/harpee.interface';
export declare class HarpeeHttp {
    protected config: IHarpeeAuthConfig;
    protected schemaConfig: IHarpeeSchemaConfig;
    constructor();
    private $requestHandler;
    protected $callbackOrPromise<T>(reqBody: any, callback?: HarpeeResponseCallback<T>, single?: boolean): Promise<IHarpeeResponse<T>> | undefined;
}
