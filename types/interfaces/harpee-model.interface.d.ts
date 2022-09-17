import { Order, StringOrNumber } from "./harpee.interface";
export interface IHarpeeModelFindOptions {
    /**
     * max number of data to return
     */
    limit?: number;
    offset?: number;
    orderby?: string[];
    order?: Order;
    where?: string;
    and?: string | number;
    getAttributes?: string[];
}
export interface IHarperDBCRUDResponse {
    message: string;
    update_hashes: StringOrNumber[];
    skipped_hashes: StringOrNumber[];
    inserted_hashes: StringOrNumber[];
    deleted_hashes: StringOrNumber[];
}
export declare type IHarperDBDeleteResponse = Pick<IHarperDBCRUDResponse, "deleted_hashes" | "skipped_hashes" | "message">;
export declare type IHarperDBUpdateResponse = Pick<IHarperDBCRUDResponse, "update_hashes" | "skipped_hashes" | "message">;
export declare type IHarperDBInsertResponse = Pick<IHarperDBCRUDResponse, "inserted_hashes" | "skipped_hashes" | "message">;
export interface IHarpeeModelFindByIdOptions {
    id: StringOrNumber[];
    getAttributes?: string[];
}
export interface IHarperDBS3Options {
    /**
     *  what action to be performed on the data. default 'insert'
     */
    action?: Actions;
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
export interface IHarpeeModelImportOptions {
    /**
     *  what action to be performed on the data. default 'insert'
     */
    action?: Actions;
    /**
              a valid CSV string.
             */
    csv: string;
    /**
     * an absolute path to the local file. **Note: this operation only works for local instances not for cloud instances**.
     */
    filePath: string;
    /**
     * an absolute path to the external file.
     */
    csvUrl: string;
    /**
     * selects whether or not the data load will transact to any clustered instance. The default is `false`.
     */
    transactToCluster?: boolean;
}
export interface IHarpeeModelUpdateNestedOptions<V = any> {
    id: StringOrNumber;
    /**
     * a string or array of string indicating the path to a value
     *
     */
    path: HarpeePath;
    value: any | ((val: V) => any);
}
/**
 * a string or array of string indicating the path to a value
 *
 */
export declare type HarpeePath = string | string[];
export declare type IHarpeeModelImportCsvOptions = Pick<IHarpeeModelImportOptions, "action" | "csv" | "transactToCluster">;
export declare type IHarpeeModelImportCsvFileOptions = Pick<IHarpeeModelImportOptions, "action" | "filePath" | "transactToCluster">;
export declare type IHarpeeModelImportCsvUrlOptions = Pick<IHarpeeModelImportOptions, "action" | "csvUrl" | "transactToCluster">;
export declare type Actions = "insert" | "update" | "upsert";
export declare type Operators = "and" | "or";
export interface IHarpeeModelFindByValueOptions {
    /**
     * attribute you wish to search, can be any attribute.
     */
    searchAttribute: string;
    /**
     * value you wish to search - wild cards are allowed..
     */
    searchValue: StringOrNumber;
    /**
     * an array of one or more attributes to be returned, default is `["*"]` which returns all attributes.
     */
    getAttributes?: string | string[];
}
export interface IHarpeeModelFindByConditionOptions {
    /**
     * attribute you wish to search, can be any attribute.
     */
    searchAttribute: string;
    /**
     * the operator used between each condition, default is `and`
     */
    operator?: Operators;
    /**
     * the number of records that the query will skip, default `0`
     */
    offset?: number;
    /**
     * the number of records that the query result will include,default is `null`, resulting in no limit
     */
    limit?: number | null;
    /**
     * the array of condition objects, must include one or more object in the array
     */
    conditions: ISearchCondition[];
    /**
     * an array of one or more attributes to be returned, default is `["*"]` which returns all attributes.
     */
    getAttributes?: string[];
}
export interface ISearchCondition {
    /**
     * attribute you wish to search, can be any attribute.
     */
    search_attribute: string;
    /**
     * value you wish to search. if the search_type is `between` then use an array of two values to search between
     */
    search_value: StringOrNumber;
    /**
     * the type of search to perform
     */
    search_type: SearchType;
}
export declare type SearchType = "equals" | "contains" | "starts_with" | "ends_with" | "greater_than" | "greater_than_equal" | "less_than" | "less_than_equal" | "between";
