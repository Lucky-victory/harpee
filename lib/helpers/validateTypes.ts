import util from "./util";

export interface TypesObj{
   types:string[];
   dataTypes:string[];
   dataKeys:string[];
   fieldTypes:string[];
}
declare function validateTypes(arg:TypesObj):void;
function validateTypes({ types, dataTypes, dataKeys, fieldTypes }) {
  const typesIndexes:number[] = util.findMultipleIndex(types, false);

  if (typesIndexes.length) {
    for (const index of typesIndexes) {
      const dataValueType = util.getType(dataTypes[index]);

      const dataKey:string = dataKeys[index];

      const fieldValueType:string = util.getType(fieldsType[index]);

      throw new Error(
        `you are trying to assign '${dataValueType}', to '${dataKey}', that has a data type of ' ${fieldValueType} '`
      );
    }
  }
}

export default validateTypes;