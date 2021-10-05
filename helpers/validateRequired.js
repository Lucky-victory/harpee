function validateRequired({ fieldsKeys, dataValues, requiredKeys }) {
  const REQUIRED_KEYS = Utils._findMultipleIndex(requiredKeys, true);

  if (REQUIRED_KEYS.length) {
    for (const REQUIRED of REQUIRED_KEYS) {
      if (
        Utils._isObj(dataValues[REQUIRED]) ||
        Utils._isArray(dataValues[REQUIRED])
      ) {
        if (Utils._isEmpty(dataValues[REQUIRED])) {
          throw new Error(
            `you can't leave '${fieldsKeys[REQUIRED]}' object empty because it is required`
          );
        }
      } else {
        if (
          Utils._isUndefined(dataValues[REQUIRED]) ||
          Utils._isEmptyStr(dataValues[REQUIRED])
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