export = HarpeeModel;
/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error.
 * @param {*} result - response data or null if an error occurs.
 */
declare class HarpeeModel extends HarpeeHttp {
    /**
     *
     * @param { string} modelName -
     * @param {HarpeeSchema} schemaObject
     */
    constructor(modelName: string, schemaObject: HarpeeSchema);
    /**
     *@private
     */
    private schemaName;
    /**
     *@private
     */
    private modelName;
    /**
     * @private
     */
    private schemaFields;
    /**
     * @private
     */
    private primaryKey;
    /**
     * @private
     */
    private silent;
    /**
     * This creates the schema & table if they don't exist yet.
     * **you should get rid of this after use.**
     * @returns void;
     */
    init(): Promise<void>;
    /**
     * Execute custom SQL queries.
     * @param {string} sqlQuery
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    query(sqlQuery: string, callback?: responseCallback): (Promise<any> | void);
    /**
     * Get details about your model, alias for `describe_table`
     * @param {responseCallback} [callback]
      * @returns {(Promise<any> | void)}
 
     */
    describeModel(callback?: responseCallback): (Promise<any> | void);
    /**
     * Returns all data from the table.
     * @param {(string[]|{limit?:number,offset?:number,orderby?:string,order?:'DESC'|'ASC',where?:string,and?:(string|number),getAttributes?:string[]
     })} options - an array of columns or an object with options.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    find(options: (string[] | {
        limit?: number;
        offset?: number;
        orderby?: string;
        order?: 'DESC' | 'ASC';
        where?: string;
        and?: (string | number);
        getAttributes?: string[];
    }), callback?: responseCallback): (Promise<any> | void);
    /**
     * Returns one or more data from the table matching the specified `primaryKey` values.
     * @param {((string|number)[] | {id:(string|number)[],getAttributes?:string[]})} ids
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    findById(ids: ((string | number)[] | {
        id: (string | number)[];
        getAttributes?: string[];
    }), callback?: responseCallback): (Promise<any> | void);
    /**
     * Returns a single data from the table matching the specified value.
     *
     * @param {{[key:string]:any}} attrObj
     * @param {string[]} [getAttributes]
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    findOne(attrObj: {
        [key: string]: any;
    }, getAttributes?: string[], callback?: responseCallback, ...args: any[]): (Promise<any> | void);
    /**
     * Deletes data from the table, matching the specified ids.
     *
     * @param {(string[] | number[])} ids - an array of values of your `primaryKey`.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    findByIdAndRemove(ids: (string[] | number[]), callback?: responseCallback): (Promise<any> | void);
    /**
     * Deletes multiple data from the table based on the specified values.
     *
     * @param {{[key:string]:any}} attrObj
     *@param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    findAndRemove(attrObj: {
        [key: string]: any;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * Updates the table with the specified records.
     * @param {{[key:string]:any}[]} records - an array of one or more records to be updated, **Note: the records must include their ids**.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    update(records: {
        [key: string]: any;
    }[], callback?: responseCallback): (Promise<any> | void);
    /**
     * Inserts new record to the table,
     *
     * @param {{[key:string]:any}} newRecord - an object of the new record to be created.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    create(newRecord: {
        [key: string]: any;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * Inserts multiple new records to the table,
     * **Note: this method does not validate the types in your schema.**
     *
     * @param {{[key:string]:any}[]} newRecords - an array of one or more records to be created.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    createMany(newRecords: {
        [key: string]: any;
    }[], callback?: responseCallback): (Promise<any> | void);
    /**
     * Load data to a table from a CSV string.
     * @param {Object} options
     * @param {string} options.csv - a valid CSV string.
     * @param {('insert'|'update'|'upsert')} [options.action='insert'] - what action to be performed on the data.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    importFromCsv(options: {
        csv: string;
        action?: ('insert' | 'update' | 'upsert');
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * Load data to a table from a local CSV file.
     * @param {Object} options
     * @param {string} options.filePath - an absolute path to the local file. **Note: this operation only works for local instances not for cloud instances**.
     * @param {('insert'|'update'|'upsert')} [options.action='insert'] - what action to be performed on the data.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    importFromCsvFile(options: {
        filePath: string;
        action?: ('insert' | 'update' | 'upsert');
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * Load data to a table from an external  CSV file.
     * @param {Object} options
     * @param {string} options.fileUrl - an absolute path to the external file.
      * @param {('insert'|'update'|'upsert')} [options.action='insert'] - what action to be performed on the data.
 
     * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
      * @returns {(Promise<any> | void)}
 
     */
    importFromCsvUrl(options: {
        fileUrl: string;
        action?: ('insert' | 'update' | 'upsert');
    }, callback?: responseCallback): (Promise<any> | void);
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
    importFromS3(options: {
        bucket: string;
        awsAccessKeyId: string;
        awsSecretAccessKey: string;
        key: string;
        action?: ('insert' | 'update' | 'upsert');
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     * Deletes every data from the table, **use this with caution**;
     *
     * @param {responseCallback} [callback] - an optional callback function.
     * @returns {(Promise<any> | void)}
 
     */
    clearAll(callback?: responseCallback): (Promise<any> | void);
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
    findByConditions(options: {
        limit?: (number | null);
        offset?: number;
        operator?: ('and' | 'or');
        getAttributes?: string[];
        conditions: object[];
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     *  Returns data from a table with matching values.
     * @param {Object} options
     * @param {string[]} [options.getAttributes] - an array of one or more attributes to be returned, default is `["*"]` which returns all attributes.
     * @param {object[]} options.searchAttribute -  attribute you wish to search, can be any attribute.
     * @param {string} options.searchValue - value you wish to search - wild cards are allowed..
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
     */
    findByValue(options: {
        getAttributes?: string[];
        searchAttribute: object[];
        searchValue: string;
    }, callback?: responseCallback): (Promise<any> | void);
}
declare namespace HarpeeModel {
    export { responseCallback };
}
import HarpeeHttp = require("./harpeeHttp");
type responseCallback = (err: any, result: any) => any;
import HarpeeSchema = require("./harpeeSchema");
