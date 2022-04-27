export = HarpeeHttp;
declare class HarpeeHttp {
    constructor(config?: {});
    /**
     * @private
     */
    private config;
    /**
     *
     * @param {Object} reqBody
     * @param {function} callback
     * @protected
     */
    protected $requestHandler(reqBody: any, callback: Function): void;
    /**
     *
     * @param {Object} reqBody
     * @param {(err:any,result:({[key:string]:any}|{[key:string]:any}[]))=>void} [callback]
     * @param {boolean} [single=false]
     * @returns {(void|Promise<any>)}
     * @protected
     */
    protected $callbackOrPromise(reqBody: any, callback?: (err: any, result: {
        [key: string]: any;
    } | {
        [key: string]: any;
    }[]) => void, single?: boolean): (void | Promise<any>);
}
