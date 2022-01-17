const Util = require("../../helpers/utils");
const HarpeeHttp = require("./harpeeHttp");
const harpeeConnect = require("./harpeeConnect");
const harpeeModelConfig = require("./harpeeConfig");
const operations = require("../../constants/operations");
const validator = require("../../helpers/validators");
const SqlHandler = require("./sqlHandler");
const sqlHandler = new SqlHandler();

/** @typedef {Object} HarpeeSchemaObject
 * @property {string} [name="defaultSchema"]
 * @property {string} [primaryKey="id"]
 * @property {Object} fields
 * @property {boolean} [silent=false]
 *  */
/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error
 * @param {*} data - response data or null if an error occurs
 */

class HarpeeModel extends HarpeeHttp {
   /**
    *
    * @param { string} modelName - represents a name for your table
    * @param {HarpeeSchemaObject} schemaObject - an object returned from {@link Schema} function.
    * @example
    * const harpee=require('harpee');
    * const myUsers=new harpee.Model('users',myUsersSchema);
    */
   constructor(modelName, schemaObject) {
      super(harpeeConnect.getConfig());

      if (!modelName || !Util.isString(modelName)) {
         throw new Error("`modelName` is required and it must be a String");
      }
      if (modelName && !schemaObject) {
         throw new Error("`schemaObject` is required");
      }
      harpeeModelConfig.setConfig({ modelName, schemaObject });

      const SCHEMA_NAME = schemaObject.name;
      /**
       *@private
       */
      this.SCHEMA_NAME = SCHEMA_NAME;

      const MODEL_NAME = `${modelName}`;
      /**
       *@private
       */
      this.MODEL_NAME = MODEL_NAME;
      /**
       * @private
       */
      this.SCHEMA_FIELDS = schemaObject && schemaObject.fields;
      const PRIMARY_KEY = schemaObject.primaryKey;
      /**
       * @private
       */
      this.PRIMARY_KEY = PRIMARY_KEY;
      /**
       * @private
       */
      this.SILENT = schemaObject.silent;
      (async function() {



         const checker = {};
         try {
            await this.$callbackOrPromise({
               operation: operations.DESCRIBE_ALL
            }, async (err, data) => {
               if (err) throw err;
               checker['schema'] = data[SCHEMA_NAME];
               if (checker.schema) {

                  checker['table'] = data[SCHEMA_NAME][MODEL_NAME];
               }
               if (!checker.schema) {


                  try {
                     await this.$callbackOrPromise({
                        operation: operations.CREATE_SCHEMA,
                        schema: SCHEMA_NAME,
                     });
                  } catch {

                  }
                  try {
                     await this.$callbackOrPromise({
                        operation: operations.CREATE_TABLE,
                        schema: SCHEMA_NAME,
                        table: MODEL_NAME,
                        hash_attribute: PRIMARY_KEY,
                     });
                  } catch {}
               }
               else if (checker.schema && !checker.table) {

                  try {
                     await this.$callbackOrPromise({
                        operation: operations.CREATE_TABLE,
                        schema: SCHEMA_NAME,
                        table: MODEL_NAME,
                        hash_attribute: PRIMARY_KEY,
                     });
                  } catch {

                  }
               }
            });
         }
         catch {

         }


      })();
   }

   /**
    *
    * @param {string} sqlQuery - a valid SQL string
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    * // with callback
    * myUsers.query('SELECT * FROM myUsersSchema.users',(err,data)=>{
      if(err) console.log(err);
      console.log(data)
    });
    @example
    * // expecting a promise
    *  myUsers.query('SELECT * FROM myUsersSchema.users').then((data)=> console.log(data)).catch((err)=> console.log(err));
    */
   async query(sqlQuery, callback) {
      try {
         let res;

         res = await this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: sqlQuery,
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
    *  Returns information about a table, alias for {@link https://api.harperdb.io/#46b68991-2fea-4a99-82f5-ed38cf9d1f3d | describe_table}
    *
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    * // with callback
    *  myUsers.describeModel((err,data)=>{
        if(err) console.log(err);
        console.log(data)
     })
     @example
    * // expecting a promise
    * myUsers.describeModel().then((data)=> console.log(data)).catch((err)=>console.log(err));
    */
   async describeModel(callback) {
      try {
         let res;

         res = await this.$callbackOrPromise(
            {
               operation: operations.DESCRIBE_TABLE,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
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
    * Returns multiple data from the table.
    * @param {(Object | string[])} options - an array of attributes or an object with options.
    * @param {number} [options.limit]
    * @param {number} [options.offset]
    * @param {string} [options.orderby]
    * @param {string} [options.order] - 
    * @param {array} [options.getAttributes] - an array of attributes to retrieve, default is `['*']`.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    * // an empty array or object is equivalent to `['*']`
    * 
    * // with callback and using array parameter.
    * myUsers.find([],(err,data)=>{
        if(err) console.log(err);
        console.log(data)
     });
    * @example
    * // expecting a promise
       myUsers.find(['age','user_id']).then((data)=> console.log(data)).catch((err)=> console.log(err));
    *   @example 
    * // using an object parameter
    * 
    * myUsers.find({limit:10,offset:5,orderby:'age',order:'desc',getAttributes:['age','user_id','city']},(err,data)=>{
        if(err) console.log(data);
        console(data)
    })
    */
   async find(options, callback) {
      try {
         let res,
            get_attr,
            limit,
            offset,
            order_by,
            order,
            has_orderby_and_order,
            has_limit_and_offset;
         if (!(Util.isObject(options) || Util.isArray(options))) {
            throw new TypeError(
               " find `options` must be an object or an array"
            );
         }
         if (
            (Util.isArray(options) || Util.isObject(options)) &&
            Util.isEmpty(options)
         ) {
            get_attr = ["*"];
         } else if (Util.isArray(options) && !Util.isEmpty(options)) {
            get_attr = options;
         } else {
            limit = options.limit ? options.limit : null;
            offset = options.offset ? options.offset : null;
            has_limit_and_offset = limit && offset;
            order_by = options.orderby ? options.orderby : null;
            order = options.order ? options.order : null;
            has_orderby_and_order = order_by && order;
            get_attr = options.getAttributes ?
               options.getAttributes : ["*"];
         }

         const schema = this.SCHEMA_NAME;
         const table = this.MODEL_NAME;
         const { query } = sqlHandler
            .select(get_attr)
            .from(schema, table)
            .orderBy(order_by)
            .order(has_orderby_and_order, order)
            .limit(limit)
            .offset(has_limit_and_offset, offset);

         res = await this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Returns a single data from the table matching the specified id or value.
    * @param {(string | Object)} id
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    *  // when using string, it must be a value of the `primaryKey` specified in your {@link Schema}, e.g user_id.
    * myUsers.findById('user-34567',(err,data)=>{
        if(err) console.log(err);
        console.log(data);
     });
    * @example
    * // with object parameter
    * myUsers.findById({user_id:'user-3400'}).then((data)=> console.log(data)).catch((err)=>console.log(err));
    */
   async findById(id, callback) {
      try {
         let res, idKey, idValue;
         if (!Util.isObject(id)) {
            idKey = this.PRIMARY_KEY;
            idValue = id;
         } else {
            idKey = Util.splitObject(id).keys[0];
            idValue = Util.splitObject(id).values[0];
         }

         const schema = this.SCHEMA_NAME;
         const table = this.MODEL_NAME;
         const { query } = sqlHandler
            .select(["*"])
            .from(schema, table)
            .where(idKey)
            .equalTo(idValue);

         res = await this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback,
            true
         );

         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   // Todo - fix in next version
   // Model.prototype.findNested = async function(options, callback) {
   // let res;
   //   try {
   //     res = await callbackOrPromise({
   //       operation: operations.SQL,
   //       sql: `SELECT ${GET_ATTR.join(',')} FROM ${this.SCHEMA_NAME}.${this.MODEL_NAME} WHERE search_json(${child},${parent})='${value}'`,
   //     }, callback);
   //     if (!Util.isUndefined(res)) {
   //       Promise.resolve(res);
   //     }
   //   } catch (error) {
   //     Promise.reject(error)
   //   }
   // };

   /**
    * Returns a single data from table matching the specified value.
    * 
    * @param {Object} attrObj
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    * 
    *  myUsers.findOne({age:25}).then((data)=> console.log(data)).catch((err)=>console.log(err));
    */
   async findOne(attrObj, callback) {
      try {
         let res, attrKey, attrValue;
         if (!Util.isObject(attrObj)) {
            throw new TypeError("`attrObj` param must be an object");
         } else {
            attrKey = Util.splitObject(attrObj).keys[0];
            attrValue = Util.splitObject(attrObj).values[0];
         }

         const schema = this.SCHEMA_NAME;
         const table = this.MODEL_NAME;
         const { query } = sqlHandler
            .select(["*"])
            .from(schema, table)
            .where(attrKey)
            .equalTo(attrValue);

         res = await this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback,
            true
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /** 
    * Deletes data from the table, matching the specified id.
    *
    * @param {(string|Object)} id - a string or an object.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example 
    *  // when using string, it must be a value of the `primaryKey` specified in your {@link Schema} , e.g user_id.
    * 
    * myUsers.findByIdAndRemove('user-3400',(err,data)=>{
        if(err) console.log(err);
        console.log(data)
    });
    */
   async findByIdAndRemove(id, callback) {
      try {
         let res, idKey, idValue;
         if (!Util.isObject(id)) {
            idKey = this.PRIMARY_KEY;
            idValue = id;
         } else {
            idKey = Util.splitObject(id).keys[0];
            idValue = Util.splitObject(id).values[0];
         }

         const schema = this.SCHEMA_NAME;
         const table = this.MODEL_NAME;
         const { query } = sqlHandler
            .delete()
            .from(schema, table)
            .where(idKey)
            .equalTo(idValue);
         res = await this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Deletes multiple data from table based on the specified values.
    *
    * @param {Object} attrObj
    *@param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    * // this will delete users with age 25 and 30.
    * myUsers.findAndRemove({age:[25,30]},(err, data) => {
    *  if (err) console.log(err);
    *             console.log(data)
    * });
    */
   async findAndRemove(attrObj, callback) {
      try {
         let res, attrKey, attrValue;
         if (!Util.isObject(attrObj)) {
            throw new TypeError("`attrObj` param must be an object");
         }

         attrKey = Util.splitObject(attrObj).keys[0];
         attrValue = Util.splitObject(attrObj).values[0];
         if (!Util.isArray(attrValue)) {
            attrValue = [attrValue];
         }

         const schema = this.SCHEMA_NAME;
         const table = this.MODEL_NAME;
         const { query } = sqlHandler
            .delete()
            .from(schema, table)
            .where(attrKey)
            .in(attrValue);

         res = await this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Updates the table with specified records.
    * @param {Object[]} records - an array of one or more records to be updated, see {@link https://api.harperdb.io/#17d21958-00b7-4e5f-a55e-c476700073fb | NoSql operation update} to learn more, **Note: the records must include their ids**.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    * 
    * myUsers.update([{
       user_id:'user-3400',age:23,name:'Stevie' }],(err,data)=>{
        console.log(data) 
           
        })
    */
   async update(records, callback) {
      try {
         let res;
         if (!Util.isArray(records)) {
            records = [records];
         }

         res = await this.$callbackOrPromise(
            {
               operation: operations.UPDATE,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               records,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Inserts new data to the table,
    * 
    * @param {Object} newRecord - an object of the new record to be created.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    * @example
    * // **Note: the values and types specified here must match those specified in your `Schema`**
    * // you can turn it off by setting `silent:true` in your `Schema`. 
    * myUsers.create({
        user_id:'user-4433',
        age:28,
        name:'Danny',
        city:'Los Angeles',
        joined:new Date().getTime()
    });
    */
   async create(newRecord, callback) {
      try {
         let res;

         if (!Util.isObject(newRecord)) {
            throw new TypeError(" `newRecord` must be an object");
         }
         if (!this.SILENT) {
            validator(this.SCHEMA_FIELDS, newRecord);
         }

         res = await this.$callbackOrPromise(
            {
               operation: operations.INSERT,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               records: [newRecord],
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Load data to a table from a CSV string, alias for {@link https://api.harperdb.io/#92ad4d1d-5feb-492e-96d1-7203c7df6ad6 | csv_data_load operation}.
    * @param {Object} options
    * @param {string} options.csv - a valid CSV string.
    * @param {string} [options.action='insert'] - what action to be performed on the data - 'insert','update' or 'upsert'. default is 'insert'.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    */
   async importFromCsv(options, callback) {
      try {
         if (!Util.isObject(options)) {
            throw new TypeError(" `options` must be an object");
         }
         let res;

         const data = options.csv;
         const action = options.action ? options.action : operations.INSERT;
         if (!data || !Util.isString(data)) {
            throw new Error(
               " `options.csv` is required and it should be in string format"
            );
         }

         res = await this.$callbackOrPromise(
            {
               operation: operations.CSV_DATA_LOAD,
               action,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               data,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Load data to a table from a local CSV file, alias for {@link https://api.harperdb.io/#e74330f8-7f61-46cf-9b52-f27962d73c05 | csv_file_load operation} .
    * @param {Object} options
    * @param {string} options.filePath - an absolute path to the local file. **Note: this operation only works for local instances not for cloud instances**.
    * @param {string} [options.action='insert'] - what action to be performed on the data, 'insert','update', or 'upsert'. default is 'insert'.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    */
   async importFromCsvFile(options, callback) {
      try {
         let res;

         if (!Util.isObject(options)) {
            throw new TypeError("`options` is required and must be object");
         }
         const action = options.action ? options.action : operations.INSERT;
         const file_path = options.filePath;
         if (!file_path || !Util.isString(file_path)) {
            throw new Error(
               "`options.filePath` is required and must be a string"
            );
         }

         res = await this.$callbackOrPromise(
            {
               operation: operations.CSV_FILE_LOAD,
               action,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               file_path,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Load data to a table from an external  CSV file, alias for {@link https://api.harperdb.io/#309d4440-c40d-497c-a30a-a3f0d4024fbc | csv_url_load operation}.
    * @param {Object} options
    * @param {string} options.fileUrl - an absolute path to the external file.
    * @param {string} [options.action='insert'] - what action to be performed on the data - 'insert','update' or 'upsert'. default is 'insert'.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    */
   async importFromCsvUrl(options, callback) {
      try {
         let res;

         if (!Util.isObject(options)) {
            throw new TypeError("`options` is required and must be object");
         }

         const action = options.action ? options.action : operations.INSERT;
         const csv_url = options.fileUrl;
         if (!csv_url || !Util.isString(csv_url)) {
            throw new Error("`options.fileUrl` is required ");
         }

         res = await this.$callbackOrPromise(
            {
               operation: operations.CSV_URL_LOAD,
               action,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               csv_url,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Load data to a table from amazon S3, visit {@link https://api.harperdb.io/#d301d85f-826a-4bda-af5d-a5fb0a04bde2 | import_from_s3 operation} to learn more.
    * @param {Object} options
    * @param {string} options.bucket - the name of the bucket where your file lives.
    * @param {string} options.s3Key - your aws access key id.
    * @param {string} options.s3Secret - your aws secret access key.
    * @param {string} options.filename - the name of the file to import - *the file must include a valid file extension* ('.csv' or '.json').
    * @param {string} [options.action='insert'] - what action to be performed on the data - 'insert','update' or 'upsert'. default is 'insert'.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    */
   async importFromS3(options, callback) {
      try {
         let res;

         if (!Util.isObject(options)) {
            throw new TypeError("`options` must be an object");
         }
         const action = options.action ? options.action : operations.INSERT;
         const aws_access_key_id = options.s3Key;
         const aws_secret_access_key = options.s3Secret;
         const bucket = options.bucket;
         const filename = options.filename;
         if (
            !aws_access_key_id ||
            !aws_secret_access_key ||
            !bucket ||
            !filename
         ) {
            throw new Error(
               "`s3key`, `s3Secret`, `bucket` and `filename` are required "
            );
         }
         if (
            filename &&
            (Util.getExtname(filename) !== "csv" ||
               Util.getExtname(filename) !== "json")
         ) {
            throw new Error(
               "the file extension is invalid , only a `.csv` or `.json` file is acceptable"
            );
         }

         res = await this.$callbackOrPromise(
            {
               operation: operations.IMPORT_FROM_S3,
               action,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               s3: {
                  aws_access_key_id,
                  aws_secret_access_key,
                  bucket,
                  key: filename,
               },
            },
            callback
         );
         if (!Util.isUndefined(res)) {
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
    *
    */
   async clearAll(callback) {
      try {
         let res;
         const schema = this.SCHEMA_NAME;
         const table = this.MODEL_NAME;
         const { query } = sqlHandler.delete().from(schema, table);
         res = await this.$callbackOrPromise(
            {
               operation: operations.SQL,
               sql: query,
            },
            callback
         );
         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    * Retruns data from table using matching conditions, alias for {@link https://api.harperdb.io/#c820c353-e7f6-4280-aa82-83be77857653 | search_by_conditions operation}.
    * @param {Object} options
    * @param {number} [options.limit=null] - a limit of data to be returned, default is `null`.
    * @param {number} [options.offset=0] - number of data to be skipped, default is `0`.
    * @param {string} [options.operator='and'] - the operator used between each condition - 'and', 'or'. The default is 'and'.
    * @param {string[]} [options.get_attributes] - an array of one or more attributes to be returned, default is `["*"]` which returns all attributes.
    * @param {object[]} options.conditions - an array of one or more object with search operations.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    */
   async findByConditions(options, callback) {
      try {
         if (!Util.isObject(options)) {
            throw new TypeError(
               "findByConditions `options` must be an object"
            );
         }
         if (!Util.isArray(options.conditions)) {
            throw new TypeError(" `options.condition` must be an array");
         }
         let res;
         const limit = +options.limit ? options.limit : null;
         const operator = options.operator ? options.operator : "and";
         const offset = +options.offset ? options.offset : 0;
         const get_attributes = options.get_attributes ?
            options.get_attributes : ["*"];
         const conditions = option.conditions;
         res = await this.$callbackOrPromise(
            {
               operation: operations.SEARCH_BY_CONDITIONS,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               operator,
               limit,
               offset,
               conditions,
               get_attributes,
            },
            callback
         );

         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
   /**
    *  Returns data from a table with matching values, alias for {@link https://api.harperdb.io/#647beb0d-f26d-473e-84bb-9805dfca3835 | search_by_value operation}.
    * @param {Object} options
    * @param {string[]} [options.get_attributes] - an array of one or more attributes to be returned, default is `["*"]` which returns all attributes.
    * @param {object[]} options.search_attribute -  attribute you wish to search, can be any attribute.
    * @param {object[]} options.search_values - value you wish to search - wild cards are allowed..
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
    */

   async findByValue(options, callback) {
      try {
         if (!Util.isObject(options)) {
            throw new TypeError("findByValue `options` must be an object");
         }
         if (!Util.isArray(options.get_attributes)) {
            options.get_attributes = [options.get_attributes];
         }

         let res;

         const search_attribute = options.search_attribute;
         const search_value = options.search_value;
         const get_attributes = options.get_attributes ?
            options.get_attributes : ["*"];
         if (!(search_attribute || search_value)) {
            throw new Error(
               "`search_attribute` and `search_value` are required"
            );
         }
         res = await this.$callbackOrPromise(
            {
               operation: operations.SEARCH_BY_VALUE,
               schema: this.SCHEMA_NAME,
               table: this.MODEL_NAME,
               search_attribute,
               search_value,
               get_attributes,
            },
            callback
         );

         if (!Util.isUndefined(res)) {
            Promise.resolve(res);
         }
      } catch (error) {
         Promise.reject(error);
      }
   }
}

module.exports = HarpeeModel;