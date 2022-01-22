
function validateDataKeysLength({ dataKeys, fieldsKeys }) {
  if (dataKeys.length > fieldsKeys.length) {
    throw new Error(
      "the number of data you're trying to create is more than the columns specified in your schema, you should include them in your schema first"
    );
  }
}
export default validateDataKeysLength;