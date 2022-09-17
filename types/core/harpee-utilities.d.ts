import { IHarperDBCustomFunctionInfo, IHarperDBCustomFunctionPackage, IHarperDBExportS3Options, IHarperDBExportLocalOptions, IHarperDBAuth, IHarperDBTokenResponse, IHarperDBMessageResponse, IHarperDBAuthUser, IHarperDBNewUser, IHarperDBRoleOptions, IHarperDBNewRoleOptions, IHarpeeUtilOptions, IHarpeeNewTableOptions, IHarperDBSetCustomFunctionOptions, IHarpeeUtilNodeOptions, IHarperDBCustomFuntionStatus, IHarpeeAttributeOptions } from "./../interfaces/harpee-utilities.interface";
import { HarpeeHttp } from "./harpee-http";
import { HarpeeResponseCallback, IHarpeeResponse } from "../interfaces/harpee.interface";
import { IHarperDBCustomFunctionOptions, IHarperDBClusterConfiguration } from "../interfaces/harpee-utilities.interface";
import { IHarperDBInsertResponse } from "../interfaces/harpee-model.interface";
export declare class HarpeeUtilities extends HarpeeHttp {
    constructor();
    /**
     * Returns the definitions of all schemas and tables within the database.

    */
    describeAll<T = object>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Create a new database schema.

    */
    createSchema<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilOptions, "schema">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Drop an existing database schema. **NOTE: Dropping a schema will delete all tables and all of their records in that schema.**
     */
    dropSchema<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilOptions, "schema">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Returns the definitions of all tables within the specified schema

    */
    describeSchema<T = object>(options: Pick<IHarpeeUtilOptions, "schema">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Create a new database table within the specified schema

    */
    createTable<T = IHarperDBMessageResponse>(options: IHarpeeNewTableOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Create a new attribute  within the specified table

    */
    createAttribute<T = IHarperDBInsertResponse>(options: IHarpeeAttributeOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Drop an attribute from the specified table, **NOTE: Dropping an attribute will delete all associated attribute values in that table**

    */
    dropAttribute<T = IHarperDBMessageResponse>(options: IHarpeeAttributeOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Returns the definition of the specified table

    */
    describeTable<T = object>(options: IHarpeeUtilOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Drop an existing database table
     */
    dropTable<T = IHarperDBMessageResponse>(options: IHarpeeUtilOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     *  Creates a new role with specified permissions

     */
    addRole<T = object>(options: IHarperDBNewRoleOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    *Modifies an existing role with specified permissions.

    */
    alterRole<T = object>(options: IHarperDBRoleOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    *  Deletes an existing from the database.

    */
    dropRole<T = IHarperDBMessageResponse>(options: Pick<IHarperDBRoleOptions, "id">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Creates a new user with the specified roles and credentials

    */
    addUser<T = IHarperDBMessageResponse>(options: IHarperDBNewUser, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Modifies an existing user role and/or credentials
     */
    alterUser<T = object>(options: IHarperDBAuthUser, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Deletes an existing user by username

    */
    dropUser<T = IHarperDBMessageResponse>(options: Pick<IHarperDBAuth, "username">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Returns a list of all users
     */
    listUsers<T = object[]>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     Returns a list of all roles
    */
    listRoles<T = object[]>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Creates the tokens needed for authentication: operation & refresh token. **Note, this operation does not require authorization to be set**.

    **/
    createAuthenticationTokens<T = IHarperDBTokenResponse>(options: IHarperDBAuth, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Creates a new operation token.
     **/
    refreshOperationToken<T = Pick<IHarperDBTokenResponse, "operation_token">>(options: {
        refreshToken: string;
    }, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Exports data based on a given search operation from table to local file in JSON or CSV format **Note: this only works for local instances, not for cloud instances.**
     */
    exportLocal<T = IHarperDBMessageResponse>(options: IHarperDBExportLocalOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Exports data based on a given search operation from table to AWS S3 in JSON or CSV format.


    */
    exportToS3<T = IHarperDBMessageResponse>(options: IHarperDBExportS3Options, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
       Takes the output of package_custom_function_project, decrypts the base64-encoded string, reconstitutes the .tar file of your project folder, and extracts it to the Custom Functions root project directory.
     */
    deployCustomFunctionProject<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionPackage, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Creates a new project folder in the Custom Functions root project directory. It also inserts into the new directory the contents of our Custom Functions Project template, which is available publicly, here: https://github.com/HarperDB/harperdb-custom-functions-template.
  
    */
    addCustomFunctionProject<T = IHarperDBMessageResponse>(options: Pick<IHarperDBCustomFunctionOptions, "project">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Deletes the specified project folder and all of its contents.
     */
    dropCustomFunctionProject<T = IHarperDBMessageResponse>(options: Pick<IHarperDBCustomFunctionOptions, "project">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Creates a .tar file of the specified project folder, then reads it into a base64-encoded string and returns that string the the user.
     */
    packageCustomFunctionProject<T = IHarperDBCustomFunctionPackage>(options: Pick<IHarperDBCustomFunctionPackage, "project">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Returns the content of the specified file as text. HarperDB Studio uses this call to render the file content in its built-in code editor.
     */
    getCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     *Deletes the specified file.
     */
    dropCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBCustomFunctionOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Updates the content of the specified file. HarperDB Studio uses this call to save any changes made through its built-in code editor.
     */
    setCustomFunction<T = IHarperDBMessageResponse>(options: IHarperDBSetCustomFunctionOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Returns an array of projects within the Custom Functions root project directory. Each project has details including each of the files in the routes and helpers directories, and the total file count in the static folder.
    
    */
    getCustomFunctions<T = {
        [key: string]: IHarperDBCustomFunctionInfo;
    }>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     *Returns the state of the Custom functions server. This includes whether it is enabled, upon which port it is listening, and where its root project directory is located on the host machine.
     *
     */
    customFunctionStatus<T = IHarperDBCustomFuntionStatus>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
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
    ], callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Returns the status of a cluster relative to the instance where the operation is executed. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    clusterStatus<T = object>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Returns the HarperDB configuration parameters. Read more about the configuration file here: https://harperdb.io/docs/reference/configuration-file/.
     */
    getConfiguation<T = IHarperDBClusterConfiguration>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Modifies the HarperDB configuration file parameters. Read more about HarperDB configuration here: https://harperdb.io/docs/reference/configuration-file/.
     */
    configureCluster<T = IHarperDBMessageResponse>(options?: IHarperDBClusterConfiguration, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Restarts the HarperDB instance.
     */
    restart<T = IHarperDBMessageResponse>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Sending this operation restarts the specified HarperDB service.

    */
    restartService<T = IHarperDBMessageResponse>(options: {
        /** the name of the service you would like to restart. Currently, this is limited to 'custom_functions'*/
        service: "custom_functions";
    }, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Registers an additional HarperDB instance with associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    addNode<T = IHarperDBMessageResponse>(options: IHarpeeUtilNodeOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Modifies an existing HarperDB instance registration and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    updateNode<T = IHarperDBMessageResponse>(options: IHarpeeUtilNodeOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Unregisters a HarperDB instance and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.
     */
    removeNode<T = IHarperDBMessageResponse>(options: Pick<IHarpeeUtilNodeOptions, "name">, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
}
