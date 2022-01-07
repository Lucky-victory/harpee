const Util = require("./utils");

function validateTypes({ types, dataTypes, dataKeys, fieldsType }) {
  const TYPES_INDEX = Util.findMultipleIndex(types, false);

  if (TYPES_INDEX.length) {
    for (const INDEX of TYPES_INDEX) {
      const DATA_VALUE_TYPE = Util.getType(dataTypes[INDEX]);

      const DATA_KEY = dataKeys[INDEX];

      const FIELD_VALUE_TYPE = Util.getType(fieldsType[INDEX]);

      throw new Error(
        `you are trying to assign '${DATA_VALUE_TYPE}', to '${DATA_KEY}', that has a data type of ' ${FIELD_VALUE_TYPE} '`
      );
    }
  }
}

module.exports= validateTypes;