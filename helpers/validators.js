// @ts-ignore
const utils = require("./utils");
const validateTypes=require('./validateTypes');
const validateDataKeysLength=require('./validateKeysLength');
const validateKeys=require('./validateKeys');
const validateRequired=require('./validateRequired');

function validator(fields, newData) {
  const FIELDS_TYPES = [];
  const NEW_DATA_VALUES_TYPE = [];
  const REQUIRED_KEYS = [];
  const IS_EQUAL_TYPE = [];

  const FIELDS_KEYS = utils.splitObjectSorted(fields).keys;
  const FIELDS_VALUES = utils.splitObjectSorted(fields).values;
  const NEW_DATA_KEYS = utils.splitObjectSorted(newData).keys;
  const NEW_DATA_VALUES = utils.splitObjectSorted(newData).values;

  validateDataKeysLength({
    dataKeys: NEW_DATA_KEYS,
    fieldsKeys: FIELDS_KEYS,
  });

  validateKeys({
    fieldsKeys: FIELDS_KEYS,
    dataKeys: NEW_DATA_KEYS,
  });

  for (let i = 0; i < NEW_DATA_KEYS.length; i++) {
    const FIELDS_VALUE_TYPE = utils.isObject(FIELDS_VALUES[i])
      ? FIELDS_VALUES[i].type
      : FIELDS_VALUES[i];

    const IT_HAS_REQUIRED = FIELDS_VALUES[i].required
      ? FIELDS_VALUES[i].required
      : null;

    REQUIRED_KEYS.push(IT_HAS_REQUIRED);

    FIELDS_TYPES.push(FIELDS_VALUE_TYPE);

    NEW_DATA_VALUES_TYPE.push(NEW_DATA_VALUES[i]);

    const CHECK_TYPE =
      utils.getType(FIELDS_TYPES[i]) ===
      utils.getType(NEW_DATA_VALUES_TYPE[i]);

    IS_EQUAL_TYPE.push(CHECK_TYPE);
  }

  validateTypes({
    types: IS_EQUAL_TYPE,
    dataKeys: NEW_DATA_KEYS,
    dataTypes: NEW_DATA_VALUES_TYPE,
    fieldsType: FIELDS_TYPES,
  });
  validateRequired({
    fieldsKeys: FIELDS_KEYS,
    dataValues: NEW_DATA_VALUES,
    requiredKeys: REQUIRED_KEYS,
  });
}


module.exports = validator;
