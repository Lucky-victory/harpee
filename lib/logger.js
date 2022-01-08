const HarpeeLogger=require('./core/harpeeLogger');

function Logger(){
  HarpeeLogger.call(this);
}
Logger.prototype.readLog=HarpeeLogger.prototype.readLog;
Logger.prototype.getJob=HarpeeLogger.prototype.getJob;
Logger.prototype.readTransactionLog=HarpeeLogger.prototype.readTransactionLog;
Logger.prototype.readTransactionLogByHashValue=HarpeeLogger.prototype.readTransactionLogByHashValue;
Logger.prototype.readTransactionLogByTimestamp=HarpeeLogger.prototype.readTransactionLogByTimestamp;
Logger.prototype.readTransactionLogByUser=HarpeeLogger.prototype.readTransactionLogByUser;


module.exports=Logger;