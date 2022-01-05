function validateTypes({ types, dataTypes, dataKeys, fieldsType }) {
  const TYPES_INDEX = utils.findMultipleIndex(types, false);

  if (TYPES_INDEX.length) {
    for (const INDEX of TYPES_INDEX) {
      const DATA_VALUE_TYPE = utils.getType(dataTypes[INDEX]);

      const DATA_KEY = dataKeys[INDEX];

      const FIELD_VALUE_TYPE = utils.getType(fieldsType[INDEX]);

      throw new Error(
        `you are trying to assign '${DATA_VALUE_TYPE}', to '${DATA_KEY}', that has a data type of ' ${FIELD_VALUE_TYPE} '`
      );
    }
  }
}

module.exports= validateTypes;