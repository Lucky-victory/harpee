const harpeeModelConfig = require("./harpeeConfig");
const harpeeConnect = require("./harpeeConnect");
const HarpeeHttp = require("./harpeeHttp");
const operations = require("../../constants/operations");
const Util = require("../../helpers/utils");
/**
 * A class for handling logs for your harperDB instance.
 *
 *
 */
 /**
 * @callback responseCallback
 * @param {*} err - an error or null if no error
 * @param {*} data - response data or null if an error occurs
 */

class HarpeeLogger extends HarpeeHttp {
    constructor() {
        super(harpeeConnect.getConfig());
        /**
         * @private
         */
        this.modelSchemaConfig = harpeeModelConfig.getConfig();
    }
    /**
     * Read Logs from a table
     * @param {Object} options
     * @param {number} [options.start=0] - an offset of records to be returned.
     * @param {number} [options.limit=100] - limit of records to be returned.
     * @param {string} [options.order='desc'] - an order to return the records 'desc' or 'asc' by timestamp, default is 'desc'.
     * @param {(string|null)} [options.level='error'] - the level of logs to be read, 'error','info' or null, default is 'errors'.
     * @param {Date} [options.from] - a valid ISO Date String indicating when to start reading the logs, default is 3 years ago.
     * @param {Date} [options.until] - a valid ISO Date String indicating when to stop reading the logs, default is today.
     * @param {responseCallback} [callback] - an optional callback, if not provided a `Promise` is returned;
     * 
     * @example 
     * 
     * const harpee=require('harpee');
     * const myLogger=new harpee.Logger()
     * myLogger.readLog({
        from:'2019-01-11T00:00:00.000Z',
        until:'2022-01-11T00:00:00.000Z',
        order:'desc',
        level:'error',
        start:0,
        limit:100
     },(err,data)=>{
        if(err) console.log(err);
        console.log(data)
     })
     */
    async readLog(options, callback) {
      try{
        let res;
        if (!Util.isObject(options)) {
            throw new Error("`options` must be an object");
        }
        const past3Years = new Date().getFullYear() - 3;
        const past3YearsInMilliseconds = Date.parse(past3Years);
        const past3YearsInISOString = new Date(
            past3YearsInMilliseconds
        ).toISOString();
        const todayInISOString = new Date().toISOString();

        const start = options.start || 0;
        const from = options.from || past3YearsInISOString;
        const limit = options.limit || 100;
        const until = options.until || todayInISOString;
        const level = options.level || 'error';
        const order = options.order || "desc";
       
            /**
             * @private
             */
            res = await this.$callbackOrPromise(
                {
                    operation: operations.READ_LOG,
                    start,
                    from,
                    until,
                    limit,
                    level,
                    order,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
     /**
     * Returns job status, metrics and messages for the specified job ID.
     * 
     * @param {string} jobId - the id of the job you wish to view.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.
     * @example
     * myLogger.getJob('b4b4-939d-4bb5-df4e',(err,data)=>{
         console.log(data);
     })
     */ 


    async getJob(jobId, callback) {
      try{
        let res;
        const id = jobId;
        if (!id) {
            throw new Error("`jobId` is required");
        }
       
            res = await this.$callbackOrPromise(
                {
                    operation: operations.GET_JOB,
                    id,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
     /**
     * Returns transaction logs.
     * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.

     */ 


    async readTransactionLog(options, callback) {
       try{
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    schema,
                    table,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
     /**
     * Returns transaction logs based on the specified timestamps.
     * 
     * @param {Object} options
     * @param {array} options.searchValues - an array with a maximum of two timestamps [from_timestamp,to_timestamp].
     * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.

     */ 


    async readTransactionLogByTimestamp(options, callback) {
      try{
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const search_values = options.searchValues;
        if (!search_values || !Util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    search_type: "timestamp",
                    search_values,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
     /**
     * Returns transaction logs based on the specified username.
     * 
     * @param {Object} options
     * @param {array} options.searchValues - the user you wish to see their transaction logs.
     * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.

     */ 


    async readTransactionLogByUser(options, callback) {
       try{
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const search_values = options.searchValues;
        if (!search_values || !Util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    search_type: "username",
                    search_values,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
 /**
     * Returns transaction logs based on the specified hash values.
     * 
     * @param {Object} options
     * @param {array} options.searchValues - an array of hash values.
     * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.

     */ 

    async readTransactionLogByHashValue(options) {
       try{
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const search_values = options.searchValues;
        if (!search_values || !Util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    schema,
                    table,
                    search_type: "hash_value",
                    search_values,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    /**
     * Delete records created before a specified date.
     * 
     * @param {Object} options
     * @param {Date} options.date - records older than this date will be deleted.
     * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.

     */ 
    async deleteRecordsBefore(options, callback) {
       try{
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const date = options.date;
        if (!date) {
            throw new Error("`date` is required ");
        }
       
            res = await this.$callbackOrPromise(
                {
                    operation: operations.DELETE_RECORDS_BEFORE,
                    schema,
                    table,
                    date,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    /**
     * Delete transaction logs older the specified date.
     * 
     * @param {Object} options
     * @param {Date|number} options.timestamp - transaction logs older than this date will be deleted, Date Format must be in milliseconds.
     * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.

     */ 
 
    async deleteTransactionLogsBefore(options, callback) {
       try{
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const timestamp = options.timestamp;
        if (!timestamp || !Util.isNumber(timestamp)) {
            throw new Error("`timestamp` is required and must be a number");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.DELETE_TRANSACTION_LOGS_BEFORE,
                    schema,
                    table,
                    timestamp,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    
    /**
     *  Search jobs by start date.
     *@param {Object} options
     *@param {Date} options.fromDate - a valid ISO Date String,the date you wish to start the search. 
     *@param {Date} options.toDate - a valid ISO Date String, the date you wish to end the search. 
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.
     *
     * 
     */ 
    async searchJobsByStartDate(options, callback) {
       try{
        let res;
        if (!Util.isObject(options)) {
            throw new Error("`options` must be an object");
        }
        const from_date = options.fromDate;
        const to_date = options.toDate;
        if (!from_date || !to_date) {
            throw new Error("`fromDate` and `toDate` are required");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.SEARCH_JOBS_BY_START_DATE,
                    from_date,
                    to_date,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
}

module.exports = HarpeeLogger;
