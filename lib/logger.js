const HarpeeLogger=require('./core/harpeeLogger');
// const harpeeConfig=require('./core/harpeeConfig');

function Logger(){
  HarpeeLogger.call(this);
}
Logger.prototype.transactionLogs=HarpeeLogger.prototype.transactionLogs;


module.exports=Logger;