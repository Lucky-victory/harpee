export interface IHarpeeConfig {
    username?: string;
    password?: string;
    user?: string;
    pass?: string;
    host: string;
    token?: string;
}

export type IHarpeeHttpCallback<T> = (
    err: unknown,
    result: T | T[] | null
) => void;
