const harpeeConfig=require('./harpeeConfig');
const harpeeConnect=require('./harpeeConnect');
const HarpeeHttp=require('./harpeeHttp');
const operations = require('../../constants/operations');
const utils = require('../../helpers/utils');
function HarpeeUtilities(){
  this.modelSchemaConfig=harpeeConfig.getConfig();
  HarpeeHttp.call(this,harpeeConnect.getConfig());
}
HarpeeUtilities.prototype=Object.create(HarpeeHttp.prototype);

HarpeeUtilities.prototype.addRole= async function(options) {
  let res;
  const schema=options.schema || this.modelSchemaConfig.schemaObject.name;
  const table=options.table || this.modelSchemaConfig.modelName;
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
HarpeeUtilities.prototype.listRoles= async function(options) {
  let res;
  const schema=options.schema || this.modelSchemaConfig.schemaObject.name;
  const table=options.table || this.modelSchemaConfig.modelName;
  try {
  
    res = await this.$callbackOrPromise({
      operation: operations.LIST_ROLES,
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
HarpeeUtilities.prototype.createSchema= async function(options) {
  let res;
  const schema=options.schema || this.modelSchemaConfig.schemaObject.name;
  
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
HarpeeUtilities.prototype.createTable= async function(options) {
  let res;
  const schema=options.schema || this.modelSchemaConfig.schemaObject.name;
  const table=options.schema || this.modelSchemaConfig.modelName;
  const hash_attribute=options.hashAttribute || this.modelSchemaConfig.schemaObject.primary_key;
  
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
HarpeeUtilities.prototype.addUser= async function(options) {
   let res;
   const schema = options.schema || this.modelSchemaConfig.schemaObject.name;
   const table = options.table || this.modelSchemaConfig.modelName;
   try {

      res = await this.$callbackOrPromise({
         operation: operations.ADD_USER,
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
HarpeeUtilities.prototype.listUsers = async function(options) {
   let res;
   const schema = options.schema || this.modelSchemaConfig.schemaObject.name;
   const table = options.table || this.modelSchemaConfig.modelName;
   try {

      res = await this.$callbackOrPromise({
         operation: operations.LIST_USERS,
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
module.exports=HarpeeUtilities;