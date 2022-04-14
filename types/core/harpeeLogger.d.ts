export = HarpeeLogger;
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
declare class HarpeeLogger extends HarpeeHttp {
    constructor();
    /**
     * @private
     */
    private modelSchemaConfig;
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
    readLog(options: {
        start?: number;
        limit?: number;
        order?: ('desc' | 'asc');
        level?: ('error' | 'info' | null);
        from?: Date;
        until?: Date;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
      * Returns job status, metrics and messages for the specified job ID.
      *
      * @param {Object} options
      * @param {string} options.id - the id of the job you wish to view.
      * @param {responseCallback} [callback]
      * @returns {(Promise<any> | void)}
  
      */
    getJob(options: {
        id: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
      * Returns transaction logs.
      * @param {string} [options.schema] - name of the schema where you want read the transactions, if not provided, will default to the schema name at your `Schema`.
      * @param {string} [options.table] - name of the table where you read the transactions, if not provided, will default to your `Model`.
      * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}
 
      */
    readTransactionLog(options: any, callback?: responseCallback): (Promise<any> | void);
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
    readTransactionLogByTimestamp(options: {
        searchValues: any[];
        schema?: string;
        table?: string;
    }, callback?: responseCallback): (Promise<any> | void);
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
    readTransactionLogByUsername(options: {
        searchValues: any[];
        schema?: string;
        table?: string;
    }, callback?: responseCallback): (Promise<any> | void);
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
    readTransactionLogByHashValue(options: {
        searchValues: any[];
        schema?: string;
        table?: string;
    }): (Promise<any> | void);
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
    deleteRecordsBefore(options: {
        date: Date;
        schema?: string;
        table?: string;
    }, callback?: responseCallback): (Promise<any> | void);
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
    deleteTransactionLogsBefore(options: {
        timestamp: Date | number;
        schema?: string;
        table?: string;
    }, callback?: responseCallback): (Promise<any> | void);
    /**
     *  Search jobs by start date.
     *@param {Object} options
     *@param {Date} options.fromDate - a valid ISO Date String,the date you wish to start the search.
     *@param {Date} options.toDate - a valid ISO Date String, the date you wish to end the search.
     * @param {responseCallback} [callback]
     *  @returns {(Promise<any> | void)}
 
     *
     */
    searchJobsByStartDate(options: {
        fromDate: Date;
        toDate: Date;
    }, callback?: responseCallback): (Promise<any> | void);
}
declare namespace HarpeeLogger {
    export { responseCallback };
}
import HarpeeHttp = require("./harpeeHttp");
type responseCallback = (err: any, result: any) => any;
