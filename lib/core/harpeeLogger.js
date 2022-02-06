const harpeeModelConfig =  require("./harpeeModelConfig");
const harpeeConnectConfig = require("./harpeeConnectConfig");
const HarpeeHttp =require("./harpeeHttp");
const operations =require("../constants/operations");
const  util =require("../helpers/util");

/**
 * A class for handling logs for your harperDB instance.
 *
 *
 */
/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error
 * @param {*} result - response data or null if an error occurs
 */

class HarpeeLogger extends HarpeeHttp {
   constructor() {
      super(harpeeConnectConfig.getConfig());
      /**
       * @private
       */
      this.modelSchemaConfig = harpeeModelConfig.getConfig();
   }
   /**
    * Read Logs 
    * @param {Object} options
    * @param {number} [options.start=0] - an offset of records to be returned.
    * @param {number} [options.limit=100] - limit of records to be returned.
    * @param {('desc'|'asc')} [options.order='desc'] - an order to return the records by timestamp.
    * @param {('error'|'info'|null)} [options.level='error'] - the level of logs to be read.
    * @param {Date} [options.from] - a valid ISO Date String indicating when to start reading the logs, default is 3 years ago.
    * @param {Date} [options.until] - a valid ISO Date String indicating when to stop reading the logs, default is today.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async readLog(options, callback) {
      try {
         let res;
         if (!util.isObject(options)) {
            throw new Error("`options` must be an object");
         }
         const past2Years = new Date().getFullYear() - 2;
         const past2YearsInMilliseconds = Date.parse(past2Years);
         const past2YearsInISOString = new Date(
            past2YearsInMilliseconds
         ).toISOString();
         const todayInISOString = new Date().toISOString();

         const start = options.start || 0;
         const from = options.from || past2YearsInISOString;
         const limit = options.limit || 100;
         const until = options.until || todayInISOString;
         const level = options.level || 'error';
         const order = options.order || "asc";

         /**
          * @private
          */
         res = await /** @private */ this.$callbackOrPromise(
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
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
     * Returns job status, metrics and messages for the specified job ID.
     * 
     * @param {Object} options
     * @param {string} options.id - the id of the job you wish to view.
     * @param {responseCallback} [callback] 
     * @returns {(Promise<any> | void)}
 
     */


   async getJob(options, callback) {
      try {
         let res;
         const id = {options};
         if (!id) {
            throw new Error(" job `id` is required");
         }

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.GET_JOB,
               id,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
     * Returns transaction logs.
     * @param {string} [options.schema] - name of the schema where you want read the transactions, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you read the transactions, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

     */


   async readTransactionLog(options, callback) {
      try {
         let res;
         const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
         const table = options.table || this.modelSchemaConfig.modelName;

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.READ_TRANSACTION_LOG,
               schema,
               table,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
     * Returns transaction logs based on the specified timestamps.
     * 
     * @param {Object} options
     * @param {array} options.searchValues - an array with a maximum of two timestamps [from_timestamp,to_timestamp].
     * @param {string} [options.schema] - name of the schema where you want to read the transactions, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you want to read the transactions, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

     */


   async readTransactionLogByTimestamp(options, callback) {
      try {
         let res;
         const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
         const table = options.table || this.modelSchemaConfig.modelName;
         const search_values = options.searchValues;
         if (!util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
         }

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.READ_TRANSACTION_LOG,
               search_type: "timestamp",
               search_values,
               schema,
               table
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
     * Returns transaction logs based on the specified username.
     * 
     * @param {Object} options
     * @param {array} options.searchValues - the user you wish to see their transaction logs.
   * @param {string} [options.schema] - name of the schema where you want to read the transactions, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you want to read the transactions, if not provided, will default to your `Model`.
     *  @param {responseCallback} [callback] 
      * @returns {(Promise<any> | void)}
     */


   async readTransactionLogByUsername(options, callback) {
      try {
         let res;
         const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
         const table = options.table || this.modelSchemaConfig.modelName;
         const search_values = options.searchValues;
         if (!util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
         }

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.READ_TRANSACTION_LOG,
               search_type: "username",
               search_values,
               schema,
               table
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
       * Returns transaction logs based on the specified hash values.
       * 
       * @param {Object} options
       * @param {array} options.searchValues - an array of hash values.
   * @param {string} [options.schema] - name of the schema where you want to read the transactions, if not provided, will default to the schema name at your `Schema`.
     * @param {string} [options.table] - name of the table where you want to read the transactions, if not provided, will default to your `Model`.
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
       */

   async readTransactionLogByHashValue(options) {
      try {
         let res;
         const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
         const table = options.table || this.modelSchemaConfig.modelName;
         const search_values = options.searchValues;
         if (!util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
         }

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.READ_TRANSACTION_LOG,
               schema,
               table,
               search_type: "hash_value",
               search_values,
            
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * Delete records created before a specified date.
    * 
    * @param {Object} options
    * @param {Date} options.date - records older than this date will be deleted.
    * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
    * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
    * @param {responseCallback} [callback] 
   * @returns {(Promise<any> | void)}
    */
   async deleteRecordsBefore(options, callback) {
      try {
         let res;
         const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
         const table = options.table || this.modelSchemaConfig.modelName;
         const{ date}= options;
         if (!date) {
            throw new Error("`date` is required ");
         }

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DELETE_RECORDS_BEFORE,
               schema,
               table,
               date,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * Delete transaction logs older the specified date.
    * 
    * @param {Object} options
    * @param {Date|number} options.timestamp - transaction logs older than this date will be deleted, Date Format must be in milliseconds.
    * @param {string} [options.schema] - name of the schema where you're deleting your data, if not provided, will default to the schema name at your `Schema`.
    * @param {string} [options.table] - name of the table where you deleting your data, if not provided, will default to your `Model`.
    * @param {responseCallback} [callback] 
   * @returns {(Promise<any> | void)}

    */

   async deleteTransactionLogsBefore(options, callback) {
      try {
         let res;
         const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
         const table = options.table || this.modelSchemaConfig.modelName;
         const {timestamp} = options;
         if (!util.isNumber(timestamp)) {
            throw new Error("`timestamp` is required and must be a number");
         }

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DELETE_TRANSACTION_LOGS_BEFORE,
               schema,
               table,
               timestamp,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }

   /**
    *  Search jobs by start date.
    *@param {Object} options
    *@param {Date} options.fromDate - a valid ISO Date String,the date you wish to start the search. 
    *@param {Date} options.toDate - a valid ISO Date String, the date you wish to end the search. 
    * @param {responseCallback} [callback]
    *  @returns {(Promise<any> | void)}

    * 
    */
   async searchJobsByStartDate(options, callback) {
      try {
         let res;
         if (!util.isObject(options)) {
            throw new Error("`options` must be an object");
         }
         const from_date = options.fromDate;
         const to_date = options.toDate;
         if (!from_date || !to_date) {
            throw new Error("`fromDate` and `toDate` are required");
         }

         res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SEARCH_JOBS_BY_START_DATE,
               from_date,
               to_date,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
}

module.expprts= HarpeeLogger;