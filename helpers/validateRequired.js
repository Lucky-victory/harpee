function validateRequired({ fieldsKeys, dataValues, requiredKeys }) {
  const REQUIRED_KEYS = utils.findMultipleIndex(requiredKeys, true);

  if (REQUIRED_KEYS.length) {
    for (const REQUIRED of REQUIRED_KEYS) {
      if (
        utils.isObject(dataValues[REQUIRED]) ||
        utils.isArray(dataValues[REQUIRED])
      ) {
        if (utils.isEmpty(dataValues[REQUIRED])) {
          throw new Error(
            `you can't leave '${fieldsKeys[REQUIRED]}' object empty because it is required`
          );
        }
      } else {
        if (
          utils.isUndefined(dataValues[REQUIRED]) ||
          utils.isEmptyStr(dataValues[REQUIRED])
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