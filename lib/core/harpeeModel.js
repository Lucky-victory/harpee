const util = require("../helpers/util");
const HarpeeHttp = require("./harpeeHttp");
const harpeeConnectConfig = require("./harpeeConnectConfig");
const harpeeModelConfig = require("./harpeeModelConfig");
const operations = require("../constants/operations");
const validator = require("../helpers/validators");
const SqlHandler = require("./sqlHandler");

/*
 * @typedef {Object} HarpeeSchema
 * @property {string} [name=defaultSchema]
 * @property {string} [primaryKey=id]
 * @property {Object} fields
 * @property {boolean} [silent=false]
 *  
 */
/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error.
 * @param {*} result - response data or null if an error occurs.
 */

class HarpeeModel extends HarpeeHttp {
   /**
    *
    * @param { string} modelName - 
    * @param {HarpeeSchema} schemaObject 
    */
   constructor(modelName, schemaObject) {
      super(harpeeConnectConfig.getConfig());

      if (!modelName || !util.isString(modelName)) {
         throw new Error("`modelName` is required and it must be a String");
      }
      if (modelName && !schemaObject) {
         throw new Error("`schemaObject` is required");
      }
      harpeeModelConfig.setConfig({ modelName, schemaObject });

      const schemaName = schemaObject.name;
      /**
       *@private
       */
      this.schemaName = schemaName;

      /**
       *@private
       */
      this.modelName = modelName;
      /**
       * @private
       */
      this.schemaFields = schemaObject.fields;

      const { primaryKey } = schemaObject;
      /**
       * @private
       */
      this.primaryKey = primaryKey;
      /**
       * @private
       */
      this.silent = schemaObject.silent;



   }
   /**
    * This creates the schema & table if they don't exist yet.
    * **you should get rid of this after use.**
    * @returns void;
    */
   async init() {
      try {

         const createSchema = async () => this.$callbackOrPromise({
            operation: operations.CREATE_SCHEMA,
            schema: this.schemaName
         });

         const describeAll = async () => this.$callbackOrPromise({
            operation: operations.DESCRIBE_ALL,

         });

         const createTable = async () => this.$callbackOrPromise({
            operation: operations.CREATE_TABLE,
            schema: this.schemaName,
            table: this.modelName,
            hash_attribute: this.primaryKey,
         });


         const respA = await describeAll();
         if (!(respA[this.schemaName])) {
            await createSchema()
         }


         const respB = await describeAll();

         if (!(respB[this.schemaName] && respB[this.schemaName][this.modelName])) {
            await createTable()
         }


      }
      catch (err) {
         console.error(err)
      }


   }
   /**
    * Execute custom SQL queries.
    * @param {string} sqlQuery 
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async query(sqlQuery, callback) {
      try {
       const  res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: sqlQuery,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            return Promise.resolve(res);
         }
      } catch (err) {
         return Promise.reject(err);
      }
   }
   /**
    * Get details about your model, alias for `describe_table` 
    * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}

    */
   async describeModel(callback) {
      try {
       const  res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DESCRIBE_TABLE,
               schema: this.schemaName,
               table: this.modelName,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            return Promise.resolve(res);
         }
      } catch (err) {
         return Promise.reject(err);
      }
   }
   /** 
    * Returns all data from the table.
    * @param {(string[]|{
       limit?:number,
       offset?:number,
       orderby?:string,
       order?:'DESC'|'ASC',
       where?:string,
       and?:(string|number),
       getAttributes?:string[]
    })} options - an array of columns or an object with options.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async find(options, callback) {
      try {
      
         let getAttr,
            limit,
            offset,
            orderby,
            order, where, and;
         if (!(util.isObject(options) || util.isArray(options))) {
            throw new TypeError(
               " find `options` must be an object or an array"
            );
         }
         if (
            (util.isArray(options) || util.isObject(options)) &&
            util.isEmpty(options)
         ) {
            getAttr = ["*"];
         } else if (util.isArray(options) && !util.isEmpty(options)) {
            getAttr = options;
         } else {
            limit = options.limit;
            offset = limit && options.offset ? options.offset : null;
            orderby = options.orderby;
            order = orderby && options.order ? options.order : null;
            where = options.where;
            and = where && options.and;

            getAttr = options.getAttributes || ["*"];
         }

         const schema = this.schemaName;
         const table = this.modelName;
         const sqlHandler = new SqlHandler();

         const { query } = sqlHandler
            .select(getAttr).from(schema, table).where(where).and(and).orderBy(orderby).order(order).limit(limit).offset(offset);

         const res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            return Promise.resolve(res);
         }
      } catch (error) {
         return Promise.reject(error);
      }
   }
   /**
    * Returns one or more data from the table matching the specified `primaryKey` values.
    * @param {(Array<string|number> | {id:Array<string|number>,getAttributes?:Array<string>})} ids 
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async findById(ids, callback) {
      try {

         let idValues, getAttributes = ['*'],
            idKey = this.primaryKey;
         if (util.isArray(ids)) {
            idValues = ids;
         } else {
            idValues = ids.id;
            getAttributes = ids.getAttributes || ['*'];
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

         if (!util.isUndefined(res)) {
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
         let getAttributes = ['*'];
         if (arguments.length >= 2 && util.isArray(arguments[1])) {
            getAttributes = arguments[1];
         }
         let attrKey, attrValue;
         if (!util.isObject(attrObj)) {
            throw new TypeError("`attrObj` param must be an object");
         } else {
            attrKey = util.splitObject(attrObj).keys[0];
            attrValue = util.splitObject(attrObj).values[0];
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
         if (!util.isUndefined(res)) {
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
         if (!util.isArray(ids)) {
            throw new Error('`ids` must be an array');
         }
         const hash_values = ids;
         const res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DELETE,
               schema: this.schemaName,
               table: this.modelName,
               hash_values
            },
            callback
         );
         if (!util.isUndefined(res)) {
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
         if (!util.isObject(attrObj)) {
            throw new TypeError("`attrObj` param must be an object");
         }

         attrKey = util.splitObject(attrObj).keys[0];
         attrValues = util.splitObject(attrObj).values[0];
         if (!util.isArray(attrValues)) {
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
         if (!util.isUndefined(res)) {
            return Promise.resolve(res);
         }
      } catch (error) {
         return Promise.reject(error);
      }
   }
   /**
    * Updates the table with the specified records.
    * @param {Array<{[key:string]:any}>} records - an array of one or more records to be updated, **Note: the records must include their ids**.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async update(records, callback) {
      try {
         if (!util.isArray(records)) {
            records = [records];
         }

         const res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.UPDATE,
               schema: this.schemaName,
               table: this.modelName,
               records,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            return Promise.resolve(res);
         }
      } catch (error) {
         return Promise.reject(error);
      }
   }
   /**
    * Inserts new record to the table,
    * 
    * @param {{[key:string]:any}} newRecord - an object of the new record to be created.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async create(newRecord, callback) {
      try {

         if (!util.isObject(newRecord)) {
            throw new TypeError(" `newRecord` must be an object");
         }
         if (!this.silent) {
            validator(this.schemaFields, newRecord);
         }

         const res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.INSERT,
               schema: this.schemaName,
               table: this.modelName,
               records: [newRecord],
            },
            callback
         );
         if (!util.isUndefined(res)) {
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
    * @param {Array<{[key:string]:any}>} newRecords - an array of one or more records to be created.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */

   async createMany(newRecords, callback) {
      try {
         if (!util.isArray(newRecords)) {
            newRecords = [newRecords];
         }

         const res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.INSERT,
               schema: this.schemaName,
               table: this.modelName,
               records: newRecords,
            },
            callback
         );
         if (!util.isUndefined(res)) {
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
         if (!util.isObject(options)) {
            throw new TypeError(" `options` must be an object");
         }
         const data = options.csv;
         const action = options.action || operations.INSERT;
         if (!data || !util.isString(data)) {
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
         if (!util.isUndefined(res)) {
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
         if (!util.isObject(options)) {
            throw new TypeError("`options` is required and must be object");
         }
         const action = options.action ? options.action : operations.INSERT;
         const file_path = options.filePath;
         if (!file_path || !util.isString(file_path)) {
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
         if (!util.isUndefined(res)) {
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
         if (!util.isObject(options)) {
            throw new TypeError("`options` is required and must be object");
         }

         const action = options.action || operations.INSERT;
         const csv_url = options.fileUrl;
         if (!csv_url || !util.isString(csv_url)) {
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
         if (!util.isUndefined(res)) {
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

         if (!util.isObject(options)) {
            throw new TypeError("`options` must be an object");
         }
         const action = options.action || operations.INSERT;
         const aws_access_key_id = options.awsAccessKeyId;
         const aws_secret_access_key = options.awsSecretAccessKey;
         const { bucket, key } = options;

         if (!(
               aws_access_key_id ||
               aws_secret_access_key ||
               bucket ||
               key
            )) {
            throw new Error(
               "`awsAccessKeyId`, `awsSecretAccessKey`, `bucket` and `key` are required "
            );
         }
         if (
            key &&
            (util.getExtname(key) !== "csv" ||
               util.getExtname(key) !== "json")
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
         if (!util.isUndefined(res)) {
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
         if (!util.isUndefined(res)) {
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
         if (!util.isObject(options)) {
            throw new TypeError(
               "findByConditions `options` must be an object"
            );
         }
         if (!util.isArray(options.conditions)) {
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

         if (!util.isUndefined(res)) {
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
         if (!util.isObject(options)) {
            throw new TypeError("findByValue `options` must be an object");
         }
         if (!util.isArray(options.getAttributes)) {
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

         if (!util.isUndefined(res)) {
            return Promise.resolve(res);
         }
      } catch (error) {
         return Promise.reject(error);
      }
   }
}

module.exports = HarpeeModel;