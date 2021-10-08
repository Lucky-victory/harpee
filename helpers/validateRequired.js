function validateRequired({ fieldsKeys, dataValues, requiredKeys }) {
  const REQUIRED_KEYS = Utils.findMultipleIndex(requiredKeys, true);

  if (REQUIRED_KEYS.length) {
    for (const REQUIRED of REQUIRED_KEYS) {
      if (
        Utils.isObject(dataValues[REQUIRED]) ||
        Utils.isArray(dataValues[REQUIRED])
      ) {
        if (Utils.isEmpty(dataValues[REQUIRED])) {
          throw new Error(
            `you can't leave '${fieldsKeys[REQUIRED]}' object empty because it is required`
          );
        }
      } else {
        if (
          Utils.isUndefined(dataValues[REQUIRED]) ||
          Utils.isEmptyStr(dataValues[REQUIRED])
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