const HarpeeLogger = require("./core/harpeeLogger");
/**
 *
 */
class Logger {
    constructor() {
        HarpeeLogger.call(this);
    }
}
Logger.prototype.readLog = HarpeeLogger.prototype.readLog;
Logger.prototype.getJob = HarpeeLogger.prototype.getJob;
Logger.prototype.readTransactionLog = HarpeeLogger.prototype.readTransactionLog;
Logger.prototype.readTransactionLogByHashValue =
    HarpeeLogger.prototype.readTransactionLogByHashValue;
Logger.prototype.readTransactionLogByTimestamp =
    HarpeeLogger.prototype.readTransactionLogByTimestamp;
Logger.prototype.readTransactionLogByUser =
    HarpeeLogger.prototype.readTransactionLogByUser;

new HarpeeLogger();
module.exports = Logger;
