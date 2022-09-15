import { HarpeePath } from "./../interfaces/harpee/index";
import Utils from "../helpers/utils";
import {
    HarpeeID,
    HarpeeReqCallback,
    IHarpeeSchemaConfig,
} from "../interfaces/harpee";
import { IHarpeeMethodOptions } from "../interfaces/harpee-model";
import HarpeeHttp from "./harpee-http";
// const harpeeConnectConfig = require("./harpeeConnectConfig");
// const harpeeModelConfig = require("./harpeeModelConfig");
import operations from "../constants/operations";
const validator = require("../helpers/validators");
import SqlHandler from "./sql-handler";
// const HarpeeSchema = require("./harpeeSchema");

/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error.
 * @param {*} result - response data or null if an error occurs.
 */

export default class HarpeeModel extends HarpeeHttp {
    private schemaName: string;
    private modelName: string;
    private primaryKey: string;
    private silent: boolean;
    private schemaFields: IHarpeeSchemaConfig["fields"];
    constructor(modelName: string, schemaConfig: IHarpeeSchemaConfig) {
        super();

        if (!modelName || !Utils.isString(modelName)) {
            throw new Error("`modelName` is required and it must be a String");
        }
        if (modelName && !schemaConfig) {
            throw new Error("`schemaConfig` is required");
        }

        // harpeeModelConfig.setConfig({ modelName, schemaObject: schemaConfig });

        const { primaryKey, silent, fields, name } = schemaConfig;

        this.schemaName = name as string;

        this.modelName = modelName;

        this.schemaFields = fields;

        this.primaryKey = primaryKey as string;

        this.silent = silent as boolean;
    }
    /**
     * This creates the schema, table, and the attributes specified in Schema.`fields`, if they don't exist.
     * **you should get rid of this after running your app atleast once.**
     * @returns void;
     */
    async init() {
        try {
            const schema = this.schemaName;
            const table = this.modelName;
            const createSchema = async () =>
                await this.$callbackOrPromise({
                    operation: operations.CREATE_SCHEMA,
                    schema,
                });

            const describeAll = async () =>
                await this.$callbackOrPromise({
                    operation: operations.DESCRIBE_ALL,
                });

            const createTable = async () =>
                await this.$callbackOrPromise({
                    operation: operations.CREATE_TABLE,
                    schema,
                    table,
                    hash_attribute: this.primaryKey,
                });
            const createAttribute = async (attribute: string) =>
                await this.$callbackOrPromise({
                    operation: operations.CREATE_ATTRIBUTE,
                    schema,
                    table,
                    attribute,
                });

            // get information about the database
            const respA = await describeAll();
            // check if the schema already exist, else create it
            if (!respA[schema]) {
                await createSchema();
            }

            // get information about the database
            const respB = await describeAll();
            // check if the table already exist, else create it
            if (!(respB[schema] && respB[schema][table])) {
                await createTable();
            }

            // get information about the database
            const respC = await describeAll();

            // get fields from Schema.`fields`
            const fields = this.schemaFields;

            // turn the fields object into an array of strings
            const attributes = Utils.splitObject(fields).keys;

            // get previous attributes from the table
            const previousAttributes = respC[schema][table]["attributes"];

            // turn the previous attributes object into an array of strings
            const previousAttributesValues =
                Utils.ObjectArrayToStringArray(previousAttributes);

            // loop through attributes from `fields`
            const attributeLoop = async () => {
                for (let attribute of attributes) {
                    // create the attribute if it's not in the previous attribute
                    if (!previousAttributesValues.includes(attribute)) {
                        await createAttribute(attribute);
                    }
                }
            };
            await attributeLoop();
        } catch (err) {
            console.error(err);
        }
    }
    /**
    * Execute custom SQL queries.

    * 

    */
    async query<T extends object>(
        sqlQuery: string,
        callback: HarpeeReqCallback<T>
    ): Promise<T | any | void> {
        try {
            const response = await this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: sqlQuery,
                },
                callback
            );
            if (!Utils.isUndefined(response)) {
                return Promise.resolve(response);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /**
    * Get details about your model, alias for `describe_table` 

    */
    async describeModel(callback) {
        try {
            const res = await this.$callbackOrPromise(
                {
                    operation: operations.DESCRIBE_TABLE,
                    schema: this.schemaName,
                    table: this.modelName,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (err) {
            return Promise.reject(err);
        }
    }
    /** 
    * Returns all data from the table.
    * @param  options - an array of columns or an object with options.
 

    */
    async find(
        options: string[] | IHarpeeMethodOptions,
        callback
    ): Promise<any | void> {
        try {
            let getAttr, limit, offset, orderby, order, where, and;
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
                getAttr = options;
            } else {
                const _options = options as IHarpeeMethodOptions;
                limit = _options.limit;
                offset = limit && _options.offset ? _options.offset : null;
                orderby = _options.orderby;
                order = orderby && _options.order ? _options.order : null;
                where = _options.where;
                and = where && _options.and;

                getAttr = _options.getAttributes || ["*"];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .select(getAttr)
                .from(schema, table)
                .where(where)
                .and(and)
                .orderBy(orderby)
                .order(order)
                .limit(limit)
                .offset(offset);

            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Returns one or more data from the table matching the specified `primaryKey` values.
    * @param {((string|number)[] | {id:(string|number)[],getAttributes?:string[]})} ids 
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
    async findById(ids, callback) {
        try {
            let idValues,
                getAttributes = ["*"],
                idKey = this.primaryKey;
            if (Utils.isArray(ids)) {
                idValues = ids;
            } else {
                idValues = ids.id;
                getAttributes = ids.getAttributes || ["*"];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .select(getAttributes)
                .from(schema, table)
                .where(idKey)
                .in(idValues);

            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );

            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
    * Returns a single data from the table matching the specified value.
    * 
    * @param {{[key:string]:any}} attrObj
    * @param {string[]} [getAttributes]
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
    async findOne(attrObj, getAttributes, callback) {
        try {
            getAttributes = ["*"];
            if (arguments.length >= 2 && Utils.isArray(arguments[1])) {
                getAttributes = arguments[1];
            }
            let attrKey, attrValue;
            if (!Utils.isObject(attrObj)) {
                throw new TypeError("`attrObj` param must be an object");
            } else {
                attrKey = Utils.splitObject(attrObj).keys[0];
                attrValue = Utils.splitObject(attrObj).values[0];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .select(getAttributes)
                .from(schema, table)
                .where(attrKey)
                .equalTo(attrValue);

            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback,
                true
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /** 
    * Deletes data from the table, matching the specified ids.
    *
    * @param {(string[] | number[])} ids - an array of values of your `primaryKey`.
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
    async findByIdAndRemove(ids, callback) {
        try {
            if (!Utils.isArray(ids)) {
                throw new Error("`ids` must be an array");
            }
            const hash_values = ids;
            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.DELETE,
                    schema: this.schemaName,
                    table: this.modelName,
                    hash_values,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Deletes multiple data from the table based on the specified values.
    *
    * @param {{[key:string]:any}} attrObj
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

    async findAndRemove(attrObj, callback) {
        try {
            let attrKey, attrValues;
            if (!Utils.isObject(attrObj)) {
                throw new TypeError("`attrObj` param must be an object");
            }

            attrKey = Utils.splitObject(attrObj).keys[0];
            attrValues = Utils.splitObject(attrObj).values[0];
            if (!Utils.isArray(attrValues)) {
                attrValues = [attrValues];
            }

            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler
                .delete()
                .from(schema, table)
                .where(attrKey)
                .in(attrValues);

            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * find nested values
     */

    async findNested(
        options: { id: HarpeeID; path: HarpeePath; value: any },
        callback
    ) {
        if (!Utils.isObject(options)) {
            throw new TypeError("updateNested `options` must be an object");
        }
        const { path, value, id } = options;
        const schema = this.schemaName;
        const table = this.modelName;
        const primaryKey = this.primaryKey;
        try {
            const { query } = new SqlHandler()
                .select(["*"])
                .from(schema, table)
                .where(primaryKey)
                .equalTo(id);
            const initResponse = await this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                undefined,
                true
            );
            if (initResponse) {
                Utils.safeSet(initResponse, path, value);
            }

            const res = await this.$callbackOrPromise(
                {
                    operation: operations.UPDATE,
                    schema: this.schemaName,
                    table: this.modelName,
                    records: [initResponse],
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * update nested values
     */

    async updateNested(
        options: { id: HarpeeID; path: HarpeePath; value: any },
        callback
    ) {
        if (!Utils.isObject(options)) {
            throw new TypeError("updateNested `options` must be an object");
        }
        const { path, value, id } = options;
        const schema = this.schemaName;
        const table = this.modelName;
        const primaryKey = this.primaryKey;
        try {
            const { query } = new SqlHandler()
                .select(["*"])
                .from(schema, table)
                .where(primaryKey)
                .equalTo(id);
            const initResponse = await this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                undefined,
                true
            );
            if (initResponse) {
                Utils.safeSet(initResponse, path, value);
            }

            const res = await this.$callbackOrPromise(
                {
                    operation: operations.UPDATE,
                    schema: this.schemaName,
                    table: this.modelName,
                    records: [initResponse],
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Updates the table with the specified records.
    * @param records - an array of one or more records to be updated, **Note: the records must include their ids**.
 
    * 

    */

    async update(
        records: { [key: string]: any }[],
        callback
    ): Promise<any | void> {
        try {
            if (!Utils.isArray(records)) {
                records = [records];
            }

            const res = await this.$callbackOrPromise(
                {
                    operation: operations.UPDATE,
                    schema: this.schemaName,
                    table: this.modelName,
                    records,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Inserts new record to the table,
     *
     * @param newRecord - an object of the new record to be created.
     * @param {responseCallback} [callback]
     *
     */
    async create(
        newRecord: { [key: string]: any },
        callback
    ): Promise<any | void> {
        try {
            if (!Utils.isObject(newRecord)) {
                throw new TypeError(" `newRecord` must be an object");
            }

            // validator show throw error for unmatched types
            if (!this.silent) {
                validator(this.schemaFields, newRecord);
            }

            const res = await this.$callbackOrPromise(
                {
                    operation: operations.INSERT,
                    schema: this.schemaName,
                    table: this.modelName,
                    records: [newRecord],
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Inserts multiple new records to the table,
    * **Note: this method does not validate the types in your schema.**
    * 
    * @param  newRecords - an array of one or more records to be created.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */

    async createMany(newRecords: { [key: string]: any }[], callback) {
        try {
            if (!Utils.isArray(newRecords)) {
                newRecords = [newRecords];
            }

            const res = await this.$callbackOrPromise(
                {
                    operation: operations.INSERT,
                    schema: this.schemaName,
                    table: this.modelName,
                    records: newRecords,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Load data to a table from a CSV string.
    * @param {Object} options
    * @param {string} options.csv - a valid CSV string.
    * @param {('insert'|'update'|'upsert')} [options.action='insert'] - what action to be performed on the data.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
    async importFromCsv(options, callback) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError(" `options` must be an object");
            }
            const data = options.csv;
            const action = options.action || operations.INSERT;
            if (!data || !Utils.isString(data)) {
                throw new Error(
                    " `options.csv` is required and it should be a string"
                );
            }

            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.CSV_DATA_LOAD,
                    action,
                    schema: this.schemaName,
                    table: this.modelName,
                    data,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Load data to a table from a local CSV file.
    * @param {Object} options
    * @param {string} options.filePath - an absolute path to the local file. **Note: this operation only works for local instances not for cloud instances**.
    * @param {('insert'|'update'|'upsert')} [options.action='insert'] - what action to be performed on the data.
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
    async importFromCsvFile(options, callback) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError("`options` is required and must be object");
            }
            const action = options.action ? options.action : operations.INSERT;
            const file_path = options.filePath;
            if (!file_path || !Utils.isString(file_path)) {
                throw new Error(
                    "`options.filePath` is required and must be a string"
                );
            }

            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.CSV_FILE_LOAD,
                    action,
                    schema: this.schemaName,
                    table: this.modelName,
                    file_path,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
    * Load data to a table from an external  CSV file.
    * @param {Object} options
    * @param {string} options.fileUrl - an absolute path to the external file.
     * @param {('insert'|'update'|'upsert')} [options.action='insert'] - what action to be performed on the data.

    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
     * @returns {(Promise<any> | void)}

    */
    async importFromCsvUrl(options, callback) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError("`options` is required and must be object");
            }

            const action = options.action || operations.INSERT;
            const csv_url = options.fileUrl;
            if (!csv_url || !Utils.isString(csv_url)) {
                throw new Error("`options.fileUrl` is required ");
            }

            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.CSV_URL_LOAD,
                    action,
                    schema: this.schemaName,
                    table: this.modelName,
                    csv_url,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Load data to a table from amazon S3.
    * @param {Object} options
    * @param {string} options.bucket - the name of the bucket where your file lives.
    * @param {string} options.awsAccessKeyId - your aws access key id.
    * @param {string} options.awsSecretAccessKey - your aws secret access key.
    * @param {string} options.key - the name of the file to import - *the file must include a valid file extension ('.csv' or '.json')*.
    * @param {('insert'|'update'|'upsert')} [options.action='insert'] - what action to be performed on the data.
    * @param {responseCallback} [callback] 
     * @returns {(Promise<any> | void)}

    */
    async importFromS3(options, callback) {
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

            const res = await /** @private */ this.$callbackOrPromise(
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
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Deletes every data from the table, **use this with caution**;
    *
    * @param {responseCallback} [callback] - an optional callback function.
    * @returns {(Promise<any> | void)}

    */
    async clearAll(callback) {
        try {
            const schema = this.schemaName;
            const table = this.modelName;
            const sqlHandler = new SqlHandler();

            const { query } = sqlHandler.delete().from(schema, table);
            const res = await /** @private */ this.$callbackOrPromise(
                {
                    operation: operations.SQL,
                    sql: query,
                },
                callback
            );
            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    * Return data from table using matching conditions.
    * @param {Object} options
    * @param {(number | null)} [options.limit=null] - a limit of data to be returned, default is `null`.
    * @param {number} [options.offset=0] - number of data to be skipped, default is `0`.
    * @param {('and'|'or')} [options.operator='and'] - the operator used between each condition.
    * @param {string[]} [options.getAttributes] - an array of one or more attributes to be returned, default is `["*"]` which returns all attributes.
    * @param {object[]} options.conditions - an array of one or more object with search operations.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
    async findByConditions(options, callback) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError(
                    "findByConditions `options` must be an object"
                );
            }
            if (!Utils.isArray(options.conditions)) {
                throw new TypeError(" `options.condition` must be an array");
            }
            let res;
            const limit = +options.limit || null;
            const operator = options.operator || "and";
            const offset = +options.offset || 0;
            const get_attributes = options.getAttributes || ["*"];
            const conditions = options.conditions;
            res = await /** @private */ this.$callbackOrPromise(
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

            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    /**
    *  Returns data from a table with matching values.
    * @param {Object} options
    * @param {string[]} [options.getAttributes] - an array of one or more attributes to be returned, default is `["*"]` which returns all attributes.
    * @param {object[]} options.searchAttribute -  attribute you wish to search, can be any attribute.
    * @param {string} options.searchValue - value you wish to search - wild cards are allowed..
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */

    async findByValue(options, callback) {
        try {
            if (!Utils.isObject(options)) {
                throw new TypeError("findByValue `options` must be an object");
            }
            if (!Utils.isArray(options.getAttributes)) {
                options.getAttributes = [options.getAttributes];
            }

            const search_attribute = options.searchAttribute;
            const search_value = options.searchValue;
            const get_attributes = options.getAttributes || ["*"];
            if (!(search_attribute || search_value)) {
                throw new Error(
                    "`searchAttribute` and `searchValue` are required"
                );
            }
            const res = await /** @private */ this.$callbackOrPromise(
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

            if (!Utils.isUndefined(res)) {
                return Promise.resolve(res);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
