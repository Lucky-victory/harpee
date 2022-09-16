import {
    IHarperDBCustomFunctionInfo,
    IHarperDBCustomFunctionPackage,
    IHarperDBExportS3Options,
    IHarperDBExportLocalOptions,
    IHarperDBAuth,
    IHarperDBTokenResponse,
    IHarperDBMessageResponse,
    IHarperDBAuthUser,
    IHarperDBNewUser,
    IHarperDBRoleOptions,
    IHarperDBNewRoleOptions,
    IHarpeeUtilOptions,
    IHarpeeNewTableOptions,
    IHarperDBSetCustomFunctionOptions,
    IHarpeeUtilNodeOptions,
    IHarperDBCustomFuntionStatus,
} from "./../interfaces/harpee-utilities.interface";

import HarpeeHttp from "./harpee-http";
import operations from "../constants/operations";
import Utils from "../helpers/utils";
import {
    HarpeeResponseCallback,
    IHarpeeResponse,
} from "../interfaces/harpee.interface";
import {} from "../interfaces/operations.interface";
import {
    IHarperDBCustomFunctionOptions,
    IHarperDBClusterConfiguration,
} from "../interfaces/harpee-utilities.interface";

/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error
 * @param {*} result - response data or null if an error occurs
 *
 */

export default class HarpeeUtilities extends HarpeeHttp {
    private modelSchemaConfig;
    constructor() {
        super();

        this.modelSchemaConfig = this.schemaConfig;
    }
    /**
     * Returns the definitions of all schemas and tables within the database.

    */

    async describeAll<T extends object>(callback?: HarpeeResponseCallback<T>) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DESCRIBE_ALL,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
    * Create a new database schema.

    */

    async createSchema<T extends IHarperDBMessageResponse>(
        options: IHarpeeUtilOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema } = options;
            if (!schema) {
                throw new Error("please provide a name for your schema");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.CREATE_SCHEMA,
                    schema,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Drop an existing database schema. **NOTE: Dropping a schema will delete all tables and all of their records in that schema.**
     */

    async dropSchema<T extends IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema } = options;

            if (!schema) {
                throw new Error("please provide the `schema` name");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DROP_SCHEMA,
                    schema,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Returns the definitions of all tables within the specified schema

    */

    async describeSchema<T extends object>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema } = options;

            if (!schema) {
                throw new Error("`schema` is required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DESCRIBE_SCHEMA,
                    schema,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
    * Create a new database table within the specified schema

    */

    async createTable<T extends IHarperDBMessageResponse>(
        options: IHarpeeNewTableOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema, table } = options;
            const hash_attribute = options.hashAttribute || "id";
            if (!(table || schema)) {
                throw new Error(" `table` and the `schema` are required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.CREATE_TABLE,
                    schema,
                    table,
                    hash_attribute,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
    * Returns the definition of the specified table

    */

    async describeTable<T extends object>(
        options: IHarpeeUtilOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema, table } = options;

            if (!(table || schema)) {
                throw new Error("please provide the `table` and `schema` name");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DESCRIBE_TABLE,
                    schema,
                    table,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Drop an existing database table
     */

    async dropTable<T extends IHarperDBMessageResponse>(
        options: IHarpeeUtilOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema, table } = options;

            if (!(table || schema)) {
                throw new Error(" `table` and `schema` are required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DROP_TABLE,
                    schema,
                    table,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     *  Creates a new role with specified permissions

     */

    async addRole<T extends object>(
        options: IHarperDBNewRoleOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<IHarpeeResponse<T> | undefined> {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }
            const { permission, role } = options;

            if (!(role || permission)) {
                throw new Error("`role` and `permission` are required");
            }
            if (!Utils.isObject(permission)) {
                throw new Error("`permission` must be an object");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.ADD_ROLE,
                    role,
                    permission,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
    *Modifies an existing role with specified permissions.

    */

    async alterRole<T extends object>(
        options: IHarperDBRoleOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<IHarpeeResponse<T> | undefined> {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }

            const { role, permission, id } = options;
            if (!(permission || id)) {
                throw new Error("`role` , `permission` and `id` are required");
            }
            if (!Utils.isObject(permission)) {
                throw new Error("`permission` must be an object");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.ALTER_ROLE,
                    role,
                    permission,
                    id,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
    *  Deletes an existing from the database.

    */

    async dropRole<T extends IHarperDBMessageResponse>(
        options: Pick<IHarperDBRoleOptions, "id">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }

            const { id } = options;
            if (!id) {
                throw new Error(" `id` is required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.ALTER_ROLE,

                    id,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Creates a new user with the specified roles and credentials

    */

    async addUser<T extends IHarperDBMessageResponse>(
        options: IHarperDBNewUser,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }

            const { username, password, role } = options;
            const active = options.active || true;
            if (!(username || password || role)) {
                throw new Error(
                    "`username`,`password` , and `role` are required"
                );
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.ADD_USER,
                    username,
                    password,
                    role,
                    active,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Modifies an existing user role and/or credentials
     */

    async alterUser<T extends object>(
        options: IHarperDBAuthUser,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { username, password, role } = options;
            const active = options.active || true;
            if (!username) {
                throw new Error("`username` is required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.ALTER_USER,
                    username,
                    password,
                    role,
                    active,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Deletes an existing user by username

    */

    async dropUser<T extends IHarperDBMessageResponse>(
        options: Pick<IHarperDBAuth, "username">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { username } = options;

            if (!username) {
                throw new Error("`username` is required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DROP_USER,
                    username,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Returns a list of all users
     */

    async listUsers<T extends object[]>(callback?: HarpeeResponseCallback<T>) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.LIST_USERS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     Returns a list of all roles
    */
    async listRoles<T extends object[]>(callback?: HarpeeResponseCallback<T>) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.LIST_ROLES,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
    * Creates the tokens needed for authentication: operation & refresh token. **Note, this operation does not require authorization to be set**.

    **/
    async createAuthenticationTokens<T = IHarperDBTokenResponse>(
        options: IHarperDBAuth,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const username = options.username || this.config.username;
            const password = options.password || this.config.password;
            if (!(username || password)) {
                throw new Error("`username` and `password` are required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.CREATE_AUTHENTICATION_TOKENS,
                    username,
                    password,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Creates a new operation token.
     **/
    async refreshOperationToken<
        T = Pick<IHarperDBTokenResponse, "operation_token">
    >(options: { refreshToken: string }, callback?: HarpeeResponseCallback<T>) {
        try {
            const { refreshToken } = options;
            if (!refreshToken) {
                throw new Error("`refreshToken` is required");
            }
            this.config.token = refreshToken;
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.REFRESH_OPERATION_TOKEN,
                },
                callback
            );

            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Exports data based on a given search operation from table to local file in JSON or CSV format **Note: this only works for local instances, not for cloud instances.**
     */
    async exportLocal<T extends IHarperDBMessageResponse>(
        options: IHarperDBExportLocalOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const format = Utils.toLower(options.format);
            const path = options.path;
            const search_operation = options.searchOperation;
            if (!(format || path || search_operation)) {
                throw new Error(
                    "`format`,`path` and `searchOperation` are required"
                );
            }
            if (!(format === "json" || format === "csv")) {
                throw new Error("`format` must be json or csv");
            }
            if (!Utils.isObject(search_operation)) {
                throw new Error("`searchOperation` must be an object");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.EXPORT_LOCAL,
                    format,
                    path,
                    search_operation,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
    * Exports data based on a given search operation from table to AWS S3 in JSON or CSV format.


    */
    async exportToS3<T extends IHarperDBMessageResponse>(
        options: IHarperDBExportS3Options,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const format = Utils.toLower(options.format);
            const search_operation = options.searchOperation;
            const { bucket, key } = options;
            const aws_access_key_id = options.awsAccessKeyId;
            const aws_secret_access_key = options.awsSecretAccessKey;

            if (!(format || search_operation)) {
                throw new Error("`format` and `searchOperation` are required");
            }
            if (!(format === "json" || format === "csv")) {
                throw new Error("`format` must be json or csv");
            }
            if (!Utils.isObject(search_operation)) {
                throw new Error("`searchOperation` must be an object");
            }
            if (
                !(aws_access_key_id || bucket || key || aws_secret_access_key)
            ) {
                throw new Error(
                    "`awsAccessSecretKey`,`bucket`,`awsAccessKeyId` and `key` are required"
                );
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.EXPORT_TO_S3,
                    format,
                    s3: {
                        aws_access_key_id,
                        aws_secret_access_key,
                        bucket,
                        key,
                    },
                    search_operation,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
       Takes the output of package_custom_function_project, decrypts the base64-encoded string, reconstitutes the .tar file of your project folder, and extracts it to the Custom Functions root project directory.
     */

    async deployCustomFunctionProject<T extends IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionPackage,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { project, file, payload } = options;
            if (!(project || file || payload)) {
                throw new Error("`project`, `file` and `payload` are required");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DEPLOY_CUSTOM_FUNCTION_PROJECT,
                    project,
                    file,
                    payload,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Creates a new project folder in the Custom Functions root project directory. It also inserts into the new directory the contents of our Custom Functions Project template, which is available publicly, here: https://github.com/HarperDB/harperdb-custom-functions-template.
  
    */

    async addCustomFunctionProject<T extends IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { project } = options;
            if (!project) {
                throw new Error("`project` is required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.ADD_CUSTOM_FUNCTION_PROJECT,
                    project,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Deletes the specified project folder and all of its contents.
     */

    async dropCustomFunctionProject<T extends IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { project } = options;
            if (!project) {
                throw new Error("`project` is required");
            }

            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DROP_CUSTOM_FUNCTION_PROJECT,
                    project,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Creates a .tar file of the specified project folder, then reads it into a base64-encoded string and returns that string the the user.
     */

    async packageCustomFunctionProject<
        T extends IHarperDBCustomFunctionPackage
    >(
        options: Pick<IHarperDBCustomFunctionPackage, "project">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { project } = options;
            if (!project) {
                throw new Error("`project` is required");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.PACKAGE_CUSTOM_FUNCTION_PROJECT,
                    project,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Returns the content of the specified file as text. HarperDB Studio uses this call to render the file content in its built-in code editor.
     */
    async getCustomFunction<T extends IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { project, file, type } = options;
            if (!(project || file || type)) {
                throw new Error("`project`, `file` and `type` are required");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.GET_CUSTOM_FUNCTION,
                    project,
                    file,
                    type,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     *Deletes the specified file.
     */
    async dropCustomFunction<T extends IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { project, file, type } = options;
            if (!(project || file || type)) {
                throw new Error("`project`, `file` and `type` are required");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.DROP_CUSTOM_FUNCTION,

                    project,
                    file,
                    type,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Updates the content of the specified file. HarperDB Studio uses this call to save any changes made through its built-in code editor.
     */
    async setCustomFunction<T extends IHarperDBMessageResponse>(
        options: IHarperDBSetCustomFunctionOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { project, file, type, function_content } = options;
            if (!(project || file || type || function_content)) {
                throw new Error("`project`, `file` and `type` are required");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.SET_CUSTOM_FUNCTION,

                    project,
                    file,
                    type,
                    function_content,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * Returns an array of projects within the Custom Functions root project directory. Each project has details including each of the files in the routes and helpers directories, and the total file count in the static folder.
    
    */
    async getCustomFunctions<
        T extends { [key: string]: IHarperDBCustomFunctionInfo }
    >(callback?: HarpeeResponseCallback<T>) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.GET_CUSTOM_FUNCTIONS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     *Returns the state of the Custom functions server. This includes whether it is enabled, upon which port it is listening, and where its root project directory is located on the host machine.
     *
     */
    async customFunctionStatus<T = IHarperDBCustomFuntionStatus>(
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.CUSTOM_FUNCTION_STATUS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Returns detailed metrics on the host system. A deeper dive into the return object can be found here: https://systeminformation.io/general.html.
     */

    async systemInformation<T extends object>(
        attributes?: [
            "system",
            "time",
            "cpu",
            "memory",
            "disk",
            "network",
            "harperdb_processes"
        ],
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.SYSTEM_INFORMATION,
                    attributes,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Returns the status of a cluster relative to the instance where the operation is executed. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */

    async clusterStatus<T extends object>(
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.CLUSTER_STATUS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Returns the HarperDB configuration parameters. Read more about the configuration file here: https://harperdb.io/docs/reference/configuration-file/.
     */

    async getConfiguation<T extends IHarperDBClusterConfiguration>(
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.GET_CONFIGUATION,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Modifies the HarperDB configuration file parameters. Read more about HarperDB configuration here: https://harperdb.io/docs/reference/configuration-file/.
     */

    async configureCluster<T extends IHarperDBMessageResponse>(
        options: IHarperDBClusterConfiguration = {},
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.CONFIGURE_CLUSTER,
                    ...options,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Restarts the HarperDB instance.
     */

    async restart<T extends IHarperDBMessageResponse>(
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.RESTART,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Sending this operation restarts the specified HarperDB service.

    */

    async restartService<T extends IHarperDBMessageResponse>(
        options: {
            /** the name of the service you would like to restart. Currently, this is limited to 'custom_functions'*/
            service: "custom_functions";
        },
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { service } = options;
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.RESTART_SERVICE,
                    service,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Registers an additional HarperDB instance with associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */

    async addNode<T extends IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { name, host, subscriptions, port } = options;
            if (!(name || host || subscriptions || port)) {
                throw new Error(
                    "`name`,`host`, `port` and `subscriptions` are required"
                );
            }
            if (!Utils.isArray(subscriptions)) {
                throw new Error("`subscriptions` must be an array");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.ADD_NODE,
                    name,
                    host,
                    port,
                    subscriptions,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Modifies an existing HarperDB instance registration and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    async updateNode<T extends IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { name, host, subscriptions, port } = options;
            if (!(name || host || subscriptions || port)) {
                throw new Error(
                    "`name`,`host`, `port` and `subscriptions` are required"
                );
            }
            if (!Utils.isArray(subscriptions)) {
                throw new Error("`subscriptions` must be an array");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.UPDATE_NODE,
                    name,
                    host,
                    port,
                    subscriptions,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Unregisters a HarperDB instance and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.
     */

    async removeNode<T extends IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilNodeOptions, "name">,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { name } = options;
            if (!name) {
                throw new Error("`name` is required");
            }
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.REMOVE_NODE,
                    name,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
}