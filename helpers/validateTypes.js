function validateTypes({ types, dataTypes, dataKeys, fieldsType }) {
  const TYPES_INDEX = Utils.findMultipleIndex(types, false);

  if (TYPES_INDEX.length) {
    for (const NOT_SAME of TYPES_INDEX) {
      const DATA_VALUE_TYPE = Utils.getType(dataTypes[NOT_SAME]);

      const DATA_KEY = dataKeys[NOT_SAME];

      const FIELD_VALUE_TYPE = Utils.getType(fieldsType[NOT_SAME]);

      throw new Error(
        `you are trying to assign '${DATA_VALUE_TYPE}', to '${DATA_KEY}', that has a data type of ' ${FIELD_VALUE_TYPE} '`
      );
    }
  }
}

module.exports= validateTypes;