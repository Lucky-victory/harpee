// @ts-ignore
const Utils = require("./utils");
const validateTypes=require('./validateTypes');

function validator(fields, newData) {
  const FIELDS_TYPES = [];
  const NEW_DATA_VALUES_TYPE = [];
  const REQUIRED_KEYS = [];
  const IS_EQUAL_TYPE = [];

  const FIELDS_KEYS = Utils._splitObjSorted(fields).keys;
  const FIELDS_VALUES = Utils._splitObjSorted(fields).values;
  const NEW_DATA_KEYS = Utils._splitObjSorted(newData).keys;
  const NEW_DATA_VALUES = Utils._splitObjSorted(newData).values;

  validateDataKeysLength({
    dataKeys: NEW_DATA_KEYS,
    fieldsKeys: FIELDS_KEYS,
  });

  validateKeys({
    fieldsKeys: FIELDS_KEYS,
    dataKeys: NEW_DATA_KEYS,
  });

  for (let i = 0; i < NEW_DATA_KEYS.length; i++) {
    const FIELDS_VALUE_TYPE = Utils._isObj(FIELDS_VALUES[i])
      ? FIELDS_VALUES[i].type
      : FIELDS_VALUES[i];

    const IT_HAS_REQUIRED = FIELDS_VALUES[i].required
      ? FIELDS_VALUES[i].required
      : null;

    REQUIRED_KEYS.push(IT_HAS_REQUIRED);

    FIELDS_TYPES.push(FIELDS_VALUE_TYPE);

    NEW_DATA_VALUES_TYPE.push(NEW_DATA_VALUES[i]);

    const CHECK_TYPE =
      Utils._getType(FIELDS_TYPES[i]) ===
      Utils._getType(NEW_DATA_VALUES_TYPE[i]);

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


function validateKeys({ fieldsKeys, dataKeys }) {
  const ALL_KEYS = [];
  for (let k = 0; k < fieldsKeys.length; k++) {
    ALL_KEYS.push(Utils._findStrInArr(fieldsKeys, dataKeys[k]));
  }
  const COMPARE_KEYS = Utils._findMultipleIndex(ALL_KEYS, false);
  if (COMPARE_KEYS.length) {
    for (let key = 0; key < COMPARE_KEYS.length; key++) {
      if (Utils._isUndefined(dataKeys[COMPARE_KEYS[key]])) {
        throw new Error(
          "you are trying to create less columns than your schema, you should exclude them in your schema or add a placeholder for it. ex: an empty string"
        );
      }
      throw new Error(dataKeys[COMPARE_KEYS[key]] + " is not in your schema");
    }
  }
}

function validateRequired({ fieldsKeys, dataValues, requiredKeys }) {
  const REQUIRED_KEYS = Utils._findMultipleIndex(requiredKeys, true);

  if (REQUIRED_KEYS.length) {
    for (const REQUIRED of REQUIRED_KEYS) {
      if (
        Utils._isObj(dataValues[REQUIRED]) ||
        Utils._isArray(dataValues[REQUIRED])
      ) {
        if (Utils._isEmpty(dataValues[REQUIRED])) {
          throw new Error(
            `you can't leave '${fieldsKeys[REQUIRED]}' object empty because it is required`
          );
        }
      } else {
        if (
          Utils._isUndefined(dataValues[REQUIRED]) ||
          Utils._isEmptyStr(dataValues[REQUIRED])
        ) {
          throw new Error(
            `you can't leave '${fieldsKeys[REQUIRED]}' empty because it is required`
          );
        }
      }
    }
  }
}

module.exports = validator;
