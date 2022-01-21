const util = require("./utils");
function validateKeys({ fieldsKeys, dataKeys }) {
  const allKeys = [];
  for (let k = 0; k < fieldsKeys.length; k++) {
    allKeys.push(util.findStringInArray(fieldsKeys, dataKeys[k]));
  }
  const compareKeys = util.findMultipleIndex(allKeys, false);
  if (compareKeys.length) {
    for (let key = 0; key < compareKeys.length; key++) {
      if (util.isUndefined(dataKeys[compareKeys[key]])) {
        throw new Error(
          "you are trying to create less columns than your schema, you should exclude them in your schema or add a placeholder for it"
        );
      }
      throw new Error(dataKeys[compareKeys[key]] + " is not in your schema");
    }
  }
}
module.exports=validateKeys;