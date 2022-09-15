export interface IHarpeeConfig {
    username?: string;
    password?: string;
    user?: string;
    pass?: string;
    host: string;
    token?: string;
}
export type HarpeeID = string | number;
export type HarpeePath = string;
export type HarpeeReqCallback<T> = (
    err: unknown,
    result: T | T[] | null
) => void;
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
