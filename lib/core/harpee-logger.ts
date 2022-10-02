import { HarpeeHttp } from "./harpee-http";
import operations from "../constants/operations";
import Utils from "../helpers/utils";
import { HarpeeResponseCallback } from "../interfaces/harpee.interface";
import {
    IHarpeeReadLogOptions,
    IHarperDBDeleteRecordsOptions,
    IHarperDBDeleteTransLogOptions,
    IHarperDBReadTransLogByHashOptions,
    IHarperDBReadTransLogByTimestampOptions,
    IHarperDBReadTransLogByUsernameOptions,
    IHarperDBSearchJobOptions,
} from "../interfaces/harpee-logger.interface";
import {
    IHarpeeUtilOptions,
    IHarperDBMessageResponse,
} from "../interfaces/harpee-utilities.interface";

/**
 * A class for handling logs for your harperDB instance.
 *
 *
 */

export class HarpeeLogger extends HarpeeHttp {
    constructor() {
        super();
    }
    /**
     * Returns log outputs from the primary HarperDB log based on the provided search criteria. Read more about HarperDB logging here: https://harperdb.io/docs/reference/logging/.

     */
    async readLog<T = object>(
        options: IHarpeeReadLogOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }
            const past2Years = new Date().getFullYear() - 2;
            const past2YearsInMilliseconds = new Date(past2Years).getTime();
            const past2YearsInISOString = new Date(
                past2YearsInMilliseconds
            ).toISOString();
            const todayInISOString = new Date().toISOString();

            const start = options.start || 0;
            const from = options.from || past2YearsInISOString;
            const limit = options.limit || 100;
            const until = options.until || todayInISOString;
            const level = options.level || "error";
            const order = options.order || "asc";

            const response = await this.$callbackOrPromise<T>(
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
      * Returns job status, metrics and messages for the specified job ID.
      *

      */

    async getJob<T = object[]>(
        options: {
            /**
             * the id of the job you wish to view */
            id: string;
        },
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const id = { options };
            if (!id) {
                throw new Error(" job `id` is required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.GET_JOB,
                    id,
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
      * Returns all transactions logged for the specified database table. Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.

      */

    async readTransactionLog<T = object[]>(
        options: IHarpeeUtilOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema, table } = options;

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    schema,
                    table,
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
     * Returns the transactions logged for the specified database table between the specified time window. Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.
     */

    async readTransactionLogByTimestamp<T = object[]>(
        options: IHarperDBReadTransLogByTimestampOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const schema = options.schema;
            const table = options.table;
            const search_values = options.searchValues;
            if (!Utils.isArray(search_values)) {
                throw new Error(
                    "`searchValues` is required and must be an array"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    search_type: "timestamp",
                    search_values,
                    schema,
                    table,
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
     * Returns the transactions logged for the specified database table which were committed by the specified user. Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.
     */

    async readTransactionLogByUsername<T = object[]>(
        options: IHarperDBReadTransLogByUsernameOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema, table } = options;
            const search_values = options.searchValues;
            if (!Utils.isArray(search_values)) {
                throw new Error(
                    "`searchValues` is required and must be an array"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    search_type: "username",
                    search_values,
                    schema,
                    table,
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
     * Returns the transactions logged for the specified database table which were committed to the specified hash value(s). Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.

     */

    async readTransactionLogByHashValue<T = object[]>(
        options: IHarperDBReadTransLogByHashOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { schema, table } = options;

            const search_values = options.searchValues;
            if (!Utils.isArray(search_values)) {
                throw new Error(
                    "`searchValues` is required and must be an array"
                );
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.READ_TRANSACTION_LOG,
                    schema,
                    table,
                    search_type: "hash_value",
                    search_values,
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
     *Delete data before the specified timestamp on the specified database table exclusively on the node where it is executed. Any clustered nodes with replicated data will retain that data.
     
     */
    async deleteRecordsBefore<T = IHarperDBMessageResponse>(
        options: IHarperDBDeleteRecordsOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { date, table, schema } = options;
            if (!date) {
                throw new Error("`date` is required ");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DELETE_RECORDS_BEFORE,
                    schema,
                    table,
                    date,
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
     *Deletes transaction log data for the specified database table that is older than the specified timestamp.
     *
     */

    async deleteTransactionLogsBefore<T = unknown>(
        options: IHarperDBDeleteTransLogOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            const { timestamp, table, schema } = options;
            if (!Utils.isNumber(timestamp)) {
                throw new Error("`timestamp` is required and must be a number");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.DELETE_TRANSACTION_LOGS_BEFORE,
                    schema,
                    table,
                    timestamp,
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
     * Returns a list of job statuses, metrics, and messages for all jobs executed within the specified time window.
     *
     */
    async searchJobsByStartDate<T = object[]>(
        options: IHarperDBSearchJobOptions,
        callback?: HarpeeResponseCallback<T>
    ) {
        try {
            if (!Utils.isObject(options)) {
                throw new Error("`options` must be an object");
            }
            const from_date = options.fromDate;
            const to_date = options.toDate;
            if (!from_date || !to_date) {
                throw new Error("`fromDate` and `toDate` are required");
            }

            const response = await this.$callbackOrPromise<T>(
                {
                    operation: operations.SEARCH_JOBS_BY_START_DATE,
                    from_date,
                    to_date,
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
