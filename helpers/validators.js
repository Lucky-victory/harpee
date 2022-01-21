
const util = require("./utils");
const validateTypes=require('./validateTypes');
const validateDataKeysLength=require('./validateKeysLength');
const validateKeys=require('./validateKeys');
const validateRequired=require('./validateRequired');

function validator(fields, newRecord) {
  const fieldTypes = [];
  const newRecordValuesType = [];
  const requiredKeys = [];
  const isEqualType = [];

  const fieldsKeys = util.splitObjectSorted(fields).keys;
  const fieldsValues = util.splitObjectSorted(fields).values;
  const newRecordKeys = util.splitObjectSorted(newRecord).keys;
  const newRecordValues = util.splitObjectSorted(newRecord).values;

  validateDataKeysLength({
    dataKeys: newRecordKeys,
    fieldsKeys,
  });

  validateKeys({
    fieldsKeys,
    dataKeys: newRecordKeys,
  });

  for (let i = 0; i < newRecordKeys.length; i++) {
    const fieldsValueType = util.isObject(fieldsValues[i])
      ? fieldsValues[i].type
      : fieldsValues[i];

    const itHasRequired = fieldsValues[i].required
      ? fieldsValues[i].required
      : null;

    requiredKeys.push(itHasRequired);

    fieldTypes.push(fieldsValueType);

    newRecordValuesType.push(newRecordValues[i]);

    const checkType =
      util.getType(fieldTypes[i]) ===
      util.getType(newRecordValuesType[i]);

    isEqualType.push(checkType);
  }

  validateTypes({
    types: isEqualType,
    dataKeys: newRecordKeys,
    dataTypes: newRecordValuesType,
    fieldTypes
  });
  validateRequired({
    fieldsKeys,
    dataValues: newRecordValues,
    requiredKeys
  });
}


module.exports = validator;
