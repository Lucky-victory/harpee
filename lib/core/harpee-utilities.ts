import {
    IHarperDBCustomFunctionInfo,
    IHarperDBCustomFunctionPackage,
    IHarperDBExportS3Options,
    IHarperDBExportLocalOptions,
} from "./../interfaces/harpee-utilities.interface";
const harpeeModelConfig = require("./harpeeModelConfig");
const harpeeConnectConfig = require("./harpeeConnectConfig");
import HarpeeHttp from "./harpee-http";
import operations from "../constants/operations";
import Utils from "../helpers/utils";
import { HarpeeResponseCallback } from "../interfaces/harpee.interface";
import { IHarperDBClusterConfiguration } from "../interfaces/operations.interface";
import { IHarperDBCustomFunctionOptions } from "../interfaces/harpee-utilities.interface";

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


    */

    async describeAll(callback) {
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
    * @param {Object} options
    * @param {string} options.schema
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async createSchema(options, callback) {
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
    * @param {Object} options
    * @param {string} options.schema
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async dropSchema(options, callback) {
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
    * @param {Object} options
    * @param {string} options.schema
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async describeSchema(options, callback) {
        try {
            const { schema } = options;

            if (!schema) {
                throw new Error("please provide the `schema` name");
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
    * @param {Object} options
    * @param {string} options.schema
    * @param {string} options.table
    * @param {string} [options.hashAttribute]
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async createTable(options, callback) {
        try {
            const { schema, table } = options;
            const hash_attribute = options.hashAttribute || "id";
            if (!(table || schema)) {
                throw new Error(
                    "please provide a name for the `table` and the `schema`"
                );
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
    * @param {Object} options
    * @param {string} options.schema
    * @param {string} options.table
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async describeTable(options, callback) {
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
    * @param {Object} options
    * @param {string} options.schema
    * @param {string} options.table
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async dropTable(options, callback) {
        try {
            const { schema, table } = options;

            if (!(table || schema)) {
                throw new Error("please provide the `table` and `schema` name");
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
     * @param {Object} options
     * @param {Object} options.permission
     * @param {string} options.role
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}

     */

    async addRole(options, callback) {
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
    * @param {Object} options
    * @param {Object} options.permission
    * @param {string} options.id
    * @param {string} options.role
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async alterRole(options, callback) {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }

            const { role, permission, id } = options;
            if (!(role || permission || id)) {
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
    * @param {Object} options
    * @param {string} options.username
    * @param {string} options.password
    * @param {string} options.role
    * @param {boolean} [options.active]
    * 
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async addUser(options, callback) {
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
            if (!Utils.isObject(permission)) {
                throw new Error("`permission` must be an object");
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
    * @param {Object} options
    * @param {string} options.username
    * @param {string} options.password
    * @param {string} options.role
    * @param {boolean} [options.active]
    * 
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async alterUser(options, callback) {
        try {
            const { username, password, role } = options;
            const active = options.active || true;
            if (!(username || password || role)) {
                throw new Error(
                    "`username`,`password` , and `role` are required"
                );
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
    * @param {Object} options
    * @param {string} options.username
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async dropUser(options, callback) {
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
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async listUsers(callback) {
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
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
    async listRoles(callback) {
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
    * @param {Object} options 
    * @param {string} options.username - username of user to generate tokens for.
    * @param {string} options.password - password of user to generate tokens for. 
    * @param {responseCallback} [callback] - an optional callbac `Promise` is returned;
    * @returns {(void| Promise<any>)}

    **/
    async createAuthenticationTokens(options, callback) {
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
    * This operation creates a new operation token.
    * @param {Object} options
    * @param {string} options.refreshToken -
    * @param {responseCallback} [callback] 
    * @returns {(void | Promise<any>)}

    **/
    async refreshOperationToken(options, callback) {
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
    * Exports data based on a given search operation from table to local file in JSON or CSV format.
    * @param {Object} options     
    * @param {Object} options.searchOperation - searchOperation of search_by_hash, search_by_value or sql.
    * @param {string} options.path - an absolute path where the file should be stored.
    * @param {string} options.format - the format you want your data to be exported, 'json' or 'csv'.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
    async exportLocal<T extends { message: string }>(
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
    async exportToS3<T extends { message: string }>(
        options: IHarperDBExportS3Options,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const format = Utils.toLower(options.format);
            const search_operation = options.searchOperation;
            const { bucket, key } = options;
            const aws_access_key_id = options.awsAccessKeyId;
            const aws_access_secret_key = options.awsAccessSecretKey;

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
                !(aws_access_key_id || bucket || key || aws_access_secret_key)
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
                        aws_access_secret_key,
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
    
     */

    async deployCustomFunctionProject<T extends { message: string }>(
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
  
    */

    async addCustomFunctionProject<T extends { message: string }>(
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
  
    */

    async dropCustomFunctionProject<T extends { message: string }>(
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

    */
    async getCustomFunction<T extends { message: string }>(
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
   
    */
    async dropCustomFunction<T extends { message: string }>(
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
     */

    async configureCluster<T extends { message: string }>(
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


    */

    async restart<T extends { message: string }>(
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
  

    */

    async restartService<T extends { message: string }>(
        options: { service: "custom_functions" },
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
  

    */

    async addNode<T extends object>(
        options: HarpeeUtilitiesNodeOptions,
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


    */
    async updateNode<T extends object>(
        options: HarpeeUtilitiesNodeOptions,
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

    */

    async removeNode<T extends object>(
        options: Pick<HarpeeUtilitiesNodeOptions, "name">,
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

export interface HarpeeUtilitiesNodeOptions {
    name: string;
    subscriptions: string[];
    port: string;
    host: string;
}
