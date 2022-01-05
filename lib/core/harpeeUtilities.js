const harpeeConfig = require('./harpeeConfig');
const harpeeConnect = require('./harpeeConnect');
const HarpeeHttp = require('./harpeeHttp');
const operations = require('../../constants/operations');
const utils = require('../../helpers/utils');

function HarpeeUtilities() {
   this.modelSchemaConfig = harpeeConfig.getConfig();
   HarpeeHttp.call(this, harpeeConnect.getConfig());
}
HarpeeUtilities.prototype = Object.create(HarpeeHttp.prototype);

HarpeeUtilities.prototype.addRole = async function(options) {
   let res;
   const schema = options.schema || this.modelSchemaConfig.schemaObject.name;
   const table = options.table || this.modelSchemaConfig.modelName;
   try {

      res = await this.$callbackOrPromise({
         operation: operations.ADD_ROLE,
         schema,
         table
      }, callback)
      if (!utils.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}

HarpeeUtilities.prototype.createSchema = async function(schema) {
   let res;
   const schema = options.schema
   if (!schema || utils.isEmptyStr(schema)) {
      throw new Error('please provide a name for your schema');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.CREATE_SCHEMA,
         schema,
      }, callback)
      if (!utils.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.createTable = async function(options) {
   let res;
   const schema = options.schema || this.modelSchemaConfig.schemaObject.name;
   const table = options.schema;
   const hash_attribute = options.hashAttribute || this.modelSchemaConfig.schemaObject.primary_key;
   if (!table) {
      throw new Error('please provide a name for the table');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.CREATE_TABLE,
         schema,
         table,
         hash_attribute
      }, callback)
      if (!utils.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.addUser = async function(options) {
   let res;

   const username = options.username;
   const password = options.password;
   const role = options.role;
   const active = options.active || true;
   try {

      res = await this.$callbackOrPromise({
         operation: operations.ADD_USER,
         username,
         password,
         role,
         active
      }, callback)
      if (!utils.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.listUsers = async function() {
   let res;

   try {

      res = await this.$callbackOrPromise({
         operation: operations.LIST_USERS,

      }, callback)
      if (!utils.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.exportLocal = async function(options) {
   let res;
   const format = utils.toLower(options.format);
   const path = options.path;
   const search_operation = options.searchOperation;
   if (!format || !path || !search_operation) {
      throw new Error('`format`,`path` and `searchOperation` are required');
   }
   else if (format && (format !== 'json' || format !== 'csv')) {
      throw new Error('`format` must be json or csv');
   }
   if (!utils.isObject(search_operation)) {
      throw new Error('`searchOperation` must be an object');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.EXPORT_LOCAL,
         format,
         path,
         search_operation,

      }, callback)
      if (!utils.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.exportToS3 = async function(options) {
   let res;
   const format = utils.toLower(options.format);
   const path = options.path;
   const search_operation = options.searchOperation;
   const bucket = options.s3Bucket;
   const aws_access_key_id = options.s3Key;
   const aws_access_secret_key = options.s3Secret;
   const filename = options.filename;
   if (!format || !path || !search_operation) {
      throw new Error('`format`,`path` and `searchOperation` are required');
   }
   else if (format && (format !== 'json' || format !== 'csv')) {
      throw new Error('`format` must be json or csv');
   }
   if (!utils.isObject(search_operation)) {
      throw new Error('`searchOperation` must be an object');
   }
   if (!s3Key || !s3Bucket || !filename || !s3Secret) {
      throw new Error('`s3Key`,`s3Bucket`,`s3Secret` and `filename` are required')
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.EXPORT_TO_S3,
         format,
         s3: {
            aws_access_key_id,
            aws_access_secret_key,
            bucket,
            key: filename
         },
         search_operation,

      }, callback)
      if (!utils.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
module.exports = HarpeeUtilities;