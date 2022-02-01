import util from "../helpers/utils";
import HarpeeHttp from "./harpeeHttp";
import callbackOrPromise from "./harpeeHttpAlt";
import harpeeConnectConfig from "./harpeeConnectConfig";
import harpeeModelConfig from "./harpeeModelConfig";
import operations from "../constants/operations";
import validator from "../helpers/validators";
import SqlHandler from "./sqlHandler" ;
const sqlHandler = new SqlHandler();

/** 
 * @typedef {Object} HarpeeSchemaObject
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
    * @param {HarpeeSchemaObject} schemaObject .
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
      const config = harpeeConnectConfig.getConfig();
      const createSchema = async () => {
         callbackOrPromise(config, {
            operation: operations.CREATE_SCHEMA,
            schema: schemaName
         });
      }
      const describeAll = async () => {
         return (callbackOrPromise(config, {
            operation: operations.DESCRIBE_ALL,

         }))
      }
      const createTable = async () => {
            callbackOrPromise(config, {
               operation: operations.CREATE_TABLE,
               schema: schemaName,
               table: modelName,
               hash_attribute: primaryKey,
            });

         }
         (async function() {

            try {
               const a = await describeAll();
               if (!(a[schemaName])) {
                  await createSchema()
               }


               const b = await describeAll();

               if (!(b[schemaName] && b[schemaName][modelName])) {
                  await createTable()
               }




            }

            catch (err) {
               console.error(err)
            }

         })();


   }

   /**
    * Execute custom SQL queries.
    * @param {string} sqlQuery 
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async query(sqlQuery, callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: sqlQuery,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (err) {
         Promise.reject(err);
      }
   }
   /**
    * Get details about your model, alias for `describe_table` 
    * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}

    */
   async describeModel(callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DESCRIBE_TABLE,
               schema: this.schemaName,
               table: this.modelName,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (err) {
         Promise.reject(err);
      }
   }
   /** 
    * Returns all data from the table.
    * @param {(string[]|Object)} options - an array of column names or an object with options.
    * @param {number} [options.limit]
    * @param {number} [options.offset]
    * @param {string} [options.orderby]
    * @param {('ASC'|'DESC')} [options.order]  
    * @param {array} [options.getAttributes] 
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async find(options, callback) {
      try {
         let res,
            getAttr,
            limit,
            offset,
            orderby,
            order,
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
            limit = options.limit || null;
            offset =  options.limit && options.offset ? options.offset : null;
            
            orderby = options.orderby || null;
            order = options.orderby && options.order ? options.order : null;
   
            getAttr = options.getAttributes || ["*"];
         }

         const schema = this.schemaName;
         const table = this.modelName;
         const { query } = sqlHandler
            .select(getAttr)
            .from(schema, table)
            .orderBy(orderby)
            .order(order)
            .limit(limit)
            .offset(offset);

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Returns one or more data from the table matching the specified `primaryKey` values.
    * @param {(Array<string> | object)} ids 
    * @param {Array<string>} [ids.getAttributes]  
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async findById(ids, callback) {
      try {
         let res, idValues, getAttributes,
            idKey = this.primaryKey;
         if (util.isArray(ids)) {
            idValues = ids;
         } else {
            idValues = ids.id;
            getAttributes = id.getAttributes || ['*'];
         }

         const schema = this.schemaName;
         const table = this.modelName;
         const { query } = sqlHandler
            .select(getAttributes)
            .from(schema, table)
            .where(idKey)
            .in(idValues);

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );

         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }

   /**
    * Returns a single data from the table matching the specified value.
    * 
    * @param {Object} attrObj
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async findOne(attrObj, callback) {
      try {
         let res, attrKey, attrValue;
         if (!util.isObject(attrObj)) {
            throw new TypeError("`attrObj` param must be an object");
         } else {
            attrKey = util.splitObject(attrObj).keys[0];
            attrValue = util.splitObject(attrObj).values[0];
         }

         const schema = this.schemaName;
         const table = this.modelName;
         const { query } = sqlHandler
            .select(["*"])
            .from(schema, table)
            .where(attrKey)
            .equalTo(attrValue);

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback,
            true
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         let res;
         const hash_values = ids;
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DELETE,
               schema: this.schemaName,
               table: this.modelName,
               hash_values
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Deletes multiple data from the table based on the specified values.
    *
    * @param {Object} attrObj
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
   async findAndRemove(attrObj, callback) {
      try {
         let res, attrKey, attrValues;
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
         const { query } = sqlHandler
            .delete()
            .from(schema, table)
            .where(attrKey)
            .in(attrValues);

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Updates the table with the specified records.
    * @param {Object[]} records - an array of one or more records to be updated, **Note: the records must include their ids**.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async update(records, callback) {
      try {
         let res;
         if (!util.isArray(records)) {
            records = [records];
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.UPDATE,
               schema: this.schemaName,
               table: this.modelName,
               records,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Inserts new record to the table,
    * 
    * @param {Object} newRecord - an object of the new record to be created.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async create(newRecord, callback) {
      try {
         let res;

         if (!util.isObject(newRecord)) {
            throw new TypeError(" `newRecord` must be an object");
         }
         if (!this.silent) {
            validator(this.schemaFields, newRecord);
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.INSERT,
               schema: this.schemaName,
               table: this.modelName,
               records: [newRecord],
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Inserts multiple new records to the table,
    * **Note: this method does not validate the types in your schema.**
    * 
    * @param {Object[]} newRecords - an array of one or more records to be created.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async createMany(newRecords, callback) {
      try {
         let res;

         if (!util.isArray(newRecords)) {
            newRecords = [newRecords];
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.INSERT,
               schema: this.schemaName,
               table: this.modelName,
               records: newRecords,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         let res;

         const data = options.csv;
         const action = options.action || operations.INSERT;
         if (!data || !util.isString(data)) {
            throw new Error(
               " `options.csv` is required and it should be a string"
            );
         }

        res = await /** @private */ this.$callbackOrPromise(
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
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         let res;

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

        res = await /** @private */ this.$callbackOrPromise(
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
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         let res;

         if (!util.isObject(options)) {
            throw new TypeError("`options` is required and must be object");
         }

         const action = options.action || operations.INSERT;
         const csv_url = options.fileUrl;
         if (!csv_url || !util.isString(csv_url)) {
            throw new Error("`options.fileUrl` is required ");
         }

        res = await /** @private */ this.$callbackOrPromise(
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
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         let res;

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

        res = await /** @private */ this.$callbackOrPromise(
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
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         let res;
         const schema = this.schemaName;
         const table = this.modelName;
         const { query } = sqlHandler.delete().from(schema, table);
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         const conditions = option.conditions;
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
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
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
         if (!util.isArray(options.get_attributes)) {
            options.get_attributes = [options.get_attributes];
         }

         let res;

         const search_attribute = options.searchAttribute;
         const search_value = options.searchValue;
         const get_attributes = options.getAttributes || ["*"];
         if (!(search_attribute || search_value)) {
            throw new Error(
               "`searchAttribute` and `searchValue` are required"
            );
         }
        res = await /** @private */ this.$callbackOrPromise(
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
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
}

export default HarpeeModel;