export interface IHarpeeAuthConfig {
    /**
     * your HarperDB username, alias `user`
     */
    username?: string;
    /**
     *  your HarperDB password, alias `pass`
     */
    password?: string;
    /**
     * your HarperDB username, alias `username`
     */
    user?: string;
    /**
     *  your HarperDB password, alias `password`
     */
    pass?: string;
    /**
     * your harperDB instance url
     */
    host: string;
    /**
     * A JWT token, **you should only include it in place of `username` and `password`.**
     */
    token?: string;
}

export type Order = "desc" | "asc";
export type StringOrNumber = string | number;

export type HarpeeResponseCallback<T = unknown> = (
    err: unknown,
    result: IHarpeeResponse<T> | null
) => void;

export interface IHarpeeResponse<T = unknown> {
    success: boolean;
    data: null | T;
    error: IHarpeeHttpError | null;
}

export type IHarpeeHttpError = {
    message: string;
    status?: number;
    data: any;
};
export type HarpeeConnectInfoCallback = (
    info?: IHarpeeAuthConfig,
    err?: null | unknown
) => void;

export interface IHarpeeSchemaConfig {
    /**
     * The name of the schema, default is `defaultSchema`
     */
    name?: string;
    /**
     *the table primary key, alias hash_attribute, default is `id`
     */
    primaryKey?: string;
    fields: { [key: string]: any };
    /**
     * when true, turns of error for schema fields
     */
    silent?: boolean;
}

export type AnyKeyValueObject = {
    [key: string]: any;
};
export interface InsertOpts<T = object> {
    schema: string;
    table: string;
    records: T[];
}
