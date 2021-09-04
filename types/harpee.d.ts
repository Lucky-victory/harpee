export = connect;
/** function to Connect to your database.
 * @param {Object} options - An object that takes in `host`, `username`,`password`,`token`.
 * @param {string} options.host - your harperdb host url.
 * @param {string} options.username - your harperdb username.
 * @param {string} options.password - your harperdb password.
 * @param {string} [options.token] - your generated JWT token.
 * @return {void} .
 **/
declare function connect(options: {
    host: string;
    username: string;
    password: string;
    token?: string;
}): void;
export = Schema
/** creates a schema .
 *
 * @param {Object} options - an object that takes in `name` and `fields` .
 * @param {string } [options.name=defaultShema] - the name of your schema.
 * @param {Object} options.fields - an object to specify the table columns.
 * @returns {Object} - returns an object to be used as the second parameter of `model`.
 **/
declare function Schema(options: {
    name?: string;
    fields: Object;
}): Object;
export = Model;
/** Creates a model for your project, the `modelName` represents a table in plural form.
 *
 * @param {string} modelName - the `modelName` is used to create a table.
 *
 * @param {object} schema - an `object` returned from `Schema` function;
 * @param {string} [schema.name] - an string returned from `Schema` function;
 * @param {object} schema.fields - an `object` returned from `Schema` function;
 *
 *
 */
declare function Model(modelName: string, schema: {
    name?: string;
    fields: object;
}): void;
declare class Model {
    /** Creates a model for your project, the `modelName` represents a table in plural form.
     *
     * @param {string} modelName - the `modelName` is used to create a table.
     *
     * @param {object} schema - an `object` returned from `Schema` function;
     * @param {string} [schema.name] - an `object` returned from `Schema` function;
     * @param {object} schema.fields - an `object` returned from `Schema` function;
     *
     *
     */
    constructor(modelName: string, schema: {
        name?: string;
        fields: object;
    });
    /** Gets all data from a table.
     * @param {(any[] | string[]) } arr - an empty array or an array of strings.
     * @param {responseCallback} [callback] - an optional callback function.
     *
     * */
    find(arr: (any[] | string[]), callback?: responseCallback): Promise<any>;
    /** returns a data based on the specified `id`.
     * @param {(string | object )} id - a string of id or an object specifying the id key & value(string).
     * @param { responseCallback} [callback] - an optional callback function.
     *
     * */
    findById(id: (string | object), callback?: responseCallback): Promise<any>;
    /** deletes data from the table based on the specified `id`.
     * @param {(string | object )} id - a string of id or an object specifying the id key & value(string).
     * @param { responseCallback} [callback] - an optional callback function.
     *
     * */
    findByIdAndRemove(id: (string | object), callback?: responseCallback): Promise<any>;
    /** updates the table with new data on the specified `id`.
     * @param {( object | string[])} id - a string of id or an object specifying the id key & value(string).
     * @param {object} obj - an object of the new data to be updated.
     * @param { responseCallback} [callback] - an optional callback function.
     *
     * */
    update(id: (object | string[]), obj: object, callback?: responseCallback): Promise<any>;
    /** inserts new data to the table.
     * @param {Object} obj - an object of the new data to be inserted.
     * @param { responseCallback} [callback] - an optional callback function.
     *
     * */
    create(obj: object, callback?: responseCallback): Promise<any>;
    /** Import data from plain CSV.
     * @param {Object} options - an `object` that takes in `action` and `csv`.
     * @param {string} options.csv - plain CSV string.
     * @param {string} [options.action=insert] - optional `action` to be performed.
     * @param {responseCallback} [callback] - optional callback function.
     * */
    importFromCsv(options: {
        csv: string;
        action?: string;
    }, callback?: responseCallback): Promise<any>;
    /** Import data from local CSV file.
     * @param {Object} options - an `object` that takes in `action` and `filePath`
     * @param {string} options.filePath - the relative path of the csv file.
     * @param {string} [options.action=insert] - optional `action` to be performed, default is `insert`;
     * @param {responseCallback} [callback] - optional callback function.
    
     * */
    importFromCsvFile(options: {
        filePath: string;
        action?: string;
    }, callback?: responseCallback): Promise<any>;
    /** Import data from an external CSV file.
     * @param {Object} options - an `object` that takes in `action` and `fileUrl`
     * @param {string} options.fileUrl - an absolute url of the csv file.
     * @param {string} [options.action=insert] - optional `action` to be performed, default is `insert`;
     *@param {responseCallback} [callback] - optional callback function
    
     * */
    importFromCsvUrl(options: {
        fileUrl: string;
        action?: string;
    }, callback?: responseCallback): Promise<any>;
    /** Import data from your AWS S3 Bucket into a table.
     *
     * @param { Object } options - an object that takes in `s3Key` your aws key ,`s3Secret` your aws secret key,`bucket` your aws bucket,and `filename` the name of the csv or json file.
     * @param { string } options.s3Key - your aws key id.
     * @param { string } options.s3Secret - your aws secret key.
     * @param { string } options.bucket - your aws bucket.
     * @param { string } options.filename - your csv pr json filename .
     * @param { string } [options.action=insert] - the action to be performed `insert`,`update`,`upsert`. .
     * @param {responseCallback} [callback] - an optional callback function;
     *
     */
    importFromS3(options: {
        s3Key: string;
        s3Secret: string;
        bucket: string;
        filename: string;
        action?: string;
    }, callback?: responseCallback): Promise<any>;
    /** response callback.
     * @callback responseCallback
     * @param { * } err - returns an error if any or null if no errors.
     * @param { * } data - returns the response data if any or null .
     * */
    /** Deletes every data from the table, use this with caution;
     *
     * @param {responseCallback} [callback] - an optional callback function.
     *
     */
    clearAll(callback?: responseCallback): Promise<any>;
}
declare namespace Model {
    export { responseCallback };
}
/**
 * response callback.
 */
type responseCallback = (err: any, data: any) => any;
