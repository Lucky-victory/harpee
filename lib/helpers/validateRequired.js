const util =require("./util");

function validateRequired({ fieldsKeys, dataValues, requiredKeys }) {
   requiredKeys = util.findMultipleIndex(requiredKeys, true);

  if (requiredKeys.length) {
    for (const required of requiredKeys) {
      if ((util.isObject(dataValues[required]) || util.isArray(dataValues[required])
      ) && (util.isEmpty(dataValues[required]))) {
          throw new Error(
            `you can't leave '${fieldsKeys[required]}' object empty because it is required`
          );
        
      } else if (
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
module.exports=validateRequired;