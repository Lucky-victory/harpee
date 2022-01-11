const harpeeModelConfig = require("./harpeeConfig");
const harpeeConnect = require("./harpeeConnect");
const HarpeeHttp = require("./harpeeHttp");
const operations = require("../../constants/operations");
const Util = require("../../helpers/utils");
/** A class for handling logs for your harperDB instance
 *
 *
 */
class HarpeeLogger extends HarpeeHttp {
    constructor() {
        super(harpeeConnect.getConfig());
        /**
         * @private
         */
        this.modelSchemaConfig = harpeeModelConfig.getConfig();
    }
    async readLog(options, callback) {
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
        const level = options.level || null;
        const order = options.order || "desc";
        try {
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
    async getJob(jobId, callback) {
        let res;
        const id = jobId;
        if (!id) {
            throw new Error("`jobId` is required");
        }
        try {
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
    async readTransactionLog(options, callback) {
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        try {
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
    async readTransactionLogByTimestamp(options, callback) {
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const search_values = options.searchValues;
        if (!search_values || !Util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
        }
        try {
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
    async readTransactionLogByUser(options, callback) {
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const search_values = options.searchValues;
        if (!search_values || !Util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
        }
        try {
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
    async readTransactionLogByHashValue(options) {
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const search_values = options.searchValues;
        if (!search_values || !Util.isArray(search_values)) {
            throw new Error("`searchValues` is required and must be an array");
        }
        try {
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
    async deleteRecordsBefore(options, callback) {
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const date = options.date;
        if (!date) {
            throw new Error("`date` is required ");
        }
        try {
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
    async deleteTransactionLogsBefore(options, callback) {
        let res;
        const schema =
            options.schema || this.modelSchemaConfig.schemaObject.name;
        const table = options.table || this.modelSchemaConfig.modelName;
        const timestamp = options.timestamp;
        if (!timestamp || !Util.isNumber(timestamp)) {
            throw new Error("`timestamp` is required and must be a number");
        }
        try {
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
    async searchJobsByStartDate(options, callback) {
        let res;
        if (!Util.isObject(options)) {
            throw new Error("`options` must be an object");
        }
        const from_date = options.fromDate;
        const to_date = options.toDate;
        if (!from_date || !to_date) {
            throw new Error("`fromDate` and `toDate` are required");
        }
        try {
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
