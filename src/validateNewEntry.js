const Utils = require('../utils/utils');
function validateNewEntry(fields, newData) {
  const FIELDS_TYPES = [],
    NEW_DATA_VALUES_TYPE = [],
    REQUIRED_KEYS = [];
  const IS_EQUAL_TYPE = [];
  const COMPARE_KEYS = [];
  const FIELDS_KEYS = Utils._splitObj(fields).keys;
  const FIELDS_VALUES = Utils._splitObj(fields).values;
  const NEW_DATA_KEYS = Utils._splitObj(newData).keys
  const NEW_DATA_VALUES = Utils._splitObj(newData).values;
  if (NEW_DATA_KEYS.length > FIELDS_KEYS.length) {
    console.error('the number of data you\'re trying to create is more than the columns specified in your schema, you should include them in your schema first');
    return
  }
  for (let i = 0; i < FIELDS_KEYS.length; i++) {
    const FIELDS_VALUES_TYPE = Utils._isObj(FIELDS_VALUES[i]) ? FIELDS_VALUES[i].type : FIELDS_VALUES[i];

    const IT_HAS_REQUIRED = FIELDS_VALUES[i].required ? FIELDS_VALUES[i].required : FIELDS_VALUES[i].required = false;

    REQUIRED_KEYS.push(IT_HAS_REQUIRED)

    FIELDS_TYPES.push(FIELDS_VALUES_TYPE);

    NEW_DATA_VALUES_TYPE.push(NEW_DATA_VALUES[i]);

    const CHECK_TYPE = Utils._getType(FIELDS_TYPES[i]) === Utils._getType(NEW_DATA_VALUES_TYPE[i]);

    IS_EQUAL_TYPE.push(CHECK_TYPE);
    COMPARE_KEYS.push(Utils._sameStrStrict(FIELDS_KEYS[i], NEW_DATA_KEYS[i]));

  }
  const NOT_SAME_TYPES_INDEX = Utils._findMultipleIndex(IS_EQUAL_TYPE, false);

  const NOT_SAME_KEYS = Utils._findMultipleIndex(COMPARE_KEYS, false);
  if (NOT_SAME_KEYS.length > 0) {
    for (const NOT_SAME of NOT_SAME_KEYS) {
      console.error(` '${NEW_DATA_KEYS[NOT_SAME]}' is not in your schema fields, you should include it first.`);
    }
    return
  }

  if (NOT_SAME_TYPES_INDEX.length > 0) {
    for (const NOT_SAME of NOT_SAME_TYPES_INDEX) {

      const INVALID_DATA_VALUE = Utils._getType(NEW_DATA_VALUES_TYPE[NOT_SAME]);

      const INVALID_DATA_KEY = NEW_DATA_KEYS[NOT_SAME];

      const INVALID_FIELD_VALUE = Utils._getType(FIELDS_TYPES[NOT_SAME]);

      console.error(`you are trying to assign '${INVALID_DATA_VALUE}', to '${INVALID_DATA_KEY}', that has a data type of ' ${INVALID_FIELD_VALUE} '`);



    }
    return
  }
  const REQUIRED_KEYS_ARR = Utils._findMultipleIndex(REQUIRED_KEYS, true);

  if (REQUIRED_KEYS.length > 0) {
    for (const REQUIRED of REQUIRED_KEYS_ARR) {
      if (Utils._isEmptyStr(NEW_DATA_VALUES[REQUIRED])) {

        console.log(`you can't leave '${FIELDS_KEYS[REQUIRED]}' empty because it is required`);
      }
    }
  }


}

module.exports= validateNewEntry;