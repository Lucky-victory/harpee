import { IHarpeeResponse } from "./../interfaces/harpee.interface";
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
    IHarpeeAttributeOptions,
    IHarperDBInsertUpdateOptions,
    IHarperDBDeleteOptions,
} from "../interfaces/harpee-utilities.interface";

import { HarpeeHttp } from "./harpee-http";
import operations from "../constants/operations";
import Utils from "../helpers/utils";
import { HarpeeResponseCallback } from "../interfaces/harpee.interface";
import {
    IHarperDBCustomFunctionOptions,
    IHarperDBClusterConfiguration,
} from "../interfaces/harpee-utilities.interface";
import {
    IHarperDBDeleteResponse,
    IHarperDBInsertResponse,
    IHarperDBUpdateResponse,
} from "../interfaces/harpee-model.interface";

/**
 * A class for handling, configurations, creating/refreshing Authentication Tokens, etc
 */
export class HarpeeUtilities extends HarpeeHttp {
    constructor() {
        super();
    }

    /**
     * Execute custom SQL queries.
     *
     */
    async query<T = object[]>(sqlQuery: string): Promise<IHarpeeResponse<T>>;
    async query<T = object[]>(
        sqlQuery: string,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async query<T = object[]>(
        sqlQuery: string,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SQL,
                    sql: sqlQuery,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns the definitions of all schemas and tables within the database.

    */

    async describeAll<T = object>(): Promise<IHarpeeResponse<T>>;
    async describeAll<T = object>(
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async describeAll<T = object>(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DESCRIBE_ALL,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Create a new database schema.

    */
    async createSchema<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilOptions, "schema">
    ): Promise<IHarpeeResponse<T>>;
    async createSchema<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async createSchema<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema } = options;
            if (!schema) {
                throw new Error("please provide a name for your schema");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CREATE_SCHEMA,
                    schema,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Drop an existing database schema. **NOTE: Dropping a schema will delete all tables and all of their records in that schema.**
     */

    async dropSchema<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilOptions, "schema">
    ): Promise<IHarpeeResponse<T>>;

    async dropSchema<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async dropSchema<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema } = options;

            if (!schema) {
                throw new Error("please provide the `schema` name");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DROP_SCHEMA,
                    schema,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns the definitions of all tables within the specified schema

    */

    async describeSchema<T = object>(
        options: Pick<IHarpeeUtilOptions, "schema">
    ): Promise<IHarpeeResponse<T>>;

    async describeSchema<T = object>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async describeSchema<T = object>(
        options: Pick<IHarpeeUtilOptions, "schema">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema } = options;

            if (!schema) {
                throw new Error("`schema` is required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DESCRIBE_SCHEMA,
                    schema,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Create a new database table within the specified schema

    */

    async createTable<T = IHarperDBMessageResponse>(
        options: IHarpeeNewTableOptions
    ): Promise<IHarpeeResponse<T>>;

    async createTable<T = IHarperDBMessageResponse>(
        options: IHarpeeNewTableOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async createTable<T = IHarperDBMessageResponse>(
        options: IHarpeeNewTableOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table } = options;
            const hash_attribute = options.hashAttribute || "id";
            if (!(table || schema)) {
                throw new Error(" `table` and the `schema` are required");
            }

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    async insert<T = IHarperDBInsertResponse>(
        options: IHarperDBInsertUpdateOptions
    ): Promise<IHarpeeResponse<T>>;

    async insert<T = IHarperDBInsertResponse>(
        options: IHarperDBInsertUpdateOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async insert<T = IHarperDBInsertResponse>(
        options: IHarperDBInsertUpdateOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table, records } = options;
            if (!(table || schema || records)) {
                throw new Error("`schema`,`table` and `records` are required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.INSERT,
                    schema,
                    table,
                    records,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    async upsert<T = IHarperDBInsertResponse>(
        options: IHarperDBInsertUpdateOptions
    ): Promise<IHarpeeResponse<T>>;

    async upsert<T = IHarperDBInsertResponse>(
        options: IHarperDBInsertUpdateOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async upsert<T = IHarperDBInsertResponse>(
        options: IHarperDBInsertUpdateOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table, records } = options;
            if (!(table || schema || records)) {
                throw new Error("`schema`,`table` and `records` are required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.UPSERT,
                    schema,
                    table,
                    records,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     * Note:  **Each record in the records array must include their ID**
     * @param options
     */
    async update<T = IHarperDBUpdateResponse>(
        options: IHarperDBInsertUpdateOptions
    ): Promise<IHarpeeResponse<T>>;

    async update<T = IHarperDBUpdateResponse>(
        options: IHarperDBInsertUpdateOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async update<T = IHarperDBUpdateResponse>(
        options: IHarperDBInsertUpdateOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table, records } = options;
            if (!(table || schema || records)) {
                throw new Error("`schema`,`table` and `records` are required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.UPDATE,
                    schema,
                    table,
                    records,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     *
     * @param options
     */
    async delete<T = IHarperDBDeleteResponse>(
        options: IHarperDBDeleteOptions
    ): Promise<IHarpeeResponse<T>>;

    async delete<T = IHarperDBDeleteResponse>(
        options: IHarperDBDeleteOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async delete<T = IHarperDBDeleteResponse>(
        options: IHarperDBDeleteOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table, hashValues } = options;
            if (!(table || schema || hashValues)) {
                throw new Error(
                    "`schema`,`table` and `hashValues` are required"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DELETE,
                    schema,
                    table,
                    hash_values: hashValues,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Create a new attribute  within the specified table

    */

    async createAttribute<T = IHarperDBInsertResponse>(
        options: IHarpeeAttributeOptions
    ): Promise<IHarpeeResponse<T>>;
    async createAttribute<T = IHarperDBInsertResponse>(
        options: IHarpeeAttributeOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async createAttribute<T = IHarperDBInsertResponse>(
        options: IHarpeeAttributeOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table, attribute } = options;

            if (!(table || schema || attribute)) {
                throw new Error(
                    " `table`, `schema` and `attribute` are required"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CREATE_ATTRIBUTE,
                    schema,
                    table,
                    attribute,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Drop an attribute from the specified table, **NOTE: Dropping an attribute will delete all associated attribute values in that table**

    */

    async dropAttribute<T = IHarperDBMessageResponse>(
        options: IHarpeeAttributeOptions
    ): Promise<IHarpeeResponse<T>>;
    async dropAttribute<T = IHarperDBMessageResponse>(
        options: IHarpeeAttributeOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async dropAttribute<T = IHarperDBMessageResponse>(
        options: IHarpeeAttributeOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table, attribute } = options;

            if (!(table || schema || attribute)) {
                throw new Error(
                    " `table`, `schema` and `attribute` are required"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DROP_ATTRIBUTE,
                    schema,
                    table,
                    attribute,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Returns the definition of the specified table

    */

    async describeTable<T = object>(
        options: IHarpeeUtilOptions
    ): Promise<IHarpeeResponse<T>>;
    async describeTable<T = object>(
        options: IHarpeeUtilOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async describeTable<T = object>(
        options: IHarpeeUtilOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table } = options;

            if (!(table || schema)) {
                throw new Error("please provide the `table` and `schema` name");
            }

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Drop an existing database table
     */

    async dropTable<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilOptions
    ): Promise<IHarpeeResponse<T>>;

    async dropTable<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async dropTable<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { schema, table } = options;

            if (!(table || schema)) {
                throw new Error(" `table` and `schema` are required");
            }

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     *  Creates a new role with specified permissions

     */

    async addRole<T = object>(
        options: IHarperDBNewRoleOptions
    ): Promise<IHarpeeResponse<T>>;
    async addRole<T = object>(
        options: IHarperDBNewRoleOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async addRole<T = object>(
        options: IHarperDBNewRoleOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
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

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    *Modifies an existing role with specified permissions.

    */

    async alterRole<T = object>(
        options: IHarperDBRoleOptions
    ): Promise<IHarpeeResponse<T>>;
    async alterRole<T = object>(
        options: IHarperDBRoleOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async alterRole<T = object>(
        options: IHarperDBRoleOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
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

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    *  Deletes an existing from the database.

    */

    async dropRole<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBRoleOptions, "id">
    ): Promise<IHarpeeResponse<T>>;
    async dropRole<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBRoleOptions, "id">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async dropRole<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBRoleOptions, "id">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }

            const { id } = options;
            if (!id) {
                throw new Error(" `id` is required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.ALTER_ROLE,

                    id,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     * Creates a new user with the specified roles and credentials

    */

    async addUser<T = IHarperDBMessageResponse>(
        options: IHarperDBNewUser
    ): Promise<IHarpeeResponse<T>>;
    async addUser<T = IHarperDBMessageResponse>(
        options: IHarperDBNewUser,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async addUser<T = IHarperDBMessageResponse>(
        options: IHarperDBNewUser,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
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

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Modifies an existing user role and/or credentials
     */

    async alterUser<T = object>(
        options: IHarperDBAuthUser
    ): Promise<IHarpeeResponse<T>>;

    async alterUser<T = object>(
        options: IHarperDBAuthUser,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async alterUser<T = object>(
        options: IHarperDBAuthUser,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { username, password, role } = options;
            const active = options.active || true;
            if (!username) {
                throw new Error("`username` is required");
            }

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Deletes an existing user by username

    */

    async dropUser<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBAuth, "username">
    ): Promise<IHarpeeResponse<T>>;
    async dropUser<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBAuth, "username">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async dropUser<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBAuth, "username">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { username } = options;

            if (!username) {
                throw new Error("`username` is required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DROP_USER,
                    username,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns a list of all users
     */

    async listUsers<T = object[]>(): Promise<IHarpeeResponse<T>>;
    async listUsers<T = object[]>(
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async listUsers<T = object[]>(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.LIST_USERS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     Returns a list of all roles
    */
    async listRoles<T = object[]>(): Promise<IHarpeeResponse<T>>;
    async listRoles<T = object[]>(
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async listRoles<T = object[]>(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.LIST_ROLES,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     * Creates the tokens needed for authentication: operation & refresh token. **Note, this operation does not require authorization to be set**.
     **/
    async createAuthenticationTokens<T = IHarperDBTokenResponse>(
        options: IHarperDBAuth
    ): Promise<IHarpeeResponse<T>>;
    async createAuthenticationTokens<T = IHarperDBTokenResponse>(
        options: IHarperDBAuth,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async createAuthenticationTokens<T = IHarperDBTokenResponse>(
        options: IHarperDBAuth,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const username = options.username || this.config?.username;
            const password = options.password || this.config?.password;
            if (!(username || password)) {
                throw new Error("`username` and `password` are required");
            }

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     * Creates a new operation token.
     **/
    async refreshOperationToken<
        T = Pick<IHarperDBTokenResponse, "operation_token">
    >(options: { refreshToken: string }): Promise<IHarpeeResponse<T>>;
    async refreshOperationToken<
        T = Pick<IHarperDBTokenResponse, "operation_token">
    >(
        options: { refreshToken: string },
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async refreshOperationToken<
        T = Pick<IHarperDBTokenResponse, "operation_token">
    >(
        options: { refreshToken: string },
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { refreshToken } = options;
            if (!refreshToken) {
                throw new Error("`refreshToken` is required");
            }
            this.config.token = refreshToken;
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.REFRESH_OPERATION_TOKEN,
                },
                callback
            );

            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     * Exports data based on a given search operation from table to local file in JSON or CSV format **Note: this only works for local instances, not for cloud instances.**
     */
    async exportLocal<T = IHarperDBMessageResponse>(
        options: IHarperDBExportLocalOptions
    ): Promise<IHarpeeResponse<T>>;
    async exportLocal<T = IHarperDBMessageResponse>(
        options: IHarperDBExportLocalOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async exportLocal<T = IHarperDBMessageResponse>(
        options: IHarperDBExportLocalOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
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

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
    * Exports data based on a given search operation from table to AWS S3 in JSON or CSV format.


    */
    async exportToS3<T = IHarperDBMessageResponse>(
        options: IHarperDBExportS3Options
    ): Promise<IHarpeeResponse<T>>;
    async exportToS3<T = IHarperDBMessageResponse>(
        options: IHarperDBExportS3Options,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async exportToS3<T = IHarperDBMessageResponse>(
        options: IHarperDBExportS3Options,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
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

            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
       Takes the output of package_custom_function_project, decrypts the base64-encoded string, reconstitutes the .tar file of your project folder, and extracts it to the Custom Functions root project directory.
     */

    async deployCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionPackage
    ): Promise<IHarpeeResponse<T>>;
    async deployCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionPackage,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async deployCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionPackage,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { project, file, payload } = options;
            if (!(project || file || payload)) {
                throw new Error("`project`, `file` and `payload` are required");
            }
            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Creates a new project folder in the Custom Functions root project directory. It also inserts into the new directory the contents of our Custom Functions Project template, which is available publicly, here: https://github.com/HarperDB/harperdb-custom-functions-template.
  
    */

    async addCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">
    ): Promise<IHarpeeResponse<T>>;
    async addCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async addCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { project } = options;
            if (!project) {
                throw new Error("`project` is required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.ADD_CUSTOM_FUNCTION_PROJECT,
                    project,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Deletes the specified project folder and all of its contents.
     */

    async dropCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">
    ): Promise<IHarpeeResponse<T>>;
    async dropCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async dropCustomFunctionProject<T = IHarperDBMessageResponse>(
        options: Pick<IHarperDBCustomFunctionOptions, "project">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { project } = options;
            if (!project) {
                throw new Error("`project` is required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DROP_CUSTOM_FUNCTION_PROJECT,
                    project,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Creates a .tar file of the specified project folder, then reads it into a base64-encoded string and returns that string the the user.
     */

    async packageCustomFunctionProject<T = IHarperDBCustomFunctionPackage>(
        options: Pick<IHarperDBCustomFunctionPackage, "project">
    ): Promise<IHarpeeResponse<T>>;
    async packageCustomFunctionProject<T = IHarperDBCustomFunctionPackage>(
        options: Pick<IHarperDBCustomFunctionPackage, "project">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async packageCustomFunctionProject<T = IHarperDBCustomFunctionPackage>(
        options: Pick<IHarperDBCustomFunctionPackage, "project">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { project } = options;
            if (!project) {
                throw new Error("`project` is required");
            }
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.PACKAGE_CUSTOM_FUNCTION_PROJECT,
                    project,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns the content of the specified file as text. HarperDB Studio uses this call to render the file content in its built-in code editor.
     */
    async getCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions
    ): Promise<IHarpeeResponse<T>>;
    async getCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async getCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { project, file, type } = options;
            if (!(project || file || type)) {
                throw new Error("`project`, `file` and `type` are required");
            }
            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     *Deletes the specified file.
     */
    async dropCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions
    ): Promise<IHarpeeResponse<T>>;
    async dropCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async dropCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBCustomFunctionOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { project, file, type } = options;
            if (!(project || file || type)) {
                throw new Error("`project`, `file` and `type` are required");
            }
            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Updates the content of the specified file. HarperDB Studio uses this call to save any changes made through its built-in code editor.
     */
    async setCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBSetCustomFunctionOptions
    ): Promise<IHarpeeResponse<T>>;
    async setCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBSetCustomFunctionOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async setCustomFunction<T = IHarperDBMessageResponse>(
        options: IHarperDBSetCustomFunctionOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const {
                project,
                file,
                type,
                functionContent: function_content,
            } = options;
            if (!(project || file || type || function_content)) {
                throw new Error("`project`, `file` and `type` are required");
            }
            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     * Returns an array of projects within the Custom Functions root project directory. Each project has details including each of the files in the routes and helpers directories, and the total file count in the static folder.
    
    */
    async getCustomFunctions<
        T = { [key: string]: IHarperDBCustomFunctionInfo }
    >(): Promise<IHarpeeResponse<T>>;
    async getCustomFunctions<
        T = { [key: string]: IHarperDBCustomFunctionInfo }
    >(callback: HarpeeResponseCallback<T>): Promise<void>;
    async getCustomFunctions<
        T = { [key: string]: IHarperDBCustomFunctionInfo }
    >(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.GET_CUSTOM_FUNCTIONS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     *Returns the state of the Custom functions server. This includes whether it is enabled, upon which port it is listening, and where its root project directory is located on the host machine.
     *
     */
    async customFunctionStatus<T = IHarperDBCustomFuntionStatus>(): Promise<
        IHarpeeResponse<T>
    >;
    async customFunctionStatus<T = IHarperDBCustomFuntionStatus>(
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async customFunctionStatus<T = IHarperDBCustomFuntionStatus>(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CUSTOM_FUNCTION_STATUS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns detailed metrics on the host system. A deeper dive into the return object can be found here: https://systeminformation.io/general.html.
     */

    async systemInformation<T = object>(
        attributes?: [
            "system",
            "time",
            "cpu",
            "memory",
            "disk",
            "network",
            "harperdb_processes"
        ]
    ): Promise<IHarpeeResponse<T>>;
    async systemInformation<T = object>(
        attributes: [
            "system",
            "time",
            "cpu",
            "memory",
            "disk",
            "network",
            "harperdb_processes"
        ],
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async systemInformation<T = object>(
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
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SYSTEM_INFORMATION,
                    attributes,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns the status of a cluster relative to the instance where the operation is executed. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */

    async clusterStatus<T = object>(): Promise<IHarpeeResponse<T>>;
    async clusterStatus<T = object>(
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async clusterStatus<T = object>(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CLUSTER_STATUS,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns the HarperDB configuration parameters. Read more about the configuration file here: https://harperdb.io/docs/reference/configuration-file/.
     */

    async getConfiguation<T = IHarperDBClusterConfiguration>(): Promise<
        IHarpeeResponse<T>
    >;
    async getConfiguation<T = IHarperDBClusterConfiguration>(
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async getConfiguation<T = IHarperDBClusterConfiguration>(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.GET_CONFIGUATION,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Modifies the HarperDB configuration file parameters. Read more about HarperDB configuration here: https://harperdb.io/docs/reference/configuration-file/.
     */

    async configureCluster<T = IHarperDBMessageResponse>(
        options?: IHarperDBClusterConfiguration
    ): Promise<IHarpeeResponse<T>>;

    async configureCluster<T = IHarperDBMessageResponse>(
        options: IHarperDBClusterConfiguration,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;

    async configureCluster<T = IHarperDBMessageResponse>(
        options: IHarperDBClusterConfiguration = {},
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CONFIGURE_CLUSTER,
                    ...options,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Restarts the HarperDB instance.
     */

    async restart<T = IHarperDBMessageResponse>(): Promise<IHarpeeResponse<T>>;
    async restart<T = IHarperDBMessageResponse>(
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async restart<T = IHarperDBMessageResponse>(
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.RESTART,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Sending this operation restarts the specified HarperDB service.

    */

    async restartService<T = IHarperDBMessageResponse>(options: {
        /** the name of the service you would like to restart. Currently, this is limited to 'custom_functions'*/
        service: "custom_functions";
    }): Promise<IHarpeeResponse<T>>;
    async restartService<T = IHarperDBMessageResponse>(
        options: {
            /** the name of the service you would like to restart. Currently, this is limited to 'custom_functions'*/
            service: "custom_functions";
        },
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async restartService<T = IHarperDBMessageResponse>(
        options: {
            /** the name of the service you would like to restart. Currently, this is limited to 'custom_functions'*/
            service: "custom_functions";
        },
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { service } = options;
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.RESTART_SERVICE,
                    service,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Registers an additional HarperDB instance with associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */

    async addNode<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions
    ): Promise<IHarpeeResponse<T>>;
    async addNode<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async addNode<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
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
            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Modifies an existing HarperDB instance registration and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.

    */
    async updateNode<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions
    ): Promise<IHarpeeResponse<T>>;
    async updateNode<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async updateNode<T = IHarperDBMessageResponse>(
        options: IHarpeeUtilNodeOptions,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
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
            const response = await this.$callbackOrPromise<T>(
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
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Unregisters a HarperDB instance and associated subscriptions. Learn more about HarperDB clustering here: https://harperdb.io/docs/clustering/.
     */

    async removeNode<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilNodeOptions, "name">
    ): Promise<IHarpeeResponse<T>>;
    async removeNode<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilNodeOptions, "name">,
        callback: HarpeeResponseCallback<T>
    ): Promise<void>;
    async removeNode<T = IHarperDBMessageResponse>(
        options: Pick<IHarpeeUtilNodeOptions, "name">,
        callback?: HarpeeResponseCallback<T>
    ): Promise<void | IHarpeeResponse<T>> {
        try {
            const { name } = options;
            if (!name) {
                throw new Error("`name` is required");
            }
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.REMOVE_NODE,
                    name,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
}
