import { StringOrNumber } from "./harpee.interface";
export interface IHarperDBClusterConfiguration {
    PROJECT_DIR?: string;
    HDB_ROOT?: string;
    SERVER_PORT?: number;
    CERTIFICATE?: string;
    PRIVATE_KEY?: string;
    HTTPS_ON?: boolean;
    CORS_ON?: boolean;
    CORS_WHITELIST?: number;
    LOG_LEVEL?: "warn" | "info" | "error";
    LOGGER?: number;
    LOG_PATH?: string;
    LOG_DAILY_ROTATE?: boolean;
    LOG_MAX_DAILY_FILES?: number;
    NODE_ENV?: string;
    SETTINGS_PATH?: string;
    CLUSTERING_PORT?: string;
    NODE_NAME?: number;
    CLUSTERING?: boolean;
    ALLOW_SELF_SIGNED_SSL_CERTS?: boolean;
    MAX_HDB_PROCESSES?: number;
    INSTALL_USER?: string;
    CLUSTERING_USER?: number;
    SERVER_TIMEOUT_MS?: number;
    SERVER_KEEP_ALIVE_TIMEOUT?: number;
    SERVER_HEADERS_TIMEOUT?: number;
    DISABLE_TRANSACTION_LOG?: boolean;
    OPERATION_TOKEN_TIMEOUT?: string;
    REFRESH_TOKEN_TIMEOUT?: string;
}
export interface IHarperDBCustomFunctionOptions {
    /**
     *  the name of the subfolder containing the file - must be either routes or helpers
     */
    type: "routes" | "helpers";
    /**
     * the name of the project containing the file.
     */
    project: string;
    /**
     * the name of the file - should not include the file extension (which is always .js)
     */
    file: string;
}
export interface IHarperDBCustomFunctionPackage {
    /**
     * a base64-encoded string representation of the `.tar` file
     */
    payload: string;
    /**
     * the name of the project
     */
    project: string;
    /**
     * the path to file on the destination host
     */
    file: string;
}
export interface IHarperDBExportOptions {
    /**
     * the format you want your data to be exported, 'json' or 'csv'.
     */
    format: "json" | "csv";
    /**
     * searchOperation of search_by_hash, search_by_value or sql.
     */
    searchOperation: {
        operation: "sql" | "search_by_value" | "search_by_hash";
        sql?: string;
        search_value?: string;
        search_attribute?: string;
        hash_values?: StringOrNumber[];
        get_attributes?: string[];
    };
}
export interface IHarperDBExportLocalOptions extends IHarperDBExportOptions {
    /**
     * an absolute path where the file should be stored.
     */
    path: string;
}
export interface IHarperDBExportS3Options extends IHarperDBExportOptions {
    /**
     * the name of the bucket where your file lives.
     */
    bucket: string;
    /**
     * your aws access key id
     */
    awsAccessKeyId: string;
    /**
     * the name of the file to import - *the file must include a valid file extension ('.csv' or '.json')*.
     */
    key: string;
    /**
     * your aws secret access key.
     */
    awsSecretAccessKey: string;
}
export interface IHarperDBSetCustomFunctionOptions extends IHarperDBCustomFunctionOptions {
    /**
     * the content you wish to save into the specified file
     */
    functionContent: string;
}
export interface IHarpeeUtilNodeOptions {
    /**
     * The NODE_NAME of the remote node. Must match exactly.
     */
    name: string;
    subscriptions: string[];
    /**
     * The CLUSTERING_PORT for the remote node. Not to be confused with HTTP/S PORTS.
     */
    port: number;
    /**
     * The URI for the remote node.
     */
    host: string;
}
export interface IHarperDBAuth {
    /**
     username of user to generate tokens for.
    *
    */
    username: string;
    /**
     * password of user to generate tokens for
     */
    password: string;
}
export interface IHarpeeUtilOptions {
    schema: string;
    table: string;
}
export interface IHarpeeNewTableOptions extends IHarpeeUtilOptions {
    hashAttribute?: string;
}
export interface IHarperDBInsertUpdateOptions extends IHarpeeUtilOptions {
    records: {
        [key: string]: any;
    }[];
}
export interface IHarperDBDeleteOptions extends IHarpeeUtilOptions {
    /**
     * ID(s) of the record(s) to delete
     */
    hashValues: StringOrNumber[];
}
export interface IHarpeeAttributeOptions extends IHarpeeUtilOptions {
    attribute: string;
}
export interface IHarperDBAuthUser {
    username: string;
    password?: string;
    role?: string;
    active?: boolean;
}
export interface IHarperDBRole {
    permission: {
        super_user?: boolean;
    };
    id: string;
}
export interface IHarperDBRoleOptions extends IHarperDBRole {
    role?: string;
}
export interface IHarperDBNewRoleOptions extends IHarperDBRole {
    role: string;
}
export interface IHarperDBNewUser extends IHarperDBAuth {
    role: string;
    active: boolean;
}
export interface IHarperDBTokenResponse {
    operation_token: string;
    refresh_token: string;
}
export interface IHarperDBMessageResponse {
    message: string;
}
export interface IHarperDBCustomFunctionInfo {
    routes: string[];
    helpers: string[];
    static: number;
}
export interface IHarperDBCustomFuntionStatus {
    is_enabled: boolean;
    port: number;
    directory: string;
}
