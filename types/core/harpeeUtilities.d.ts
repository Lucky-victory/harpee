export default HarpeeUtilities;
export type responseCallback = (err: any, result: any) => any;
/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error
 * @param {*} result - response data or null if an error occurs
 *
 */
declare class HarpeeUtilities extends HarpeeHttp {
    constructor();
    /**
     * @private
     */
    private modelSchemaConfig;
    /**
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    describeAll(callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.schema
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    createSchema(options: {
        schema: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.schema
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    dropSchema(options: {
        schema: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.schema
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    describeSchema(options: {
        schema: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.schema
     * @param {string} options.table
     * @param {string} [options.hashAttribute]
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    createTable(options: {
        schema: string;
        table: string;
        hashAttribute?: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.schema
     * @param {string} options.table
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    describeTable(options: {
        schema: string;
        table: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.schema
     * @param {string} options.table
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    dropTable(options: {
        schema: string;
        table: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
      * @param {Object} options
      * @param {Object} options.permission
      * @param {string} options.role
      * @param {responseCallback} [callback]
      * @returns {(Promise<any> | void)}
 
      */
    addRole(options: {
        permission: any;
        role: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {Object} options.permission
     * @param {string} options.id
     * @param {string} options.role
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    alterRole(options: {
        permission: any;
        id: string;
        role: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.username
     * @param {string} options.password
     * @param {string} options.role
     * @param {boolean} [options.active]
     *
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    addUser(options: {
        username: string;
        password: string;
        role: string;
        active?: boolean;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.username
     * @param {string} options.password
     * @param {string} options.role
     * @param {boolean} [options.active]
     *
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    alterUser(options: {
        username: string;
        password: string;
        role: string;
        active?: boolean;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.username
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    dropUser(options: {
        username: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    listUsers(callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    listRoles(callback?: responseCallback): (Promise<any> | void);
    /**
     * Creates the tokens needed for authentication: operation & refresh token. **Note, this operation does not require authorization to be set**.
     * @param {Object} options
     * @param {string} options.username - username of user to generate tokens for.
     * @param {string} options.password - password of user to generate tokens for.
     * @param {responseCallback} [callback] - an optional callbac `Promise` is returned;
     * @returns {(void| Promise<any>)}
 
     **/
    createAuthenticationTokens(options: {
        username: string;
        password: string;
    }, callback?: responseCallback): (void | Promise<any>);
    /**
     * This operation creates a new operation token.
     * @param {Object} options
     * @param {string} options.refreshToken -
     * @param {responseCallback} [callback]
     * @returns {(void | Promise<any>)}
 
     **/
    refreshOperationToken(options: {
        refreshToken: string;
    }, callback?: responseCallback): (void | Promise<any>);
    /**
     * Exports data based on a given search operation from table to local file in JSON or CSV format.
     * @param {Object} options
     * @param {Object} options.searchOperation - searchOperation of search_by_hash, search_by_value or sql.
     * @param {string} options.path - an absolute path where the file should be stored.
     * @param {string} options.format - the format you want your data to be exported, 'json' or 'csv'.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    exportLocal(options: {
        searchOperation: any;
        path: string;
        format: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * Exports data based on a given search operation from table to AWS S3 in JSON or CSV format.
     * @param {Object} options
     * @param {Object} options.searchOperation - searchOperation of search_by_hash, search_by_value or sql.
     * @param {string} options.format - the format you want your data to be exported, 'json' or 'csv'.
     * @param {string} options.key - the name to be given to the exported file.
     * @param {string} options.bucket - the name of your S3 bucket.
     * @param {string} options.awsAccessKeyId - your aws_access_key_id.
     * @param {string} options.awsAccessSecretKey - your aws_access_secret_key.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    exportToS3(options: {
        searchOperation: any;
        format: string;
        key: string;
        bucket: string;
        awsAccessKeyId: string;
        awsAccessSecretKey: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.project -
     * @param {string} options.file -
     * @param {string} options.payload -
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
     */
    deployCustomFunctionProject(options: {
        project: string;
        file: string;
        payload: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.project -
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    addCustomFunctionProject(options: {
        project: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.project -
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    dropCustomFunctionProject(options: {
        project: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.project -
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    packageCustomFunctionProject(options: {
        project: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.project -
     * @param {string} options.file -
     * @param {('helpers'|'routes')} options.type -
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    getCustomFunction(options: {
        project: string;
        file: string;
        type: ('helpers' | 'routes');
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.project -
     * @param {string} options.file -
     * @param {('helpers'|'routes')} options.type -
     * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}
 
     */
    dropCustomFunction(options: {
        project: string;
        file: string;
        type: ('helpers' | 'routes');
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    getCustomFunctions(callback?: responseCallback): (Promise<any> | void);
    /**
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    systemInformation(callback?: responseCallback): (Promise<any> | void);
    /**
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    clusterStatus(callback?: responseCallback): (Promise<any> | void);
    /**
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    getConfiguation(callback?: responseCallback): (Promise<any> | void);
    /**
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    restart(callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {'custom_functions'} options.service;
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    restartService(options: {
        service: 'custom_functions';
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.name
     * @param {string} options.host
     * @param {number} options.port
     * @param {Array<object>} options.subscriptions
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    addNode(options: {
        name: string;
        host: string;
        port: number;
        subscriptions: Array<object>;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.name
     * @param {string} options.host
     * @param {number} options.port
     * @param {Array<object>} options.subscriptions
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    updateNode(options: {
        name: string;
        host: string;
        port: number;
        subscriptions: Array<object>;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * @param {Object} options
     * @param {string} options.name
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    removeNode(options: {
        name: string;
    }, callback?: responseCallback): (Promise<any> | void);
}
import HarpeeHttp from "./harpeeHttp";
//# sourceMappingURL=harpeeUtilities.d.ts.map