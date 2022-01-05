const HarpeeModel = require('./core/harpeeModel');

function Model(modelName, schemaObject) {
   HarpeeModel.call(this, modelName, schemaObject);
}
Model.prototype.describeModel = HarpeeModel.prototype.describeModel;
Model.prototype.find = HarpeeModel.prototype.find;
Model.prototype.findOne = HarpeeModel.prototype.findOne;
Model.prototype.findById = HarpeeModel.prototype.findById;
Model.prototype.findByValue = HarpeeModel.prototype.findByValue;
Model.prototype.findByConditions = HarpeeModel.prototype.findByConditions;
Model.prototype.findByIdAndRemove = HarpeeModel.prototype.findByIdAndRemove;
Model.prototype.findAndRemove = HarpeeModel.prototype.findAndRemove;
Model.prototype.query = HarpeeModel.prototype.query;
Model.prototype.clearAll = HarpeeModel.prototype.clearAll;
Model.prototype.update = HarpeeModel.prototype.update;
Model.prototype.create = HarpeeModel.prototype.create;
Model.prototype.importFromCsv = HarpeeModel.prototype.importFromCsv;
Model.prototype.importFromCsvFile = HarpeeModel.prototype.importFromCsvFile;
Model.prototype.importFromCsvUrl = HarpeeModel.prototype.importFromCsvUrl;
Model.prototype.importFromS3 = HarpeeModel.prototype.importFromS3;


module.exports = Model;