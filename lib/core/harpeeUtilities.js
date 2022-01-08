const harpeeConfig = require('./harpeeConfig');
const harpeeConnect = require('./harpeeConnect');
const HarpeeHttp = require('./harpeeHttp');
const operations = require('../../constants/operations');
const Util = require('../../helpers/utils');



function HarpeeUtilities() {
   this.modelSchemaConfig = harpeeConfig.getConfig();
   HarpeeHttp.call(this, harpeeConnect.getConfig());
}
HarpeeUtilities.prototype = Object.create(HarpeeHttp.prototype);

HarpeeUtilities.prototype.createSchema = async function(schema,callback) {
   let res;
   const schema = options.schema
   if (!schema || Util.isEmptyStr(schema)) {
      throw new Error('please provide a name for your schema');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.CREATE_SCHEMA,
         schema,
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.createTable = async function(options,callback) {
   let res;
   const schema = options.schema || this.modelSchemaConfig.schemaObject.name;
   const table = options.schema;
   const hash_attribute = options.hashAttribute || this.modelSchemaConfig.schemaObject.primary_key;
   if (!table || !schema) {
      throw new Error('please provide a name for the table along the schema');
   }
   if (!table && schema) {
      throw new Error('please provide a name for the table');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.CREATE_TABLE,
         schema,
         table,
         hash_attribute
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.addRole = async function(options,callback) {
   let res;
   if(!Util.isObject(options)){
      throw new Error('`options` must be an object');
   }
   const role= options.role;
   const permission = options.permission;
   if(!role || !permission){
      throw new Error('`role` and `permission` are required')
   }
   if(!Util.isObject(permission)){
      throw new Error('`permission` must be an object')
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.ADD_ROLE,
         role,
         permission
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}

HarpeeUtilities.prototype.alterRole = async function(options,callback) {
   let res;
   if(!Util.isObject(options)){
      throw new Error('`options` must be an object');
   }
   const role= options.role;
   const permission = options.permission;
   const id=options.id;
   if(!role || !permission || !id){
      throw new Error('`role` , `permission` and `id` are required')
   }
   if(!Util.isObject(permission)){
      throw new Error('`permission` must be an object')
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.ALTER_ROLE,
         role,
         permission,
         id
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}


HarpeeUtilities.prototype.addUser = async function(options,callback) {
   let res;
if (!Util.isObject(options)) {
   throw new Error('`options` must be an object');
}
   const username = options.username;
   const password = options.password;
   const role = options.role;
   const active = options.active || true;
   if (!username || !password || !permission) {
      throw new Error('`username`,`password` , and `persmission` are required');
   }
   if (!Util.isObject(permission)) {
      throw new Error('`permission` must be an object');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.ADD_USER,
         username,
         password,
         role,
         active
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.alterUser= async function(options,callback) {
   let res;

   const username = options.username;
   const password = options.password;
   const permission = options.permission;
   const active=options.active || true;
   if(!username || !password || !permission ){
      throw new Error('`username`,`password` , and `persmission` are required');
   }
   if(!Util.isObject(permission)){
      throw new Error('`permission` must be an object');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.ALTER_USER,
         username,
         password,
         permission,
         active
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.listUsers = async function(callback) {
   let res;

   try {

      res = await this.$callbackOrPromise({
         operation: operations.LIST_USERS,

      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.listRoles = async function(callback) {
   let res;

   try {

      res = await this.$callbackOrPromise({
         operation: operations.LIST_ROLES,

      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.createAuthenticationTokens = async function(options,callback) {
   let res;
const username=options.username || this.config.username;
const password=options.password || this.config.password;
   try {

      res = await this.$callbackOrPromise({
         operation: operations.CREATE_AUTHENTICATION_TOKENS,
username,
password
      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.refreshOperationToken = async function() {
   let res;

   try {

      res = await this.$callbackOrPromise({
         operation: operations.REFRESH_OPERATION_TOKEN,

      })
      if (!Util.isUndefined(res)) {
         const newToken=res.operation_token;
         const token=this.config['token'];
         harpeeConnect.setConfig({...this.config,token:newToken})
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.exportLocal = async function(options,callback) {
   let res;
   const format = Util.toLower(options.format);
   const path = options.path;
   const search_operation = options.searchOperation;
   if (!format || !path || !search_operation) {
      throw new Error('`format`,`path` and `searchOperation` are required');
   }
   else if (format && (format !== 'json' || format !== 'csv')) {
      throw new Error('`format` must be json or csv');
   }
   if (!Util.isObject(search_operation)) {
      throw new Error('`searchOperation` must be an object');
   }
   try {

      res = await this.$callbackOrPromise({
         operation: operations.EXPORT_LOCAL,
         format,
         path,
         search_operation,

      }, callback)
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
HarpeeUtilities.prototype.exportToS3 = async function(options,callback) {
   let res;
   const format = Util.toLower(options.format);
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
   if (!Util.isObject(search_operation)) {
      throw new Error('`searchOperation` must be an object');
   }
   if (!aws_access_key_id || !bucket || !filename || !aws_access_secret_key) {
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
      if (!Util.isUndefined(res)) {
         Promise.resolve(res);
      }


   } catch (err) {
      Promise.reject(err)
   }
}
module.exports = HarpeeUtilities;