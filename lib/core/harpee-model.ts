import {
    IHarpeeModelFindByIdOptions,
    IHarpeeModelFindByValueOptions,
    IHarpeeModelFindByConditionOptions,
    IHarperDBS3Options,
    IHarpeeModelImportCsvFileOptions,
    IHarpeeModelImportCsvUrlOptions,
    IHarpeeModelImportCsvOptions,
    IHarperDBDeleteResponse,
    IHarperDBUpdateResponse,
    IHarperDBInsertResponse,
    IHarpeeModelUpdateNestedOptions,
} from "../interfaces/harpee-model.interface";
import {
    AnyKeyValueObject,
    IHarpeeResponse,
    Order,
} from "../interfaces/harpee.interface";
import Utils from "../helpers/utils";
import {
    StringOrNumber,
    HarpeeResponseCallback,
    IHarpeeSchemaConfig,
} from "../interfaces/harpee.interface";
import { IHarpeeModelFindOptions } from "../interfaces/harpee-model.interface";
import { HarpeeHttp } from "./harpee-http";
import { ValidationError } from "joi";
import operations from "../constants/operations";

import { SqlHandler } from "./sql-handler";
import { HarpeeSchema } from "./harpee-schema";
import { IHarperDBMessageResponse } from "../interfaces/harpee-utilities.interface";
import { HarpeeUtilities } from "./harpee-utilities";
import { SchemaValidator } from "../helpers/validators/schema";

/**
 * A model represents a table, each model is connected with a table specified as `modelName`
 */
export class HarpeeModel extends HarpeeHttp {
    private schemaName: string;
    private modelName: string;
    private primaryKey: string;
    private silent: boolean;
    private schemaFields: IHarpeeSchemaConfig["fields"];
    /**
     *
     * @param modelName - the name of the model, alias table
     * @param schemaConfig
     */
    constructor(modelName: string, schemaConfig: HarpeeSchema) {
        super();

        if (!modelName || !Utils.isString(modelName)) {
            throw new Error("`modelName` is required and it must be a String");
        }
        if (modelName && !this.schemaConfig) {
            throw new Error("`schemaConfig` is required");
        }

        // harpeeModelConfig.setConfig({ modelName, schemaObject: schemaConfig });

        const { primaryKey, silent, fields, name } = this.schemaConfig;

        this.schemaName = name as string;

        this.modelName = modelName;

        this.schemaFields = fields;

        this.primaryKey = primaryKey as string;
        this.silent = silent as boolean;
    }
    /**
     * This creates the schema, table, and the attributes specified in Schema.`fields`, if they don't exist.
     * **you should get rid of this after running your app atleast once.**
     *
     */
    async init(): Promise<unknown | void> {
        const harpeeUtils = new HarpeeUtilities();
        try {
            const schema = this.schemaName;
            const table = this.modelName;
            const primaryKey = this.primaryKey;
            const createSchema = async () =>
                await harpeeUtils.createSchema({
                    schema,
                });
            const describeAll = async () => await harpeeUtils.describeAll();

            const createTable = async () =>
                await harpeeUtils.createTable({
                    schema,
                    table,
                    hashAttribute: primaryKey,
                });
            const createAttribute = async (attribute: string) =>
                await harpeeUtils.createAttribute({
                    schema,
                    table,
                    attribute,
                });

            // get information about the database
            const respA = await describeAll();
            // check if the schema already exist, else create it
            if (!(respA?.data as any)[schema]) {
                await createSchema();
            }

            // get information about the database
            const respB = await describeAll();
            // check if the table already exist, else create it
            if (
                !((respB?.data as any) && (respB?.data as any)[schema][table])
            ) {
                await createTable();
            }

            // get information about the database
            const responseC = await describeAll();

            // get fields from Schema.`fields`
            const fields = this.schemaFields;

            // turn the fields object into an array of strings
            const attributes = Utils.splitObject(fields).keys;

            // get previous attributes from the table
            const previousAttributes = (responseC?.data as any)[schema][table][
                "attributes"
            ];

            // turn the previous attributes object into an array of strings
            const previousAttributesValues =
                Utils.ObjectArrayToStringArray(previousAttributes);

            // loop through attributes from `fields`
            const createAttributes = async () => {
                for (const attribute of attributes) {
                    // create the attribute if it's not in the previous attributes
                    if (!previousAttributesValues.includes(attribute)) {
                        await createAttribute(attribute);
                    }
                }
            };
            await createAttributes();
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
     * Execute custom SQL queries.
     *
     */
    async query<T = object[]>(
        sqlQuery: string,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SQL,
                    sql: sqlQuery,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Get details about your model, alias for `describe_table` 

    */
    async describeModel<T = object>(callback?: HarpeeResponseCallback<T>) {
        try {
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DESCRIBE_TABLE,
                    schema: this.schemaName,
                    table: this.modelName,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /** 
    * Returns all data from the table.
    * @param  options - an array of columns or an object with options.
 

    */
    async find<T = object[]>(
        options: string[] | IHarpeeModelFindOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            let getAttr: string[],
                limit!: number,
                offset!: number | null,
                orderby!: string[],
                order!: Order | null,
                where!: string,
                and!: string | number;
            if (!(Utils.isObject(options) || Utils.isArray(options))) {
                throw new TypeError(
                    " find `options` must be an object or an array"
                );
            }
            if (
                (Utils.isArray(options) || Utils.isObject(options)) &&
                Utils.isEmpty(options)
            ) {
                getAttr = ["*"];
            } else if (Utils.isArray(options) && !Utils.isEmpty(options)) {
                getAttr = options as string[];
            } else {
                const _options = options as IHarpeeModelFindOptions;
                limit = _options.limit as number;
                offset = limit && _options.offset ? _options.offset : null;
                orderby = _options.orderby as string[];
                order = orderby && _options.order ? _options.order : null;
                where = _options.where as string;
                and = where && (_options.and as string | number);

                getAttr = _options.getAttributes || ["*"];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .select(getAttr as string[])
                .from(schema, table)
                .where(where)
                .and(and)
                .orderBy(orderby)
                .order(order as Order)
                .limit(limit)
                .offset(offset as number);

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Returns one or more data from the table matching the specified `primaryKey` values.
     *
     */

    async findById<T = object[]>(
        ids: StringOrNumber[] | IHarpeeModelFindByIdOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            let idValues!: StringOrNumber[],
                getAttributes = ["*"],
                idKey = this.primaryKey;
            if (Utils.isArray(ids)) {
                idValues = ids as StringOrNumber[];
            } else {
                const { getAttributes: getAttr, id } =
                    ids as IHarpeeModelFindByIdOptions;
                idValues = id;
                getAttributes = getAttr || ["*"];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .select(getAttributes)
                .from(schema, table)
                .where(idKey)
                .in(idValues);

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );

            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
    * Returns a single data from the table matching the specified value.

    */
    async findOne<T = object>(
        obj: { [key: string]: StringOrNumber },
        getAttributes?: string[],
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            getAttributes = getAttributes || ["*"];
            if (arguments.length >= 2 && Utils.isArray(arguments[1])) {
                getAttributes = arguments[1];
            }
            let attrKey!: string, attrValue!: string;
            if (!Utils.isObject(obj)) {
                throw new TypeError("`obj` param must be an object");
            } else {
                attrKey = Utils.splitObject(obj).keys[0];
                attrValue = Utils.splitObject(obj).values[0];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .select(getAttributes as string[])
                .from(schema, table)
                .where(attrKey)
                .equalTo(attrValue);

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback,
                true
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /** 
    * Deletes data from the table, matching the specified ids.
    *
    * @param  ids - an array of values of your `primaryKey`.


    */
    async findByIdAndRemove<T = IHarperDBDeleteResponse>(
        ids: StringOrNumber[],
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isArray(ids)) {
                throw new Error("`ids` must be an array");
            }
            const hash_values = ids;
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DELETE,
                    schema: this.schemaName,
                    table: this.modelName,
                    hash_values,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Deletes multiple data from the table based on the specified values.
  
    */

    async findAndRemove<T = object>(
        obj: { [key: string]: StringOrNumber | StringOrNumber[] },
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            let attrKey!: string,
                attrValues!: StringOrNumber | StringOrNumber[];
            if (!Utils.isObject(obj)) {
                throw new TypeError("`obj` param must be an object");
            }

            attrKey = Utils.splitObject(obj).keys[0];
            attrValues = obj[attrKey];
            if (!Utils.isArray(attrValues)) {
                attrValues = [attrValues as StringOrNumber];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .delete()
                .from(schema, table)
                .where(attrKey)
                .in(attrValues as StringOrNumber[]);

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

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

    async updateNested<T = IHarperDBUpdateResponse | object, V = object>(
        options: IHarpeeModelUpdateNestedOptions<V>,
        callback?: HarpeeResponseCallback<T>
    ) {
        if (!Utils.isObject(options)) {
            throw new TypeError("updateNested `options` must be an object");
        }
        const { path, value, id, returnData = true } = options;
        const schema = this.schemaName;
        const table = this.modelName;
        const primaryKey = this.primaryKey;
        let isDataCallback: boolean = false;
        try {
            const { query } = new SqlHandler()
                .select(["*"])
                .from(schema, table)
                .where(primaryKey)
                .equalTo(id);
            // query the database to get the data
            const initResponse = await this.$callbackOrPromise<V>(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                undefined,
                true
            );

            // update the data
            if (initResponse?.data) {
                if (Utils.isFunction(value)) {
                    Utils.safeSet(
                        initResponse.data,
                        path,
                        value(initResponse.data)
                    );
                } else {
                    Utils.safeSet(initResponse.data, path, value);
                }
            }
            if (returnData && Utils.isFunction(callback)) {
                isDataCallback = true;
            }
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.UPDATE,
                    schema: this.schemaName,
                    table: this.modelName,
                    records: [initResponse?.data],
                },

                isDataCallback ? undefined : callback
            );
            if (isDataCallback) {
                (callback as HarpeeResponseCallback<T>)(null, {
                    data: initResponse?.data as unknown as T,
                    success: true,
                    error: null,
                });
            }
            if (!Utils.isUndefined(response) && !isDataCallback) {
                if (returnData) {
                    return Promise.resolve({
                        data: initResponse?.data,
                        success: true,
                        error: null,
                    }) as Promise<IHarpeeResponse<T>>;
                }
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Updates the table with the specified records.
     * @param records - an array of one or more records to be updated, **Note: the records must include their primary key (e.g id)**.
     *
     */

    async update<T = IHarperDBUpdateResponse>(
        records: AnyKeyValueObject[],
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isArray(records)) {
                records = [records];
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.UPDATE,
                    schema: this.schemaName,
                    table: this.modelName,
                    records,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Inserts new record to the table,
     *
     * @param newRecord - an object of new record to be created.
     *
     */
    async create<T = IHarperDBInsertResponse>(
        newRecord: AnyKeyValueObject,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(newRecord)) {
                throw new TypeError(" `newRecord` must be an object");
            }

            const { error, value } = SchemaValidator.validate(
                this.schemaConfig,
                newRecord
            ) as {
                error: ValidationError | undefined;
                value: any;
            };

            newRecord = value;
            if (error && !this.silent) throw error;

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.INSERT,
                    schema: this.schemaName,
                    table: this.modelName,
                    records: [newRecord],
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Inserts multiple new records to the table,
     *
     *
     * @param {AnyKeyValueObject[]} newRecords - an array of one or more records to be created.
     */

    async createMany<T = IHarperDBInsertResponse>(
        newRecords: AnyKeyValueObject[],
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isArray(newRecords)) {
                throw new TypeError("'newRecords' must be an array");
            }

            const validationResults = SchemaValidator.validate(
                this.schemaConfig,
                newRecords
            ) as {
                error: ValidationError[];
                value: any[];
            };

            const validationErrors = validationResults.error;

            newRecords = validationResults.value;
            // only throw an error when `silent` is false
            if (validationErrors?.length && !this.silent)
                throw validationErrors;

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.INSERT,
                    schema: this.schemaName,
                    table: this.modelName,
                    records: newRecords,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Load data to a table from a CSV string.
   
     */
    async importFromCsv<T = IHarperDBMessageResponse>(
        options: IHarpeeModelImportCsvOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError(" `options` must be an object");
            }
            const data = options.csv;
            const action = options.action || operations.INSERT;
            const transact_to_cluster = options.transactToCluster;
            if (!data || !Utils.isString(data)) {
                throw new Error(
                    " `options.csv` is required and it should be a string"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CSV_DATA_LOAD,
                    action,
                    schema: this.schemaName,
                    table: this.modelName,
                    data,
                    transact_to_cluster,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Load data to a table from a local CSV file.
     */
    async importFromCsvFile<T = IHarperDBMessageResponse>(
        options: IHarpeeModelImportCsvFileOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError("`options` is required and must be object");
            }
            const action = options.action ? options.action : operations.INSERT;
            const file_path = options.filePath;
            const transact_to_cluster = options.transactToCluster;
            if (!file_path || !Utils.isString(file_path)) {
                throw new Error(
                    "`options.filePath` is required and must be a string"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CSV_FILE_LOAD,
                    action,
                    schema: this.schemaName,
                    table: this.modelName,
                    file_path,
                    transact_to_cluster,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
    * Load data to a table from an external  CSV file.


    */
    async importFromCsvUrl<T = IHarperDBMessageResponse>(
        options: IHarpeeModelImportCsvUrlOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError("`options` is required and must be object");
            }

            const action = options.action || operations.INSERT;
            const csv_url = options.csvUrl;
            const transact_to_cluster = options.transactToCluster;
            if (!csv_url || !Utils.isString(csv_url)) {
                throw new Error(
                    "`options.fileUrl` is required and must be a string"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.CSV_URL_LOAD,
                    action,
                    schema: this.schemaName,
                    table: this.modelName,
                    csv_url,
                    transact_to_cluster,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
    * Load data to a table from amazon S3.

    */
    async importFromS3<T = IHarperDBMessageResponse>(
        options: IHarperDBS3Options,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError("`options` must be an object");
            }
            const action = options.action || operations.INSERT;
            const aws_access_key_id = options.awsAccessKeyId;
            const aws_secret_access_key = options.awsSecretAccessKey;
            const { bucket, key } = options;

            if (
                !(aws_access_key_id || aws_secret_access_key || bucket || key)
            ) {
                throw new Error(
                    "`awsAccessKeyId`, `awsSecretAccessKey`, `bucket` and `key` are required "
                );
            }
            if (
                key &&
                (Utils.getExtname(key) !== "csv" ||
                    Utils.getExtname(key) !== "json")
            ) {
                throw new Error(
                    "the file extension is invalid , only a `.csv` or `.json` file is acceptable"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.IMPORT_FROM_S3,
                    action,
                    schema: this.schemaName,
                    table: this.modelName,
                    s3: {
                        aws_access_key_id,
                        aws_secret_access_key,
                        bucket,
                        key,
                    },
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
    /**
     * Deletes every data from the table, **use this with caution**;
     */
    async clearAll<T = object>(callback?: HarpeeResponseCallback<T>) {
        try {
            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler.delete().from(schema, table);
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     * Return data from table using matching conditions.
     */
    async findByConditions<T = object[]>(
        options: IHarpeeModelFindByConditionOptions,
        callback: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError(
                    "findByConditions `options` must be an object"
                );
            }
            if (!Utils.isArray(options.conditions)) {
                throw new TypeError(" `options.condition` must be an array");
            }

            const limit = +(options.limit as number) || null;
            const operator = options.operator || "and";
            const offset = +(options.offset as number) || 0;
            const get_attributes = options.getAttributes || ["*"];
            const conditions = options.conditions;
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SEARCH_BY_CONDITIONS,
                    schema: this.schemaName,
                    table: this.modelName,
                    operator,
                    limit,
                    offset,
                    conditions,
                    get_attributes,
                },
                callback
            );

            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }

    /**
     *  Returns data from a table with matching values.
     */

    async findByValue<T = object[]>(
        options: IHarpeeModelFindByValueOptions,
        callback: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError("findByValue `options` must be an object");
            }
            if (!Utils.isArray(options.getAttributes)) {
                options.getAttributes = [options.getAttributes as string];
            }

            const search_attribute = options.searchAttribute;
            const search_value = options.searchValue;
            const get_attributes = options.getAttributes || ["*"];
            if (
                Utils.isUndefined(search_attribute) ||
                Utils.isUndefined(search_value)
            ) {
                throw new Error(
                    "`searchAttribute` and `searchValue` are required"
                );
            }
            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SEARCH_BY_VALUE,
                    schema: this.schemaName,
                    table: this.modelName,
                    search_attribute,
                    search_value,
                    get_attributes,
                },
                callback
            );

            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (error) {
            if (Utils.isFunction(callback)) {
                return (callback as HarpeeResponseCallback)(error, null);
            }
            return Promise.reject(error);
        }
    }
}
