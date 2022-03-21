import util from "./util";


export type Keys={fieldsKeys:string[],dataKeys:string[]}
declare function validateKeys(keys:Keys):void;
function validateKeys({ fieldsKeys, dataKeys }:Keys) {
  const allKeys:string[] = [];
  for (let k = 0; k < fieldsKeys.length; k++) {
    allKeys.push(util.findStringInArray(fieldsKeys, dataKeys[k]));
  }
  const compareKeys:number[] = util.findMultipleIndex(allKeys, false);
  if (compareKeys.length) {
    for (const cKey of compareKeys) {
      if (util.isUndefined(dataKeys[cKey])) {
        throw new Error(
          "you are trying to create less columns than your schema, you should exclude them in your schema or add a placeholder for it"
        );
      }
      throw new Error(dataKeys[cKey] + " is not in your schema");
    }
  }
}

export default validateKeys;