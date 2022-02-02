export default HarpeeHttp;
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
     * @param {function} [callback]
     * @param {boolean} [single=false]
     * @returns {(void|Promise<any>)}
     * @protected
     */
    protected $callbackOrPromise(reqBody: any, callback?: Function, single?: boolean): (void | Promise<any>);
}
//# sourceMappingURL=harpeeHttp.d.ts.map