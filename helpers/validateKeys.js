const Util = require("./utils");

function validateKeys({ fieldsKeys, dataKeys }) {
  const ALL_KEYS = [];
  for (let k = 0; k < fieldsKeys.length; k++) {
    ALL_KEYS.push(Util.findStringInArray(fieldsKeys, dataKeys[k]));
  }
  const COMPARE_KEYS = Util.findMultipleIndex(ALL_KEYS, false);
  if (COMPARE_KEYS.length) {
    for (let key = 0; key < COMPARE_KEYS.length; key++) {
      if (Util.isUndefined(dataKeys[COMPARE_KEYS[key]])) {
        throw new Error(
          "you are trying to create less columns than your schema, you should exclude them in your schema or add a placeholder for it. ex: an empty string"
        );
      }
      throw new Error(dataKeys[COMPARE_KEYS[key]] + " is not in your schema");
    }
  }
}
module.exports=validateKeys;