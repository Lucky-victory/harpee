import { IHarpeeResponse } from "./../interfaces/harpee.interface";
import { IHarperDBCustomFunctionInfo, IHarperDBCustomFunctionPackage, IHarperDBExportS3Options, IHarperDBExportLocalOptions, IHarperDBAuth, IHarperDBTokenResponse, IHarperDBMessageResponse, IHarperDBAuthUser, IHarperDBNewUser, IHarperDBRoleOptions, IHarperDBNewRoleOptions, IHarpeeUtilOptions, IHarpeeNewTableOptions, IHarperDBSetCustomFunctionOptions, IHarpeeUtilNodeOptions, IHarperDBCustomFuntionStatus, IHarpeeAttributeOptions, IHarperDBInsertUpdateOptions, IHarperDBDeleteOptions } from "../interfaces/harpee-utilities.interface";
import { HarpeeHttp } from "./harpee-http";
import { HarpeeResponseCallback } from "../interfaces/harpee.interface";
import { IHarperDBCustomFunctionOptions, IHarperDBClusterConfiguration } from "../interfaces/harpee-utilities.interface";
import { IHarperDBDeleteResponse, IHarperDBInsertResponse, IHarperDBUpdateResponse } from "../interfaces/harpee-model.interface";
/**
 * A class for handling, configurations, creating/refreshing Authentication Tokens, etc
 */
export declare class HarpeeUtilities extends HarpeeHttp {
    constructor();
    /**
     * Execute custom SQL queries.
     *
     */
    query<T = object[]>(sqlQuery: string): Promise<IHarpeeResponse<T>>;
    query<T = object[]>(sqlQuery: string, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the definitions of all schemas and tables within the database.

    */
    describeAll<T = object>(): Promise<IHarpeeResponse<T>>;
    describeAll<T = object>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    * Create a new database schema.

    */
    createSchema<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilOptions, "schema">): Promise<IHarpeeResponse<T>>;
    createSchema<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilOptions, "schema">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Drop an existing database schema. **NOTE: Dropping a schema will delete all tables and all of their records in that schema.**
     */
    dropSchema<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilOptions, "schema">): Promise<IHarpeeResponse<T>>;
    dropSchema<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilOptions, "schema">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the definitions of all tables within the specified schema

    */
    describeSchema<T = object>(options: Pick<IHarpeeUtilOptions, "schema">): Promise<IHarpeeResponse<T>>;
    describeSchema<T = object>(options: Pick<IHarpeeUtilOptions, "schema">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    * Create a new database table within the specified schema

    */
    createTable<T = IHarperDBMessageResponse>(options: IHarpeeNewTableOptions): Promise<IHarpeeResponse<T>>;
    createTable<T = IHarperDBMessageResponse>(options: IHarpeeNewTableOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    insert<T = IHarperDBInsertResponse>(options: IHarperDBInsertUpdateOptions): Promise<IHarpeeResponse<T>>;
    insert<T = IHarperDBInsertResponse>(options: IHarperDBInsertUpdateOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    upsert<T = IHarperDBInsertResponse>(options: IHarperDBInsertUpdateOptions): Promise<IHarpeeResponse<T>>;
    upsert<T = IHarperDBInsertResponse>(options: IHarperDBInsertUpdateOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Note:  **Each record in the records array must include their ID**
     * @param options
     */
    update<T = IHarperDBUpdateResponse>(options: IHarperDBInsertUpdateOptions): Promise<IHarpeeResponse<T>>;
    update<T = IHarperDBUpdateResponse>(options: IHarperDBInsertUpdateOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     *
     * @param options
     */
    delete<T = IHarperDBDeleteResponse>(options: IHarperDBDeleteOptions): Promise<IHarpeeResponse<T>>;
    delete<T = IHarperDBDeleteResponse>(options: IHarperDBDeleteOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    * Create a new attribute  within the specified table

    */
    createAttribute<T = IHarperDBInsertResponse>(options: IHarpeeAttributeOptions): Promise<IHarpeeResponse<T>>;
    createAttribute<T = IHarperDBInsertResponse>(options: IHarpeeAttributeOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    * Drop an attribute from the specified table, **NOTE: Dropping an attribute will delete all associated attribute values in that table**

    */
    dropAttribute<T = IHarperDBMessageResponse>(options: IHarpeeAttributeOptions): Promise<IHarpeeResponse<T>>;
    dropAttribute<T = IHarperDBMessageResponse>(options: IHarpeeAttributeOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    * Returns the definition of the specified table

    */
    describeTable<T = object>(options: IHarpeeUtilOptions): Promise<IHarpeeResponse<T>>;
    describeTable<T = object>(options: IHarpeeUtilOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Drop an existing database table
     */
    dropTable<T = IHarperDBMessageResponse>(options: IHarpeeUtilOptions): Promise<IHarpeeResponse<T>>;
    dropTable<T = IHarperDBMessageResponse>(options: IHarpeeUtilOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     *  Creates a new role with specified permissions

     */
    addRole<T = object>(options: IHarperDBNewRoleOptions): Promise<IHarpeeResponse<T>>;
    addRole<T = object>(options: IHarperDBNewRoleOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    *Modifies an existing role with specified permissions.

    */
    alterRole<T = object>(options: IHarperDBRoleOptions): Promise<IHarpeeResponse<T>>;
    alterRole<T = object>(options: IHarperDBRoleOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    *  Deletes an existing from the database.

    */
    dropRole<T = IHarperDBMessageResponse>(options: Pick<IHarperDBRoleOptions, "id">): Promise<IHarpeeResponse<T>>;
    dropRole<T = IHarperDBMessageResponse>(options: Pick<IHarperDBRoleOptions, "id">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Creates a new user with the specified roles and credentials

    */
    addUser<T = IHarperDBMessageResponse>(options: IHarperDBNewUser): Promise<IHarpeeResponse<T>>;
    addUser<T = IHarperDBMessageResponse>(options: IHarperDBNewUser, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Modifies an existing user role and/or credentials
     */
    alterUser<T = object>(options: IHarperDBAuthUser): Promise<IHarpeeResponse<T>>;
    alterUser<T = object>(options: IHarperDBAuthUser, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Deletes an existing user by username

    */
    dropUser<T = IHarperDBMessageResponse>(options: Pick<IHarperDBAuth, "username">): Promise<IHarpeeResponse<T>>;
    dropUser<T = IHarperDBMessageResponse>(options: Pick<IHarperDBAuth, "username">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns a list of all users
     */
    listUsers<T = object[]>(): Promise<IHarpeeResponse<T>>;
    listUsers<T = object[]>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     Returns a list of all roles
    */
    listRoles<T = object[]>(): Promise<IHarpeeResponse<T>>;
    listRoles<T = object[]>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Creates the tokens needed for authentication: operation & refresh token. **Note, this operation does not require authorization to be set**.
     **/
    createAuthenticationTokens<T = IHarperDBTokenResponse>(options: IHarperDBAuth): Promise<IHarpeeResponse<T>>;
    createAuthenticationTokens<T = IHarperDBTokenResponse>(options: IHarperDBAuth, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Creates a new operation token.
     **/
    refreshOperationToken<T = Pick<IHarperDBTokenResponse, "operation_token">>(options: {
        refreshToken: string;
    }): Promise<IHarpeeResponse<T>>;
    refreshOperationToken<T = Pick<IHarperDBTokenResponse, "operation_token">>(options: {
        refreshToken: string;
    }, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Exports data based on a given search operation from table to local file in JSON or CSV format **Note: this only works for local instances, not for cloud instances.**
     */
    exportLocal<T = IHarperDBMessageResponse>(options: IHarperDBExportLocalOptions): Promise<IHarpeeResponse<T>>;
    exportLocal<T = IHarperDBMessageResponse>(options: IHarperDBExportLocalOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
    * Exports data based on a given search operation from table to AWS S3 in JSON or CSV format.


    */
    exportToS3<T = IHarperDBMessageResponse>(options: IHarperDBExportS3Options): Promise<IHarpeeResponse<T>>;
    exportToS3<T = IHarperDBMessageResponse>(options: IHarperDBExportS3Options, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
       Takes the output of package_custom_function_project, decrypts the base64-encoded string, reconstitutes the .tar file of your project folder, and extracts it to the Custom Functions root project directory.
     */
    deployCustomFunctionProject<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionPackage): Promise<IHarpeeResponse<T>>;
    deployCustomFunctionProject<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionPackage, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Creates a new project folder in the Custom Functions root project directory. It also inserts into the new directory the contents of our Custom Functions Project template, which is available publicly, here: https://github.com/HarperDB/harperdb-custom-functions-template.
  
    */
    addCustomFunctionProject<T = IHarperDBMessageResponse>(options: Pick<IHarperDBCustomFunctionOptions, "project">): Promise<IHarpeeResponse<T>>;
    addCustomFunctionProject<T = IHarperDBMessageResponse>(options: Pick<IHarperDBCustomFunctionOptions, "project">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Deletes the specified project folder and all of its contents.
     */
    dropCustomFunctionProject<T = IHarperDBMessageResponse>(options: Pick<IHarperDBCustomFunctionOptions, "project">): Promise<IHarpeeResponse<T>>;
    dropCustomFunctionProject<T = IHarperDBMessageResponse>(options: Pick<IHarperDBCustomFunctionOptions, "project">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Creates a .tar file of the specified project folder, then reads it into a base64-encoded string and returns that string the the user.
     */
    packageCustomFunctionProject<T = IHarperDBCustomFunctionPackage>(options: Pick<IHarperDBCustomFunctionPackage, "project">): Promise<IHarpeeResponse<T>>;
    packageCustomFunctionProject<T = IHarperDBCustomFunctionPackage>(options: Pick<IHarperDBCustomFunctionPackage, "project">, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the content of the specified file as text. HarperDB Studio uses this call to render the file content in its built-in code editor.
     */
    getCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionOptions): Promise<IHarpeeResponse<T>>;
    getCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     *Deletes the specified file.
     */
    dropCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionOptions): Promise<IHarpeeResponse<T>>;
    dropCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Updates the content of the specified file. HarperDB Studio uses this call to save any changes made through its built-in code editor.
     */
    setCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBSetCustomFunctionOptions): Promise<IHarpeeResponse<T>>;
    setCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBSetCustomFunctionOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns an array of projects within the Custom Functions root project directory. Each project has details including each of the files in the routes and helpers directories, and the total file count in the static folder.
    
    */
    getCustomFunctions<T = {
        [key: string]: IHarperDBCustomFunctionInfo;
    }>(): Promise<IHarpeeResponse<T>>;
    getCustomFunctions<T = {
        [key: string]: IHarperDBCustomFunctionInfo;
    }>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     *Returns the state of the Custom functions server. This includes whether it is enabled, upon which port it is listening, and where its root project directory is located on the host machine.
     *
     */
    customFunctionStatus<T = IHarperDBCustomFuntionStatus>(): Promise<IHarpeeResponse<T>>;
    customFunctionStatus<T = IHarperDBCustomFuntionStatus>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns detailed metrics on the host system. A deeper dive into the return object can be found here: https://systeminformation.io/general.html.
     */
    systemInformation<T = object>(attributes?: [
        "system",
        "time",
        "cpu",
        "memory",
        "disk",
        "network",
        "harperdb_processes"
    ]): Promise<IHarpeeResponse<T>>;
    systemInformation<T = object>(attributes: [
        "system",
        "time",
        "cpu",
        "memory",
        "disk",
        "network",
        "harperdb_processes"
    ], callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the status of a cluster relative to the instance where the operation is executed. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    clusterStatus<T = object>(): Promise<IHarpeeResponse<T>>;
    clusterStatus<T = object>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the HarperDB configuration parameters. Read more about the configuration file here: https://harperdb.io/docs/reference/configuration-file/.
     */
    getConfiguation<T = IHarperDBClusterConfiguration>(): Promise<IHarpeeResponse<T>>;
    getConfiguation<T = IHarperDBClusterConfiguration>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Modifies the HarperDB configuration file parameters. Read more about HarperDB configuration here: https://harperdb.io/docs/reference/configuration-file/.
     */
    configureCluster<T = IHarperDBMessageResponse>(options?: IHarperDBClusterConfiguration): Promise<IHarpeeResponse<T>>;
    configureCluster<T = IHarperDBMessageResponse>(options: IHarperDBClusterConfiguration, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Restarts the HarperDB instance.
     */
    restart<T = IHarperDBMessageResponse>(): Promise<IHarpeeResponse<T>>;
    restart<T = IHarperDBMessageResponse>(callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Sending this operation restarts the specified HarperDB service.

    */
    restartService<T = IHarperDBMessageResponse>(options: {
        /** the name of the service you would like to restart. Currently, this is limited to 'custom_functions'*/
        service: "custom_functions";
    }): Promise<IHarpeeResponse<T>>;
    restartService<T = IHarperDBMessageResponse>(options: {
        /** the name of the service you would like to restart. Currently, this is limited to 'custom_functions'*/
        service: "custom_functions";
    }, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Registers an additional HarperDB instance with associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    addNode<T = IHarperDBMessageResponse>(options: IHarpeeUtilNodeOptions): Promise<IHarpeeResponse<T>>;
    addNode<T = IHarperDBMessageResponse>(options: IHarpeeUtilNodeOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Modifies an existing HarperDB instance registration and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    updateNode<T = IHarperDBMessageResponse>(options: IHarpeeUtilNodeOptions): Promise<IHarpeeResponse<T>>;
    updateNode<T = IHarperDBMessageResponse>(options: IHarpeeUtilNodeOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Unregisters a HarperDB instance and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.
     */
    removeNode<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilNodeOptions, "name">): Promise<IHarpeeResponse<T>>;
    removeNode<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilNodeOptions, "name">, callback: HarpeeResponseCallback<T>): Promise<void>;
}
