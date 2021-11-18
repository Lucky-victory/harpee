const U = require("../helpers/utils");
const operations = require('../constants/operations');
const validator = require("../helpers/validators");
const callbackOrPromise = require('./core/requestHandler');

function Model(modelName, schemaObject) {
  if (!modelName || !U.isString(modelName)) {
    throw new Error("`modelName` is required and it must be a String");
  }
  if (modelName && !schemaObject) {
    throw new Error("`schemaObject` is required");
  }
  const SCHEMA_NAME = schemaObject.name;
  this.SCHEMA_NAME = SCHEMA_NAME;

  const MODEL_NAME = `${modelName}`;
  this.MODEL_NAME = MODEL_NAME;

  this.SCHEMA_FIELDS = schemaObject && schemaObject.fields;
  const PRIMARY_KEY = schemaObject.primary_key;
  this.PRIMARY_KEY = PRIMARY_KEY;
  if (SCHEMA_NAME && MODEL_NAME) {
    (async function() {


      try {
        await callbackOrPromise(
        {
          operation: operations.CREATE_SCHEMA,
          schema: SCHEMA_NAME,

        })
      } catch (err) {
        // console.error(err);
      }
      try {

        await callbackOrPromise({
          operation: operations.CREATE_TABLE,
          schema: SCHEMA_NAME,
          table: MODEL_NAME,
          hash_attribute: PRIMARY_KEY,
        });
      } catch (err) {
        // console.error(err)
      }


    }());
  }
}
Model.prototype.query = async function(sqlQuery, callback) {
  let res;

  try {

    res = await callbackOrPromise({
      operation: operations.SQL,
      sql: sqlQuery,
    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }
  } catch (err) {
    Promise.reject(err)
  }
};
Model.prototype.describeModel = async function(callback) {
  let res;

  try {

    res = await callbackOrPromise({
      operation: operations.DESCRIBE_TABLE,
      schema: this.SCHEMA_NAME,
      table: this.MODEL_NAME
    }, callback)
    if (!U.isUndefined(res)) {
      Promise.resolve(res);
    }


  } catch (err) {
    Promise.reject(err)
  }


};

Model.prototype.find = async function(options, callback) {
  let res;
  let get_attr,limit,offset,desc,order_by;
  if (!(U.isObject(options) && U.isArray(options))) {
    throw new TypeError(' find `options` must be an object or an array')
  }
  if((U.isArray(options) || U.isObject(options)) && U.isEmpty(options)){
    get_attr=['*'];
  }
  else if(U.isArray(options) && !U.isEmpty(options)){
    get_attr=options;
    
  }
  else{
   limit = options.limit ? options.limit : null
   offset = options.offset ? options.offset : null;
   order_by = options.orderby ? options.orderby : null;
    desc = options.desc ? options.desc : false;
   get_attr = options.get_attribute ? options.get_attribute : ['*']; 
  }
  // let this method accept an array
  // {
  //   limit?:number,
  //   offset?:number,
  //   get_attribute?:array,
  //   orderby?:string,
  //   desc?:boolean
  // }


  try {
    
    res = await callbackOrPromise({

      operation: operations.SQL,
      sql: `SELECT ${get_attr.join(',')} FROM ${this.SCHEMA_NAME}.${this.MODEL_NAME}  ${order_by ? ' ORDER BY '+ order_by : ' ORDER BY __createdtime__' } ${order_by && desc ? ' DESC ': ' ASC '} ${limit ? ' LIMIT '+ limit : ''} ${limit && offset ? ' OFFSET '+ offset : ''}  `
    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res);
    }

  } catch (error) {
    Promise.reject(error)
  }

};

Model.prototype.findById = async function(id, callback) {

  let res, idKey, idValue
  if (!U.isObject(id)) {
    idKey=this.PRIMARY_KEY;
    idValue=id;
  }
  else {
    idKey = U.splitObject(id).keys[0];
    idValue = U.splitObject(id).values[0];
  }

  try {
  
    res = await callbackOrPromise({
      operation: operations.SQL,
      sql: `SELECT * FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] WHERE ${idKey}='${idValue}'`,

    }, callback, true);

    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }

  } catch (error) {
    Promise.reject(error)
  }
};
Model.prototype.findNested = async function(options, callback) {

  // get_attr: array,
  // id: Object
let res;

  try {

    res = await callbackOrPromise({
      operation: operations.SQL,
      sql: `SELECT ${GET_ATTR.join(',')} FROM ${this.SCHEMA_NAME}.${this.MODEL_NAME} WHERE search_json(${child},${parent})='${value}'`,

    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res);
    }
  } catch (error) {
    Promise.reject(error)
  }
};
Model.prototype.findOne = async function(attributeObject, callback) {

  let res, attrKey,
    attrValue;
  if (!U.isObject(attributeObject)) {
    throw new TypeError('`attributeObject` must be an object');
  }
  else {
    attrKey = U.splitObject(attributeObject).keys[0];
    attrValue = U.splitObject(attributeObject).values[0];
  }
  try {

    res = await callbackOrPromise({

      operation: operations.SQL,
      sql: `SELECT * FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] WHERE ${attrKey} IN ('${attrValue}')`

    }, callback, true);
    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }

  } catch (error) {
    Promise.reject(error)
  }
};

Model.prototype.findByIdAndRemove = async function(id, callback) {
  let res;
    idKey, idValue;
  if (!U.isObject(id)) {
    idKey = this.PRIMARY_KEY;
    idValue = id;
  }else{
    
  idKey = U.splitObject(id).keys[0];
  idValue = U.splitObject(id).values[0];
}
  try {

    res = await callbackOrPromise({

      operation: operations.SQL,
      sql: `DELETE FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] WHERE ${idKey}='${idValue}'`
    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }

  } catch (error) {
    Promise.reject(error);

  }
};
Model.prototype.findAndRemove = async function(attributeObject, callback) {
  let res;
    attrKey, attrValue;
  if (!U.isObject(attributeObject)) {
    throw new TypeError('`attributeObject` must be an object')
  }

  attrKey = U.splitObject(attributeObject).keys[0];
 attrValue = [U.splitObject(attributeObject).values[0]];

  try {

    res = await callbackOrPromise({

      operation: operations.SQL,
      sql: `DELETE FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] WHERE ${attrKey} IN ("${attrValue.join('","')}")`,
    }, callback)
    if (!U.isUndefined(res)) {
      Promise.resolve(res);
    }

  } catch (error) {
    Promise.reject(error)
  }
};

Model.prototype.update = async function(records, callback) {
  let res;
  if(!U.isArray(records)){
    records=[records]
  
  } 

  try {

    res = await callbackOrPromise({
      operation: operations.UPDATE,
      schema:this.SCHEMA_NAME,
      table:this.MODEL_NAME,
      records
    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }

  } catch (error) {
    Promise.reject(error)
  }
};

Model.prototype.create = async function(newRecord, callback) {
  let res;

  if (!U.isObject(newRecord)) {
    throw new TypeError(" `newRecord` must be an object");
  }
  validator(this.SCHEMA_FIELDS, newRecord);
  try {

    res = await callbackOrPromise({

      operation: operations.INSERT,
      schema: `${this.SCHEMA_NAME}`,
      table: `${this.MODEL_NAME}`,
      records: [newRecord],

    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res);
    }

  } catch (error) {
    Promise.reject(error);
  }
};

Model.prototype.importFromCsv = async function(options, callback) {
  if (!U.isObject(options)) {
    throw new TypeError(" `options` must be an object");
  }
  let res;

  const csv_data = options.csv;
  const action = options.action ? options.action : operations.INSERT;
  if (!csv_data || !U.isString(csv_data)) {
    throw new Error(" `options.csv` is required and it should be in string format");
  }

  try {

    res = await callbackOrPromise({

      operation: operations.CSV_DATA_LOAD,
      action,
      schema: this.SCHEMA_NAME,
      table: this.MODEL_NAME,
      data: csv_data,

    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }

  } catch (error) {
    Promise.reject(error);
  }
};

Model.prototype.importFromCsvFile = async function(options, callback) {
  let res;

  if (!U.isObject(options)) {
    throw new TypeError("`options` is required and must be object");
  }
  const action = options.action ? options.action : operations.INSERT;
  const file_path = options.filePath;
  if (!file_path || !U.isString(file_path)) {
    throw new Error("`options.filePath` is required ");
  }

  try {
    
    res = await callbackOrPromise({

      operation: operations.CSV_FILE_LOAD,
      action,
      schema: this.SCHEMA_NAME,
      table: this.MODEL_NAME,
      file_path

    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }

  } catch (error) {
    Promise.reject(error)
  }
};

Model.prototype.importFromCsvUrl = async function(options, callback) {
  let res;

  if (!U.isObject(options)) {
    throw new TypeError("`options` is required and must be object");
  }

  const action = options.action ? options.action : operations.INSERT;
  const csv_url = options.fileUrl;
  if (!csv_url || !U.isString(csv_url)) {
    throw new Error("`options.fileUrl` is required ");
  }

  try {

    res = await callbackOrPromise({

      operation: operations.CSV_URL_LOAD,
      action,
      schema: this.SCHEMA_NAME,
      table: this.MODEL_NAME,
      csv_url

    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }

  } catch (error) {
    Promise.reject(error);
  }
}

Model.prototype.importFromS3 = async function(options, callback) {
  let res;

  if (!U.isObject(options)) {
    throw new TypeError("`options` must be an object");
  }
  const action = options.action ? options.action : operations.INSERT;
  const { s3Key } = options;
  const { s3Secret } = options;
  const s3Bucket = options.bucket;
  const s3Filename = options.filename;
  if (!s3Key || !s3Secret || !s3Bucket || !s3Filename) {
    throw new Error("s3key, s3Secret, bucket and filename are required ");
  }
  if (
    s3Filename &&
    (U.getExtname(s3Filename) !== "csv" ||
      U.getExtname(s3Filename) !== "json")
  ) {
    throw new Error(
      "the file extension is invalid , only a `.csv` or `.json` file is acceptable",
    );
  }
  try {
    
    res = await callbackOrPromise({

      operation: operations.IMPORT_FROM_S3,
      action,
      schema: this.SCHEMA_NAME,
      table: this.MODEL_NAME,
      s3: {
        aws_access_key_id: s3Key,
        aws_secret_access_key: s3Secret,
        bucket: s3Bucket,
        key: s3Filename
      },

    }, callback);
    if (!U.isUndefined(res)) {
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
Model.prototype.clearAll = async function(callback) {
  let res;

  try {
    // @ts-ignore
    res = await callbackOrPromise({

      operation: operations.SQL,
      sql: `DELETE FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}]`,

    }, callback);
    if (!U.isUndefined(res)) {
      Promise.resolve(res);
    }

  } catch (error) {
    Promise.reject(error);
  }
};

Model.prototype.findByConditions = async function(options, callback) {
  if (!U.isObject(options)) {
    throw new TypeError('findByConditions `options` must be an object')
  }
  if (!U.isArray(options.conditions)) {
    throw new TypeError(' `options.condition` must be an array')
  }
  const obj = {
    offset: 0,
    limit: null,
    operator: 'and',
    conditions: `object[]`,
    attr: { category: 'motivational' },
    get_attribute: `string[]`,

  };
  let res;
  const limit = +options.limit ? options.limit : null;
  const operator = options.operator ? options.operator : 'and';
  const offset = +options.offset ? options.offset : 0;
  const get_attribute = options.get_attribute ? options.get_attribute : ['*'];
  try {
    res = await callbackOrPromise(
    {
      operation: operations.SEARCH_BY_CONDITIONS,
      schema: this.SCHEMA_NAME,
      table: this.MODEL_NAME,
      operator,
      limit,
      offset,
      conditions,
      get_attribute

    }, callback);

    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }
  }
  catch (error) {
    Promise.reject(error)
  }
}
Model.prototype.findByValue = async function(options, callback) {
  if (!U.isObject(options)) {
    throw new TypeError('findByValue `options` must be an object')
  }
  if (!U.isArray(options.get_attribute)) {
    options.get_attribute = [options.get_attribute]
  }
  // const obj = {
  //   search_attribute:string;
  //   search_value:string;
  //   get_attribute?: string[];

  // };
  let res;

  const search_attribute = options.search_attribute
  const search_value = options.search_value
  const get_attribute = options.get_attribute ? options.get_attribute : ['*'];
  try {
    res = await callbackOrPromise(
    {

      operation: operations.SEARCH_BY_VALUE,
      schema: this.SCHEMA_NAME,
      table: this.MODEL_NAME,
      search_attribute,
      search_value,
      get_attribute

    }, callback);

    if (!U.isUndefined(res)) {
      Promise.resolve(res)
    }
  }
  catch (error) {
    Promise.reject(error);
  }
}



module.exports = Model;