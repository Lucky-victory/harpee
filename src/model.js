const axios = require("axios");
const U = require("../utils/helpers");
const VALIDATOR = require("../utils/validators");

function Model(modelName, schema) {
  if (!modelName || !U._isStr(modelName)) {
    throw new Error("modelName is required and it must be a String");
  }
  if (modelName && !schema) {
    throw new Error("schema is required");
  }
  const SCHEMA_NAME = schema.name;
  this.SCHEMA_NAME = SCHEMA_NAME;

  const MODEL_NAME = `${modelName}s`;
  this.MODEL_NAME = MODEL_NAME;

  this.SCHEMA_FIELDS = schema && schema.fields;
  const PRIMARY_KEY = schema.primary_key;
  this.PRIMARY_KEY = PRIMARY_KEY;
  if (SCHEMA_NAME && MODEL_NAME) {
    (async function() {


      try {
        await axios({
          data: JSON.stringify({
            operation: "create_schema",
            schema: `${SCHEMA_NAME}`,
          }),
        });
      } catch (err) {
        // console.error(err);
      }
      try {
        // @ts-ignore
        await axios({
          data: JSON.stringify({
            operation: "create_table",
            schema: `${SCHEMA_NAME}`,
            table: `${MODEL_NAME}`,
            hash_attribute: `${PRIMARY_KEY}`,
          }),
        });
      } catch (err) {
        // console.error(err)
      }

    }());
  }
}
Model.prototype.query = async function(sqlQuery, callback) {
  let res;
  let err;
  let
    data;
  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "sql",
        sql: sqlQuery,
      }),
    });
    data = res.data;
  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }

    if (callback) callback(err, null);
    throw err;
  }
  if (callback) callback(null, await data);

  return data;
};
Model.prototype.describeModel = async function(callback) {
  let res;
  let err;
  let
    data;
  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "describe_table",
        schema: `${this.SCHEMA_NAME}`,
        table: `${this.MODEL_NAME}`
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }

    if (callback) callback(err, null);
    throw err;
  }

};

Model.prototype.find = async function(arr, callback) {
  let findArr = arr;
  if (
    !U._isArray(arr) ||
    U._isEmpty(arr) ||
    (arr.length && arr[0] === "*".trim())
  ) {
    findArr = ["*"];
  }
  let res;
  let err;
  let
    data;
  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "sql",
        sql: `SELECT ${findArr.join(",")} from ${this.SCHEMA_NAME}.${
          this.MODEL_NAME
        } `,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);
    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }

    if (callback) callback(err, null);
    throw (err);
  }

};

Model.prototype.findById = async function(id, callback) {
  let res;
  let data;
  let err;
  let idKey = "id";
  let idValue = id;
  if (U._isObj(id)) {
    idKey = U._splitObj(id).keys.join(",");
    idValue = U._splitObj(id).values.join('","');
  }
  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "sql",
        sql: `SELECT * FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] WHERE ${idKey}IN ('${idValue}')`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data[0]);

    return data[0];

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }

    if (callback) callback(err, null);
    throw (err);
  }
};
Model.prototype.findMany = async function(id, arr, callback) {
  let res;
  let data;
  let err;
  let idKey = "id";
  let idValue = id;
  let findArr = arr;

  if (U._isObj(id)) {
    idKey = U._splitObj(id).keys.join(",");
    idValue = U._splitObj(id).values.join('","');
  }
  if (
    !U._isArray(arr) ||
    U._isEmpty(arr) ||
    (arr.length && arr[0] === "*".trim())
  ) {
    findArr = ["*"];
  }

  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "sql",
        sql: `SELECT ${findArr.join(',')} FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] WHERE ${idKey}IN ('${idValue}')`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }

    if (callback) callback(err, null);
    return err;
  }
};

Model.prototype.findByIdAndRemove = async function(id, callback) {
  let res;
  let data;
  let err;
  let idKey = "id";
  let idValue = id;
  if (U._isObj(id)) {
    idKey = U._splitObj(id).keys.join(",");
    idValue = U._splitObj(id).values.join("','");
  }

  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "sql",
        sql: `DELETE FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] WHERE ${idKey} IN ('${idValue}')`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }
    if (callback) callback(err, null);
    return err;
  }
};

Model.prototype.update = async function(id, obj, callback) {
  let res;
  let data;
  let err;
  let idKey = "id";
  let idValue = id;
  if (!obj) {
    throw new Error("please include an object of the data to be updated");
  } else if (obj && !U._isObj(obj)) {
    throw new Error("the data to be updated must be an object");
  }
  const UPDATE_ARR = U._objToArray(obj, "=").join(",");

  if (U._isObj(id)) {
    idKey = U._splitObj(id).keys.join(",");
    idValue = U._splitObj(id).values.join("','");
  } else if (U._isArray(id)) {
    idValue = idValue.join("','");
  }

  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "sql",
        sql: `UPDATE ${this.SCHEMA_NAME}.[${this.MODEL_NAME}] SET ${UPDATE_ARR} WHERE ${idKey} IN ('${idValue}')`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }

    if (callback) callback(err, null);
    return err;
  }
};

Model.prototype.create = async function(obj, callback) {
  let res;
  let err;
  let
    data;
  if (!U._isObj(obj)) {
    throw new TypeError("must be an object");
  }
  VALIDATOR(this.SCHEMA_FIELDS, obj);
  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "insert",
        schema: `${this.SCHEMA_NAME}`,
        table: `${this.MODEL_NAME}`,
        records: [obj],
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }

    if (callback) callback(err, null);
    return err;
  }
};

Model.prototype.importFromCsv = async function(options, callback) {
  let res;
  let data;
  let
    err;
  const CSV_DATA = options.csv;
  const ACTION = options && options.action ? options.action : "insert";
  if (!CSV_DATA || !U._isStr(CSV_DATA)) {
    throw new Error(" csv is required and it should be in string format");
  }

  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "csv_data_load",
        action: `${ACTION}`,
        schema: `${this.SCHEMA_NAME}`,
        table: `${this.MODEL_NAME}`,
        data: `${CSV_DATA}`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }
    if (callback) callback(err, null);
    return err;
  }
};

Model.prototype.importFromCsvFile = async function(options, callback) {
  let res;
  let data;
  let
    err;
  if (!options || !U._isObj(options)) {
    throw new TypeError("options is required and must be object");
  }
  const ACTION = options && options.action ? options.action : "insert";
  const FILE_PATH = options.filePath;
  if (!FILE_PATH || !U._isStr(FILE_PATH)) {
    throw new Error("filePath is required and it should be a string");
  }

  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "csv_file_load",
        action: `${ACTION}`,
        schema: `${this.SCHEMA_NAME}`,
        table: `${this.MODEL_NAME}`,
        file_path: `${FILE_PATH}`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }
    if (callback) callback(err, null);
    return err;
  }
};

Model.prototype.importFromCsvUrl = async function(options, callback) {
  let res;
  let data;
  let
    err;
  if (!options || !U._isObj(options)) {
    throw new TypeError("options is required and must be object");
  }

  const ACTION = options && options.action ? options.action : "insert";
  const FILE_URL = options.fileUrl;
  if (!FILE_URL || !U._isStr(FILE_URL)) {
    throw new Error("fileUrl is required and it should be string");
  }

  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "csv_url_load",
        action: `${ACTION}`,
        schema: `${this.SCHEMA_NAME}`,
        table: `${this.MODEL_NAME}`,
        csv_url: `${FILE_URL}`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }
    if (callback) callback(err, null);
    return err;
  }
};

Model.prototype.importFromS3 = async function(options, callback) {
  let res;
  let data;
  let
    err;
  if (!U._isObj(options)) {
    throw new TypeError("options must be an object");
  }
  const ACTION = options.action ? options.action : "insert";
  const { s3Key } = options;
  const { s3Secret } = options;
  const s3Bucket = options.bucket;
  const s3Filename = options.filename;
  if (!s3Key || !s3Secret || !s3Bucket || !s3Filename) {
    throw new Error("s3key, s3Secret, bucket and filename are required ");
  }
  if (
    s3Filename &&
    (U._getExtname(s3Filename) !== "csv" ||
      U._getExtname(s3Filename) !== "json")
  ) {
    throw new Error(
      "the file extension is invalid , only a .csv or .json file is acceptable",
    );
  }
  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "import_from_s3",
        action: `${ACTION}`,
        schema: `${this.SCHEMA_NAME}`,
        table: `${this.MODEL_NAME}`,
        s3: `{
          'aws_access_key_id':'${s3Key}',
          'aws_secret_access_key':'${s3Secret}',
          'bucket':'${s3Bucket}',
          'key':'${s3Filename}'
            }`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }
    if (callback) callback(err, null);
    return err;
  }
};

/** Deletes every data from the table, use this with caution;
 *
 * @param {responseCallback} [callback] - an optional callback function.
 *
 */
Model.prototype.clearAll = async function(callback) {
  let res;
  let data;
  let
    err;

  try {
    // @ts-ignore
    res = await axios({
      data: JSON.stringify({
        operation: "sql",
        sql: `DELETE FROM ${this.SCHEMA_NAME}.[${this.MODEL_NAME}]`,
      }),
    });
    data = res.data;
    if (callback) callback(null, await data);

    return data;

  } catch (error) {
    if (error.request) {
      err = {
        message: error.message,
        data: error.request.response,
        status: error.request.status,
      };
    } else if (error.response) {
      err = {
        message: error.message,
        data: error.response.data,
        status: error.response.status,
      };
    } else {
      err = error;
    }
    if (callback) callback(err, null);
    return err;
  }
};
`SELECT * FROM dev.table WHERE ${obj.where.key}='${obj.where.value}' ${LIMIT ? ' FETCH NEXT '+ LIMIT +' ROWS': ''} ${OFFSET ? ' OFFSET '+ OFFSET+' ROWS' : ''} `
`SELECT ${GET_ATTR.join(',')} FROM dev.table WHERE ${obj.where.key}='${obj.where.value}' ${LIMIT ? ' LIMIT '+ LIMIT : ''} ${OFFSET ? ' OFFSET '+ OFFSET : ''} ${ORDERBY ? ' ORDER BY '+ORDERBY : ' ORDER BY '+this.PRIMARY_KEY} ${DESC ? ' DESC ' : ' ASC '} `
`{
  desc?:boolean,
  offset?:number,
  limit?:number,
  attr:object,
  get_attr?:array
  }`
Model.prototype.findByAttribute = async function(options, callback) {
  if (!U._isObj(options)) {
    throw new TypeError('findByAttribute "options" param must be an object')
  }
  if (!U._isObj(options.attr)) {
    throw new TypeError('"options.attr" property must be an object')
  }
  if (options.get_attr && !U._isArray(options.get_attr)) {
    throw new Error('"options.get_attr" must be an array')
  }
  const GET_ATTR = options.get_attr ? options.get_attr : ['*'];
  const obj = {
    attr: { category: 'motivational' },
    'get_attr': `string[]`,

  };
  let res;
  try {
    res = await axios(
    {
      data: JSON.stringify({
        'operation': 'search_by_value',
        'schema': `${this.SCHEMA_NAME}`,
        'table': `${this.MODEL_NAME}`,
        'search_attribute': `${obj.key}`,
        'search_value': `${obj.val}`,
        'get_attribute': ['*']
      })
    });

    return res.data
  }
  catch (error) {

  }
}
Model.prototype.findByConditions = async function(options, callback) {
  if (!U._isObj(options)) {
    throw new TypeError('findByConditions "options" param must be an object')
  }
  if (!U._isArray(options.conditions)) {
    throw new TypeError(' "options.conditions" must be an array')
  }
  const obj = {
    offset: 0,
    limit: null,
    operator: 'and',
    conditions: `object[]`,
    attr: { category: 'motivational' },
    'get_attr': `string[]`,

  };
  let res;
  try {
    res = await axios(
    {
      data: JSON.stringify({
        'operation': 'search_by_value',
        'schema': `${this.SCHEMA_NAME}`,
        'table': `${this.MODEL_NAME}`,
        'search_attribute': `${obj.key}`,
        'search_value': `${obj.val}`,
        'get_attribute': ['*']
      })
    });

    return res.data
  }
  catch (error) {

  }
}
module.exports = Model;