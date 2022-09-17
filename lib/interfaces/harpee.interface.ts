export interface IHarpeeConfig {
    username?: string;
    password?: string;
    user?: string;
    pass?: string;
    host: string;
    token?: string;
}
export type Order = "DESC" | "ASC";
export type StringOrNumber = string | number;

export type HarpeeResponseCallback<T = unknown> = (
    err: unknown,
    data: IHarpeeResponse<T> | null
) => void;
export interface IHarpeeResponse<T = unknown> {
    success: boolean;
    data: null | T;
    error: IHarpeeHttpError | null;
}
export interface IHarpeeHttpError {
    message: string;
    status?: number;
    data: any;
}
export type HarpeeConnectInfoCallback = (
    info?: IHarpeeConfig,
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
    fields: { [key: string]: IHarpeeField };
    /**
     * when true, turns of error for schema fields
     */
    silent?: boolean;
}

export interface IHarpeeField {
    type: HarpeeFieldType;
    required?: boolean | [boolean, string];
}
export type HarpeeFieldType =
    | "string"
    | "array"
    | "object"
    | "number"
    | "boolean";
export interface AnyKeyValueObject {
    [key: string]: any;
}
