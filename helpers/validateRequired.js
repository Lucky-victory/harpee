const util = require("./utils");

function validateRequired({ fieldsKeys, dataValues, requiredKeys }) {
  const requiredKeys = util.findMultipleIndex(requiredKeys, true);

  if (requiredKeys.length) {
    for (const required of requiredKeys) {
      if (
        util.isObject(dataValues[required]) ||
        util.isArray(dataValues[required])
      ) {
        if (util.isEmpty(dataValues[required])) {
          throw new Error(
            `you can't leave '${fieldsKeys[required]}' object empty because it is required`
          );
        }
      } else {
        if (
          util.isUndefined(dataValues[required]) ||
          util.isEmptyStr(dataValues[required])
        ) {
          throw new Error(
            `you can't leave '${fieldsKeys[required]}' empty because it is required`
          );
        }
      }
    }
  }
}
module.exports=validateRequired;