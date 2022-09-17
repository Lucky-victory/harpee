import { IHarpeeModelFindByIdOptions, IHarpeeModelFindByValueOptions, IHarpeeModelFindByConditionOptions, IHarperDBS3Options, IHarpeeModelImportCsvFileOptions, IHarpeeModelImportCsvUrlOptions, IHarpeeModelImportCsvOptions, IHarperDBDeleteResponse, IHarperDBUpdateResponse, IHarperDBInsertResponse, IHarpeeModelUpdateNestedOptions } from "../interfaces/harpee-model.interface";
import { IHarpeeResponse } from "../interfaces/harpee.interface";
import { StringOrNumber, HarpeeResponseCallback } from "../interfaces/harpee.interface";
import { IHarpeeModelFindOptions } from "../interfaces/harpee-model.interface";
import { HarpeeHttp } from "./harpee-http";
import { HarpeeSchema } from "./harpee-schema";
import { IHarperDBMessageResponse } from "../interfaces/harpee-utilities.interface";
export declare class HarpeeModel extends HarpeeHttp {
    private schemaName;
    private modelName;
    private primaryKey;
    private silent;
    private schemaFields;
    constructor(modelName: string, schemaConfig: HarpeeSchema);
    /**
     * This creates the schema, table, and the attributes specified in Schema.`fields`, if they don't exist.
     * **you should get rid of this after running your app atleast once.**
     *
     */
    init(): Promise<unknown | void>;
    /**
     * Execute custom SQL queries.
     *
     */
    query<T = object[]>(sqlQuery: string, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Get details about your model, alias for `describe_table`

    */
    describeModel<T = object>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Returns all data from the table.
    * @param  options - an array of columns or an object with options.
 

    */
    find<T = object[]>(options: string[] | IHarpeeModelFindOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Returns one or more data from the table matching the specified `primaryKey` values.
     *
     */
    findById<T = object[]>(ids: StringOrNumber[] | IHarpeeModelFindByIdOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Returns a single data from the table matching the specified value.

    */
    findOne<T = object>(obj: {
        [key: string]: StringOrNumber;
    }, getAttributes?: string[], callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Deletes data from the table, matching the specified ids.
    *
    * @param  ids - an array of values of your `primaryKey`.


    */
    findByIdAndRemove<T = IHarperDBDeleteResponse>(ids: StringOrNumber[], callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Deletes multiple data from the table based on the specified values.
  
    */
    findAndRemove<T = object>(obj: {
        [key: string]: StringOrNumber | StringOrNumber[];
    }, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Update nested values
     * @example
     * ```
     * // let's say you have the following data
     * {id:1,username:'luckyv', friends:[{age:20,name:'mike'},{age:24,name:'jane'}]
     * }
     * // example 1
     * // this will update the name of first item in the array from 'mike' to 'debbie'
     * myUsersModel.updateNested({
     * id:1,path:'friends.0.name',value:'debbie'})
     *
     * // example 2
     *  myUsersModel.updateNested({
     * id:1,path:['friends,'0','age'],value:(data)=> {
     * // update the value
     * data.friends[1].age += 10;
     * // the return it
     * return data.friends
     * })
     * // example 3
     *  myUsersModel.updateNested({
     * id:1,path:'username',value:'luckyvictory'
     * })
     *
     * ```
     */
    updateNested<T = IHarperDBUpdateResponse, V = object>(options: IHarpeeModelUpdateNestedOptions<V>, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Updates the table with the specified records.
    * @param records - an array of one or more records to be updated, **Note: the records must include their ids**.
 
    *

    */
    update<T = IHarperDBUpdateResponse>(records: {
        [key: string]: any;
    }[], callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Inserts new record to the table,
     *
     * @param newRecord - an object of new record to be created.
     *
     */
    create<T = IHarperDBInsertResponse>(newRecord: {
        [key: string]: any;
    }, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Inserts multiple new records to the table,
     * **Note: this method does not validate the types in your schema.**
     *
     * @param  newRecords - an array of one or more records to be created.
     */
    createMany<T = IHarperDBInsertResponse>(newRecords: {
        [key: string]: any;
    }[], callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Load data to a table from a CSV string.
   
     */
    importFromCsv<T = IHarperDBMessageResponse>(options: IHarpeeModelImportCsvOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Load data to a table from a local CSV file.
     */
    importFromCsvFile<T = IHarperDBMessageResponse>(options: IHarpeeModelImportCsvFileOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Load data to a table from an external  CSV file.


    */
    importFromCsvUrl<T = IHarperDBMessageResponse>(options: IHarpeeModelImportCsvUrlOptions, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
    * Load data to a table from amazon S3.

    */
    importFromS3<T = IHarperDBMessageResponse>(options: IHarperDBS3Options, callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Deletes every data from the table, **use this with caution**;
     */
    clearAll<T = object>(callback?: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     * Return data from table using matching conditions.
     */
    findByConditions<T = object[]>(options: IHarpeeModelFindByConditionOptions, callback: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
    /**
     *  Returns data from a table with matching values.
     */
    findByValue<T = object[]>(options: IHarpeeModelFindByValueOptions, callback: HarpeeResponseCallback<T>): Promise<IHarpeeResponse<T> | undefined>;
}
