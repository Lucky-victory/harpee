import { IHarpeeModelFindByIdOptions, IHarpeeModelFindByValueOptions, IHarpeeModelFindByConditionOptions, IHarperDBS3Options, IHarpeeModelImportCsvFileOptions, IHarpeeModelImportCsvUrlOptions, IHarpeeModelImportCsvOptions, IHarperDBDeleteResponse, IHarperDBUpdateResponse, IHarperDBInsertResponse, IHarpeeModelUpdateNestedOptions } from "../interfaces/harpee-model.interface";
import { AnyKeyValueObject, IHarpeeResponse } from "../interfaces/harpee.interface";
import { StringOrNumber, HarpeeResponseCallback } from "../interfaces/harpee.interface";
import { IHarpeeModelFindOptions } from "../interfaces/harpee-model.interface";
import { HarpeeHttp } from "./harpee-http";
import { HarpeeSchema } from "./harpee-schema";
import { IHarperDBMessageResponse } from "../interfaces/harpee-utilities.interface";
/**
 * A model represents a table, each model is connected with a table specified as `modelName`
 */
export declare class HarpeeModel extends HarpeeHttp {
    private schemaName;
    private modelName;
    private primaryKey;
    private silent;
    private schemaFields;
    /**
     *
     * @param modelName - the name of the model, alias table
     * @param schemaConfig
     */
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
    describeModel<T = object>(callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
    * Returns all data from the table.
    * @param  options - an array of columns or an object with options.
 

    */
    find<T = object[]>(options: string[] | IHarpeeModelFindOptions, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Returns one or more data from the table matching the specified `primaryKey` values.
     *
     */
    findById<T = object[]>(ids: StringOrNumber[] | IHarpeeModelFindByIdOptions, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
    * Returns a single data from the table matching the specified value.

    */
    findOne<T = object>(obj: {
        [key: string]: StringOrNumber;
    }, getAttributes?: string[], callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
    * Deletes data from the table, matching the specified ids.
    *
    * @param  ids - an array of values of your `primaryKey`.


    */
    findByIdAndRemove<T = IHarperDBDeleteResponse>(ids: StringOrNumber[], callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
    * Deletes multiple data from the table based on the specified values.
  
    */
    findAndRemove<T = object>(obj: {
        [key: string]: StringOrNumber | StringOrNumber[];
    }, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Update nested values by specifying a path.
     *
     * #### Example
     *
     * ```js
     * // using the following sample data
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
     * return data.friends[1].age
     * })
     * // example 3
     *  myUsersModel.updateNested({
     * id:1,path:'friends',value:(data)=> {
     * // add a new item
     * data.friends.push({name:'bobby',age:32})
     * return data.friends
     * }
     * })
     *
     * ```
     */
    updateNested<T = IHarperDBUpdateResponse | object, V = object>(options: IHarpeeModelUpdateNestedOptions<V>, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Updates the table with the specified records.
     * @param records - an array of one or more records to be updated, **Note: the records must include their primary key (e.g id)**.
     *
     */
    update<T = IHarperDBUpdateResponse>(records: AnyKeyValueObject[], callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Inserts new record to the table,
     *
     * @param newRecord - an object of new record to be created.
     *
     */
    create<T = IHarperDBInsertResponse>(newRecord: AnyKeyValueObject, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Inserts multiple new records to the table,
     *
     *
     * @param {AnyKeyValueObject[]} newRecords - an array of one or more records to be created.
     */
    createMany<T = IHarperDBInsertResponse>(newRecords: AnyKeyValueObject[], callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Load data to a table from a CSV string.
   
     */
    importFromCsv<T = IHarperDBMessageResponse>(options: IHarpeeModelImportCsvOptions, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Load data to a table from a local CSV file.
     */
    importFromCsvFile<T = IHarperDBMessageResponse>(options: IHarpeeModelImportCsvFileOptions, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
    * Load data to a table from an external  CSV file.


    */
    importFromCsvUrl<T = IHarperDBMessageResponse>(options: IHarpeeModelImportCsvUrlOptions, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
    * Load data to a table from amazon S3.

    */
    importFromS3<T = IHarperDBMessageResponse>(options: IHarperDBS3Options, callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Deletes every data from the table, **use this with caution**;
     */
    clearAll<T = object>(callback?: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     * Return data from table using matching conditions.
     */
    findByConditions<T = object[]>(options: IHarpeeModelFindByConditionOptions, callback: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
    /**
     *  Returns data from a table with matching values.
     */
    findByValue<T = object[]>(options: IHarpeeModelFindByValueOptions, callback: HarpeeResponseCallback<T>): Promise<void | IHarpeeResponse<T>>;
}
