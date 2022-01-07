const Util = require("./utils");

function validateRequired({ fieldsKeys, dataValues, requiredKeys }) {
  const REQUIRED_KEYS = Util.findMultipleIndex(requiredKeys, true);

  if (REQUIRED_KEYS.length) {
    for (const REQUIRED of REQUIRED_KEYS) {
      if (
        Util.isObject(dataValues[REQUIRED]) ||
        Util.isArray(dataValues[REQUIRED])
      ) {
        if (Util.isEmpty(dataValues[REQUIRED])) {
          throw new Error(
            `you can't leave '${fieldsKeys[REQUIRED]}' object empty because it is required`
          );
        }
      } else {
        if (
          Util.isUndefined(dataValues[REQUIRED]) ||
          Util.isEmptyStr(dataValues[REQUIRED])
        ) {
          throw new Error(
            `you can't leave '${fieldsKeys[REQUIRED]}' empty because it is required`
          );
        }
      }
    }
  }
}
module.exports=validateRequired;