const harpeeConfig=require('./harpeeConfig');
const harpeeConnect=require('./harpeeConnect');
const harpeeHttp=require('./harpeeHttp');
const operations = require('../../constants/operations');
const Util = require('../../helpers/utils');
function HarpeeLogger(){
  this.modelSchemaConfig=harpeeConfig.getConfig();
  harpeeHttp.call(this,harpeeConnect.getConfig());
}
HarpeeLogger.prototype=Object.create(harpeeHttp.prototype);

HarpeeLogger.prototype.readLogs= async function() {
  let res;
 
  try {
  
    res = await this.$callbackOrPromise({
      operation: operations.READ_LOGS,
   
    }, callback)
    if (!Util.isUndefined(res)) {
      Promise.resolve(res);
    }
  
  
  } catch (err) {
    Promise.reject(err)
  }
}
HarpeeLogger.prototype.readTransactionLog= async function(options) {
  let res;
  const schema=options.schema || this.modelSchemaConfig.schemaObject.name;
  const table=options.table || this.modelSchemaConfig.modelName;
  try {
  
    res = await this.$callbackOrPromise({
      operation: operations.READ_TRANSACTION_LOG,
      schema,
      table
    }, callback)
    if (!Util.isUndefined(res)) {
      Promise.resolve(res);
    }
  
  
  } catch (err) {
    Promise.reject(err)
  }
}
HarpeeLogger.prototype.transactionLogs= async function(options) {
  
}


module.exports=HarpeeLogger;