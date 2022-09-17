import { IHarpeeUtilOptions } from "./harpee-utilities.interface";
import { StringOrNumber } from "./harpee.interface";

export interface IHarperDBSearchJobOptions {
    /**
     * a valid ISO Date String,the date you wish to start the search.
     */
    fromDate: string;
    /**
     * a valid ISO Date String,the date you wish to end the search.
     */
    toDate: string;
}
export interface IHarperDBDeleteTransLogOptions extends IHarpeeUtilOptions {
    /**
     *  transaction logs older than this date will be deleted, Date Format must be in milliseconds.
     */
    timestamp: number;
}

export interface IHarperDBDeleteRecordsOptions extends IHarpeeUtilOptions {
    /**
     * records older than this date will be deleted.  Supported format looks like: YYYY-MM-DDThh:mm:ss.sZ
     */
    date: string;
}

export interface IHarperDBReadTransLogByHashOptions extends IHarpeeUtilOptions {
    /**
     * An array of hash_attributes for which you wish to see transaction logs.
     */
    searchValues: StringOrNumber[];
}

export interface IHarperDBReadTransLogByUsernameOptions
    extends IHarpeeUtilOptions {
    /**
     * The HarperDB user for whom you would like to view transactions.
     */
    searchValues: string[];
}

export interface IHarperDBReadTransLogByTimestampOptions
    extends IHarpeeUtilOptions {
    /**
     *  An array containing a maximum of two values [from_timestamp, to_timestamp] defining the range of transactions you would like to view.
 - Timestamp format is millisecond-based epoch in UTC.
- If no items are supplied then all transactions are returned.
- If only one entry is supplied then all transactions after the supplied timestamp will be returned.
     */
    searchValues: [number,number?];
}
