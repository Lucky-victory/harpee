import util from "./utils";

function validateTypes({ types, dataTypes, dataKeys, fieldTypes }) {
  const typesIndexes = util.findMultipleIndex(types, false);

  if (typesIndexes.length) {
    for (const index of typesIndexes) {
      const dataValueType = util.getType(dataTypes[index]);

      const dataKey = dataKeys[index];

      const fieldValueType = util.getType(fieldsType[index]);

      throw new Error(
        `you are trying to assign '${dataValueType}', to '${dataKey}', that has a data type of ' ${fieldValueType} '`
      );
    }
  }
}

export default validateTypes;