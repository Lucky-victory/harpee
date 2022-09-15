export interface IHarpeeMethodOptions {
    limit?: number;
    offset?: number;
    orderby?: string;
    order?: "DESC" | "ASC";
    where?: string;
    and?: string | number;
    getAttributes?: string[];
}

export type OperationAction = "insert" | "update" | "upsert";
export interface IHarpeeModel {}
