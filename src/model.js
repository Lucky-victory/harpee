const U = require('../utils/utils');
const validateEntry = require('./validateNewEntry');
/** Creates a model for your project, the `modelName` represents a table in plural form.
 * @class Model
 * @param {string} modelName - the `modelName` is used to create a table.
 * 
 * @param {Object} schema - an `object` returned from `Schema` function;
 * @property {function} find
 * @property {function} findById
 * @property {function} findByIdAndRemove
 * @property {function} create
 * @property {function} update
 * @property {function} importFromCsv
 * @property {function} importFromCsvFile
 * @property {function} importFromCsvUrl
 * @property {function} clearAll
 * 
 */

function Model(modelName, schema) {
  if (!modelName || !U._isStr(modelName)) {
    throw new Error('modelName is required and it must be a String')
  }
  if (modelName && !schema) {
    throw new Error('schema is required')
  }
  const SCHEMA_NAME = schema.name;
  const MODEL_NAME = `${modelName}s`;

  if (schema && SCHEMA_NAME && modelName) {
    (async function() {

      const DESCRIBE_DB = async function() {
        let result, res;
        try {
          res = await axios({
            data: JSON.stringify({
              'operation': 'describe_all'
            })
          })
          result = res.data;
        }
        catch (err) {
          throw err;
        }
        return await result

      };
      const CREATE_SCHEMA = async function() {
        let res = await axios({
          data: JSON.stringify({
            'operation': 'create_schema',
            'schema': `${SCHEMA_NAME}`
          })
        })
        return await res.data
      }
      const CREATE_TABLE = async function() {
        let res = await axios({
          data: JSON.stringify({
            'operation': 'create_table',
            'schema': `${SCHEMA_NAME}`,
            'table': `${MODEL_NAME}`,
            'hash_attribute': 'id'
          })
        })
        return await res.data
      }


      const RUN_SCHEMA = async function() {

        await DESCRIBE_DB().then(res => {
          let result;
          result = res;
          const NO_SCHEMA = (!U._findStr(Object.keys(result), `${SCHEMA_NAME}`));

          if (NO_SCHEMA) {
            CREATE_SCHEMA();
          }

        });


      }
      const RUN_TABLE = async function() {
        await DESCRIBE_DB().then(res => {
          let result;
          result = res;
          const NO_TABLE = (!result[SCHEMA_NAME].hasOwnProperty(`${MODEL_NAME}`));

          if (NO_TABLE) {

            CREATE_TABLE();
          }

        });

      }
      RUN_SCHEMA().then(response => RUN_TABLE(response))
    })();
  }
  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** Gets all data from a table.
   * @param {(any[] | string[]) } arr - an empty array or an array of strings.
   * @param {responseCallback} [cb] - an optional callback function.
   * 
   * */
  this.find = async function(arr, cb) {
    let findArr = arr;
    if (!U._isArray(arr) || U._isEmpty(arr) || (arr.length === 1 && arr[0] === '*'.trim())) {
      findArr = ['*']
    }
    let res, err, data;
    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'sql',
          'sql': `SELECT ${findArr.join(',')} from ${SCHEMA_NAME}.${MODEL_NAME} `
        })
      });

      data = res.data


    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }


      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data

  }

  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** returns a data based on the specified `id`.
   * @param {(string | object )} id - a string of id or an object specifying the id key & value(string). 
   * @param { responseCallback} [cb] - an optional callback function.
   * 
   * */

  this.findById = async function(id, cb) {
    let res, data, err, idKey = 'id',
      idValue = id;
    if (U._isObj(id)) {
      idKey = Object.keys(id).join(',');
      idValue = Object.values(id).join('","');

    }
    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'sql',
          'sql': `SELECT * FROM ${SCHEMA_NAME}.[${MODEL_NAME}] WHERE ${idKey}='${idValue}'`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }

      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data[0]);

    return await data[0]
  }

  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** deletes data from the table based on the specified `id`.
   * @param {(string | object )} id - a string of id or an object specifying the id key & value(string). 
   * @param { responseCallback} [cb] - an optional callback function.
   * 
   * */

  this.findByIdAndRemove = async function(id, cb) {
    let res, data, err, idKey = 'id',
      idValue = id;
    if (U._isObj(id)) {
      idKey = Object.keys(id).join(',');
      idValue = Object.values(id).join("','");

    }

    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'sql',
          'sql': `DELETE FROM ${SCHEMA_NAME}.[${MODEL_NAME}] WHERE ${idKey} IN ('${idValue}')`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }
      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data
  }
  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** updates the table with new data on the specified `id`.
   * @param {(string | object | string[])} id - a string of id or an object specifying the id key & value(string). 
   * @param {Object} obj - an object of the new data to be updated. 
   * @param { responseCallback} [cb] - an optional callback function.
   * 
   * */

  this.update = async function(id, obj, cb) {
    let res, data, err, idKey = 'id',
      idValue = id;
    if (!obj) {
      throw new Error('please include an object of the data to be updated')
    }
    else if (obj && !U._isObj(obj)) {
      throw new Error('the data to be updated must be an object')
    }
    const UPDATE_ARR = U._objToArray(obj, '=').join(',');

    if (U._isObj(id)) {
      idKey = Object.keys(id).join(',');
      idValue = Object.values(id).join("','");

    }
    if (U._isArray(id)) {
      idValue = idValue.join("','")
    }

    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'sql',
          'sql': `UPDATE ${SCHEMA_NAME}.[${MODEL_NAME}] SET ${UPDATE_ARR} WHERE ${idKey} IN ('${idValue}')`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }


      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data
  }

  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** inserts new data into the table.
   * @param {Object} obj - an object of the new data to be inserted. 
   * @param { responseCallback} [cb] - an optional callback function.
   * 
   * */

  this.create = async function(obj, cb) {
    const SCHEMA_FIELDS = schema.fields;
    let res, err, data;
    const OBJ_KEYS = Object.keys(obj).join(',');
    const OBJ_VALUES = Object.values(obj).join("','");
    validateEntry(SCHEMA_FIELDS, obj)
    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'sql',
          'sql': `INSERT INTO ${SCHEMA_NAME}.[${MODEL_NAME}](${OBJ_KEYS}) VALUES('${OBJ_VALUES}')`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }


      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data

  }
  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** Import data from plain CSV.
   * @param {Object} options - an `object` that takes in `action` and `csv`.
   * @param {string} options.csv - plain CSV string.
   * @param {string} [options.action=insert] - optional `action` to be performed.
   * @param {responseCallback} [cb] - optional callback function.
   * */

  this.importFromCsv = async function(options, cb) {
    let res, data, err;
    const CSV_DATA = options.csv;
    const ACTION = options && options.action ? options.action : 'insert'
    if (!CSV_DATA || !U._isStr(CSV_DATA)) {
      throw new Error(' csv is required and it should be in string format')
    }

    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'csv_data_load',
          'action': `${ACTION}`,
          'schema': `${SCHEMA_NAME}`,
          'table': `${MODEL_NAME}`,
          'data': `${CSV_DATA}`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }
      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data
  }
  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** Import data from local CSV file.
   * @param {Object} options - an `object` that takes in `action` and `filePath`
   * @param {string} options.filePath - the relative path of the csv file.
   * @param {string} [options.action=insert] - optional `action` to be performed, default is `insert`;
   * @param {responseCallback} [cb] - optional callback function.

   * */

  this.importFromCsvFile = async function(options, cb) {
    let res, data, err;
    const ACTION = options && options.action ? options.action : 'insert';
    const FILE_PATH = options.filePath
    if (!FILE_PATH || !U._isStr(FILE_PATH)) {
      throw new Error('filePath is required and it should be a string')
    }

    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'csv_file_load',
          'action': `${ACTION}`,
          'schema': `${SCHEMA_NAME}`,
          'table': `${MODEL_NAME}`,
          'file_path': `${FILE_PATH}`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }
      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data
  }
  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** Import data from an external CSV file.
   * @param {Object} options - an `object` that takes in `action` and `fileUrl`
   * @param {string} options.fileUrl - an absolute url of the csv file.
   * @param {string} [options.action=insert] - optional `action` to be performed, default is `insert`;
   *@param {responseCallback} [cb] - optional callback function

   * */
  this.importFromCsvUrl = async function(options, cb) {
    let res, data, err;
    const ACTION = options && options.action ? options.action : 'insert'
    const FILE_URL = options.fileUrl;
    if (!FILE_URL || !U._isStr(FILE_URL)) {
      throw new Error('fileUrl is required and it should be string')
    }

    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'csv_url_load',
          'action': `${ACTION}`,
          'schema': `${SCHEMA_NAME}`,
          'table': `${MODEL_NAME}`,
          'csv_url': `${FILE_URL}`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }
      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data
  }
  /** response callback
   * @callback responseCallback
   * @param { * } err - returns an error or null if no errors.
   * @param { * } data - returns the response data or null .
   * */

  /** Import data from your AWS S3 Bucket into a table.
   * 
   * @param { Object } options - an object that takes in `s3Key` your aws key ,`s3Secret` your aws secret key,`bucket` your aws bucket,and `filename` the name of the csv or json file.
   * @param { string } options.s3Key - your aws key id.
   * @param { string } options.s3Secret - your aws secret key.
   * @param { string } options.bucket - your aws bucket.
   * @param { string } options.filename - your csv pr json filename .
   * @param { string } [options.action=insert] - the action to be performed `insert`,`update`,`upsert`. .
   * @param {responseCallback} [cb] - an optional callback function;
   * @return {promise} - returns a promise.
   */

  this.importFromS3 = async function(options, cb) {
    let res, data, err;
    const ACTION = options.action ? options.action : 'insert';
    const s3Key = options.s3Key;
    const s3Secret = options.s3Secret;
    const s3Bucket = options.bucket;
    const s3Filename = options.filename;
    if (!s3Key || !s3Secret || !s3Bucket || !s3Filename) {
      throw new Error('s3key, s3Secret, bucket and filename are required ');
    }
    if (s3Filename && (U._getExtname(s3Filename) !== 'csv' || U._getExtname(s3Filename) !== 'json')) {
      throw new Error('the file extension is invalid , only a .csv or .json file is acceptable')
    }
    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'import_from_s3',
          'action': `${ACTION}`,
          'schema': `${SCHEMA_NAME}`,
          'table': `${MODEL_NAME}`,
          's3': `{
          'aws_access_key_id':'${s3Key}',
          'aws_secret_access_key':'${s3Secret}',
          'bucket':'${s3Bucket}',
          'key':'${s3Filename}'
            }`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }
      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data
  }

  /** response callback.
   * @callback responseCallback
   * @param { * } err - returns an error if any or null if no errors.
   * @param { * } data - returns the response data if any or null .
   * */
  /** Deletes every data from the table, use this with caution;
   * 
   * @param {responseCallback} [cb] - an optional callback function.
   * @return {promise} - returns a promise;
   */
  this.clearAll = async function(cb) {
    let res, data, err;

    try {
      res = await axios({
        data: JSON.stringify({
          'operation': 'sql',
          'sql': `DELETE FROM ${SCHEMA_NAME}.[${MODEL_NAME}]`
        })
      })
      data = res.data;
    } catch (error) {
      if (error.request) {

        err = { message: error.message, data: error.request.response, status: error.request.status }
      }
      else if (error.response) {
        err = { message: error.message, data: error.response.data, status: error.response.status }
      }
      else {

        err = error;
      }
      if (cb) cb(err, null);
      throw (err)
    }
    if (cb) cb(null, await data);

    return await data
  }

}
module.exports= Model;

//harp.connect({ host: 'https://hashnode-lv.harperdbcloud.com', token: 'dmVlazpAdmVlay4yNDc=' })