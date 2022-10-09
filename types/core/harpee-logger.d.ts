import { HarpeeHttp } from "./harpee-http";
import { HarpeeResponseCallback, IHarpeeResponse } from "../interfaces/harpee.interface";
import { IHarpeeReadLogOptions, IHarperDBDeleteRecordsOptions, IHarperDBDeleteTransLogOptions, IHarperDBReadTransLogByHashOptions, IHarperDBReadTransLogByTimestampOptions, IHarperDBReadTransLogByUsernameOptions, IHarperDBSearchJobOptions } from "../interfaces/harpee-logger.interface";
import { IHarpeeUtilOptions, IHarperDBMessageResponse } from "../interfaces/harpee-utilities.interface";
/**
 * A class for handling logs for your harperDB instance.
 *
 *
 */
export declare class HarpeeLogger extends HarpeeHttp {
    constructor();
    /**
     * Returns log outputs from the primary HarperDB log based on the provided search criteria. Read more about HarperDB logging here: https://harperdb.io/docs/reference/logging/.

     */
    readLog<T = object>(options: IHarpeeReadLogOptions): Promise<IHarpeeResponse<T>>;
    readLog<T = object>(options: IHarpeeReadLogOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
      * Returns job status, metrics and messages for the specified job ID.
      *

      */
    getJob<T = object[]>(options: {
        /**
         * the id of the job you wish to view */
        id: string;
    }): Promise<IHarpeeResponse<T>>;
    getJob<T = object[]>(options: {
        /**
         * the id of the job you wish to view */
        id: string;
    }, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
      * Returns all transactions logged for the specified database table. Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.

      */
    readTransactionLog<T = object[]>(options: IHarpeeUtilOptions): Promise<IHarpeeResponse<T>>;
    readTransactionLog<T = object[]>(options: IHarpeeUtilOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the transactions logged for the specified database table between the specified time window. Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.
     */
    readTransactionLogByTimestamp<T = object[]>(options: IHarperDBReadTransLogByTimestampOptions): Promise<IHarpeeResponse<T>>;
    readTransactionLogByTimestamp<T = object[]>(options: IHarperDBReadTransLogByTimestampOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the transactions logged for the specified database table which were committed by the specified user. Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.
     */
    readTransactionLogByUsername<T = object[]>(options: IHarperDBReadTransLogByUsernameOptions): Promise<IHarpeeResponse<T>>;
    readTransactionLogByUsername<T = object[]>(options: IHarperDBReadTransLogByUsernameOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns the transactions logged for the specified database table which were committed to the specified hash value(s). Read more about HarperDB transaction logs here: https://harperdb.io/docs/reference/transaction-log/.

     */
    readTransactionLogByHashValue<T = object[]>(options: IHarperDBReadTransLogByHashOptions): Promise<IHarpeeResponse<T>>;
    readTransactionLogByHashValue<T = object[]>(options: IHarperDBReadTransLogByHashOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     *Delete data before the specified timestamp on the specified database table exclusively on the node where it is executed. Any clustered nodes with replicated data will retain that data.
     
     */
    deleteRecordsBefore<T = IHarperDBMessageResponse>(options: IHarperDBDeleteRecordsOptions): Promise<IHarpeeResponse<T>>;
    deleteRecordsBefore<T = IHarperDBMessageResponse>(options: IHarperDBDeleteRecordsOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     *Deletes transaction log data for the specified database table that is older than the specified timestamp.
     *
     */
    deleteTransactionLogsBefore<T = unknown>(options: IHarperDBDeleteTransLogOptions): Promise<IHarpeeResponse<T>>;
    deleteTransactionLogsBefore<T = unknown>(options: IHarperDBDeleteTransLogOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
    /**
     * Returns a list of job statuses, metrics, and messages for all jobs executed within the specified time window.
     *
     */
    searchJobsByStartDate<T = object[]>(options: IHarperDBSearchJobOptions): Promise<IHarpeeResponse<T>>;
    searchJobsByStartDate<T = object[]>(options: IHarperDBSearchJobOptions, callback: HarpeeResponseCallback<T>): Promise<void>;
}
