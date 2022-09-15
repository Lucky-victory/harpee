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
export type HarpeePath = string;

export type HarpeeResponseCallback<T> = (
    err: unknown,
    data: IHarpeeResponse<T> | null
) => void;
export interface IHarpeeResponse<T> {
    success: boolean;
    data: T | T[] | null;
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
    name?: string;
    primaryKey?: string;
    fields: { [key: string]: IHarpeeField };
    silent?: boolean;
}

export interface IHarpeeField {
    [key: string]: IHarpeeFieldExt;
}

export interface IHarpeeFieldExt {
    type: HarpeeFieldType;
    required?: boolean;
}
export type HarpeeFieldType =
    | "string"
    | "array"
    | "object"
    | "number"
    | "boolean"
    | "date";
