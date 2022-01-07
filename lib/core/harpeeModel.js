const Util = require('../../helpers/utils');
const HarpeeHttp = require('./harpeeHttp');
const harpeeConnect = require('./harpeeConnect');
const harpeeConfig = require('./harpeeConfig');
const operations = require('../../constants/operations');
const validator = require("../../helpers/validators");
const SqlHandler = require('./sqlHandler');
const sqlHandler = new SqlHandler();


function HarpeeModel(modelName, schemaObject) {
   HarpeeHttp.call(this, harpeeConnect.getConfig());
   if (!modelName || !Util.isString(modelName)) {
      throw new Error("`modelName` is required and it must be a String");
   }
   if (modelName && !schemaObject) {
      throw new Error("`schemaObject` is required");
   }
   harpeeConfig.setConfig({ modelName, schemaObject });

   const SCHEMA_NAME = schemaObject.name;
   this.SCHEMA_NAME = SCHEMA_NAME;

   const MODEL_NAME = `${modelName}`;
   this.MODEL_NAME = MODEL_NAME;

   this.SCHEMA_FIELDS = schemaObject && schemaObject.fields;
   const PRIMARY_KEY = schemaObject.primary_key;
   this.PRIMARY_KEY = PRIMARY_KEY;
   this.SILENT = schemaObject.silent;
   if (SCHEMA_NAME && MODEL_NAME) {
      (async function() {


         try {
            await this.$callbackOrPromise(
            {
               operation: operations.CREATE_SCHEMA,
               schema: SCHEMA_NAME,

            })
         }
         catch (err) {
            //console.warn(err)
         }
         try {

            await this.$callbackOrPromise({
               operation: operations.CREATE_TABLE,
               schema: SCHEMA_NAME,
               table: MODEL_NAME,
               hash_attribute: PRIMARY_KEY,
            });
         }

         catch (err) {
            //console.warn(err)
         }
      }());
   }
}
HarpeeModel.prototype = Object.create(HarpeeHttp.prototype);

HarpeeModel.prototype.query = async function(sqlQuery, callback) {
   let res;

   try {

      res = await this.$callbackOrPromise({
         operation: operations.SQL,
         sql: sqlQuery,
      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }
   } catch (err) {
      Promise.reject(err)
   }
};
HarpeeModel.prototype.describeModel = async function(callback) {
   let res;

   try {

      res = await this.$callbackOrPromise({
         operation: operations.DESCRIBE_TABLE,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }


};

HarpeeModel.prototype.find = async function(options, callback) {
   let res, get_attr, limit, offset, order_by, order,has_orderby_and_order, has_limit_and_offset;
   if (!(Util.isObject(options) && Util.isArray(options))) {
      throw new TypeError(' find `options` must be an object or an array')
   }
   if ((Util.isArray(options) || Util.isObject(options)) && Util.isEmpty(options)) {
      get_attr = ['*'];
   }
   else if (Util.isArray(options) && !Util.isEmpty(options)) {
      get_attr = options;

   }
   else {
      limit = options.limit ? options.limit : null
      offset = options.offset ? options.offset : null;
      has_limit_and_offset = limit && offset;
      order_by = options.orderby ? options.orderby : null;
      order = options.order ? options.order: null;
      has_orderby_and_order = order_by && order;
      get_attr = options.get_attributes ? options.get_attributes : ['*'];
   }
   try {
      const schema = this.SCHEMA_NAME
      const table = this.MODEL_NAME;
      const { query } = sqlHandler.select(get_attr).from(schema, table).orderBy(order_by).order(has_orderby_and_order,order).limit(limit).offset(has_limit_and_offset, offset);

      res = await this.$callbackOrPromise({

         operation: operations.SQL,
         sql: query
      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }

   } catch (error) {
      Promise.reject(error)
   }

};

HarpeeModel.prototype.findById = async function(id, callback) {

   let res, idKey, idValue;
   if (!Util.isObject(id)) {
      idKey = this.PRIMARY_KEY;
      idValue = id;
   }
   else {
      idKey = Util.splitObject(id).keys[0];
      idValue = Util.splitObject(id).values[0];
   }

   try {
      const schema = this.SCHEMA_NAME
      const table = this.MODEL_NAME;
      const { query } = sqlHandler.select(['*']).from(schema, table).where(idKey).isEqualTo(idValue);

      res = await this.$callbackOrPromise({
         operation: operations.SQL,
         sql: query

      }, callback, true);

      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }

   } catch (error) {
      Promise.reject(error)
   }
};
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
HarpeeModel.prototype.findOne = async function(attrObj, callback) {

   let res, attrKey,
      attrValue;
   if (!Util.isObject(attrObj)) {
      throw new TypeError('`attrObj` param must be an object');
   }
   else {
      attrKey = Util.splitObject(attrObj).keys[0];
      attrValue = Util.splitObject(attrObj).values[0];
   }
   try {
      const schema = this.SCHEMA_NAME;
      const table = this.MODEL_NAME;
      const { query } = sqlHandler.select(['*']).from(schema, table).where(attrKey).isEqualTo(attrValue);

      res = await this.$callbackOrPromise({

         operation: operations.SQL,
         sql: query

      }, callback, true);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }

   } catch (error) {
      Promise.reject(error)
   }
};

HarpeeModel.prototype.findByIdAndRemove = async function(id, callback) {
   let res, idKey, idValue;
   if (!Util.isObject(id)) {
      idKey = this.PRIMARY_KEY;
      idValue = id;
   } else {

      idKey = Util.splitObject(id).keys[0];
      idValue = Util.splitObject(id).values[0];
   }
   try {
const schema=this.SCHEMA_NAME;
const table=this.MODEL_NAME;
const {query}=sqlHandler.delete().from(schema,table).where(idKey).isEqualTo(idValue);
      res = await this.$callbackOrPromise({

         operation: operations.SQL,
         sql: query
      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }

   } catch (error) {
      Promise.reject(error);

   }
};
HarpeeModel.prototype.findAndRemove = async function(attrObj, callback) {
   let res, attrKey, attrValue;
   if (!Util.isObject(attrObj)) {
      throw new TypeError('`attrObj` param must be an object')
   }

   attrKey = Util.splitObject(attrObj).keys[0];
   attrValue = [Util.splitObject(attrObj).values[0]];

   try {

   const schema = this.SCHEMA_NAME;
   const table = this.MODEL_NAME;
   const { query } = sqlHandler.delete().from(schema, table).where(attrKey).in(attrValue);

      res = await this.$callbackOrPromise({

         operation: operations.SQL,
         sql: query,
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }

   } catch (error) {
      Promise.reject(error)
   }
};

HarpeeModel.prototype.update = async function(records, callback) {
   let res;
   if (!Util.isArray(records)) {
      records = [records]

   }

   try {

      res = await this.$callbackOrPromise({
         operation: operations.UPDATE,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         records
      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }

   } catch (error) {
      Promise.reject(error)
   }
};

HarpeeModel.prototype.create = async function(newRecord, callback) {
   let res;

   if (!Util.isObject(newRecord)) {
      throw new TypeError(" `newRecord` must be an object");
   }
   if (!this.SILENT) {

      validator(this.SCHEMA_FIELDS, newRecord);
   }
   try {

      res = await this.$callbackOrPromise({

         operation: operations.INSERT,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         records: [newRecord],

      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }

   } catch (error) {
      Promise.reject(error);
   }
};

HarpeeModel.prototype.importFromCsv = async function(options, callback) {
   if (!Util.isObject(options)) {
      throw new TypeError(" `options` must be an object");
   }
   let res;

   const data = options.csv;
   const action = options.action ? options.action : operations.INSERT;
   if (!data || !Util.isString(data)) {
      throw new Error(" `options.csv` is required and it should be in string format");
   }

   try {

      res = await this.$callbackOrPromise({

         operation: operations.CSV_DATA_LOAD,
         action,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         data,

      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }

   } catch (error) {
      Promise.reject(error);
   }
};

HarpeeModel.prototype.importFromCsvFile = async function(options, callback) {
   let res;

   if (!Util.isObject(options)) {
      throw new TypeError("`options` is required and must be object");
   }
   const action = options.action ? options.action : operations.INSERT;
   const file_path = options.filePath;
   if (!file_path || !Util.isString(file_path)) {
      throw new Error("`options.filePath` is required and must be a string");
   }

   try {

      res = await this.$callbackOrPromise({
         operation: operations.CSV_FILE_LOAD,
         action,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         file_path

      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }

   } catch (error) {
      Promise.reject(error)
   }
};

HarpeeModel.prototype.importFromCsvUrl = async function(options, callback) {
   let res;

   if (!Util.isObject(options)) {
      throw new TypeError("`options` is required and must be object");
   }

   const action = options.action ? options.action : operations.INSERT;
   const csv_url = options.fileUrl;
   if (!csv_url || !Util.isString(csv_url)) {
      throw new Error("`options.fileUrl` is required ");
   }

   try {

      res = await this.$callbackOrPromise({

         operation: operations.CSV_URL_LOAD,
         action,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         csv_url

      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }

   } catch (error) {
      Promise.reject(error);
   }
}

HarpeeModel.prototype.importFromS3 = async function(options, callback) {
   let res;

   if (!Util.isObject(options)) {
      throw new TypeError("`options` must be an object");
   }
   const action = options.action ? options.action : operations.INSERT;
   const aws_access_key_id = options.s3Key;
   const  aws_secret_access_key = options.s3Secret;
   const bucket = options.bucket;
   const filename = options.filename;
   if (!aws_access_key_id || !aws_secret_access_key || !bucket || !filename) {
      throw new Error("s3key, s3Secret, bucket and filename are required ");
   }
   if (
      filename &&
      (Util.getExtname(filename) !== "csv" ||
         Util.getExtname(filename) !== "json")
   ) {
      throw new Error(
         "the file extension is invalid , only a `.csv` or `.json` file is acceptable",
      );
   }
   try {

      res = await this.$callbackOrPromise({

         operation: operations.IMPORT_FROM_S3,
         action,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         s3: {
            aws_access_key_id,
            aws_secret_access_key,
            bucket,
            key: filename
         },

      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }

   } catch (error) {
      Promise.reject(error)
   }
};

/** Deletes every data from the table, use this with caution;
 *
 * @param {responseCallback} [callback] - an optional callback function.
 *
 */
HarpeeModel.prototype.clearAll = async function(callback) {
   let res;

   try {
      const schema=this.SCHEMA_NAME;
const table=this.MODEL_NAME;
const {query} = sqlHandler.delete().from(schema,table);
      res = await this.$callbackOrPromise({

         operation: operations.SQL,
         sql: query,

      }, callback);
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }

   } catch (error) {
      Promise.reject(error);
   }
};

HarpeeModel.prototype.findByConditions = async function(options, callback) {
   if (!Util.isObject(options)) {
      throw new TypeError('findByConditions `options` must be an object')
   }
   if (!Util.isArray(options.conditions)) {
      throw new TypeError(' `options.condition` must be an array')
   }
   let res;
   const limit = +options.limit ? options.limit : null;
   const operator = options.operator ? options.operator : 'and';
   const offset = +options.offset ? options.offset : 0;
   const get_attributes = options.get_attributes ? options.get_attributes : ['*'];
   try {
      res = await this.$callbackOrPromise(
      {
         operation: operations.SEARCH_BY_CONDITIONS,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         operator,
         limit,
         offset,
         conditions,
         get_attributes

      }, callback);

      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }
   }
   catch (error) {
      Promise.reject(error)
   }
}
HarpeeModel.prototype.findByValue = async function(options, callback) {
   if (!Util.isObject(options)) {
      throw new TypeError('findByValue `options` must be an object')
   }
   if (!Util.isArray(options.get_attributes)) {
      options.get_attributes = [options.get_attributes]
   }

   let res;

   const search_attribute = options.search_attribute
   const search_value = options.search_value
   const get_attributes = options.get_attributes ? options.get_attributes : ['*'];
   try {
      res = await this.$callbackOrPromise(
      {

         operation: operations.SEARCH_BY_VALUE,
         schema: this.SCHEMA_NAME,
         table: this.MODEL_NAME,
         search_attribute,
         search_value,
         get_attributes

      }, callback);

      if (!Util.isUndefined(res)) {
         Promise.resolve(res)
      }
   }
   catch (error) {
      Promise.reject(error);
   }
}



module.exports = HarpeeModel;