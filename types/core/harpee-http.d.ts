import { HarpeeResponseCallback, IHarpeeConfig, IHarpeeResponse, IHarpeeSchemaConfig } from "../interfaces/harpee.interface";
export declare class HarpeeHttp {
    protected config: IHarpeeConfig;
    protected schemaConfig: IHarpeeSchemaConfig;
    constructor();
    private $requestHandler;
    protected $callbackOrPromise<T>(reqBody: any, callback?: HarpeeResponseCallback<T>, single?: boolean): Promise<IHarpeeResponse<T>> | undefined;
}
