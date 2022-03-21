import util from "./util";
import validateTypes from "./validateTypes";
import validateKeysLength from "./validateKeysLength";
import validateKeys from "./validateKeys";
import validateRequired from"./validateRequired";

import {Fields} from "../core/harpeeSchema";

// export type Fields<T>=T & {[key:string]:any}
export type Records<T>=T & {[key:string]:any}

declare function validator(fields:Fields<{}>,newRecord:Records<{}>):void;
function validator(fields, newRecord) {
   const fieldTypes:string[] = [];
   const newRecordValuesType:string[] = [];
   const requiredKeys:string[] = [];
   const isEqualType:boolean[] = [];

   const fieldsKeys:string[] = util.splitObjectSorted(fields).keys;
   const fieldsValues:string[] = util.splitObjectSorted(fields).values;
   const newRecordKeys:string[] = util.splitObjectSorted(newRecord).keys;
   const newRecordValues:string[] = util.splitObjectSorted(newRecord).values;

   validateKeysLength({
      dataKeys: newRecordKeys,
      fieldsKeys,
   });

   validateKeys({
      fieldsKeys,
      dataKeys: newRecordKeys,
   });

   for (let i = 0; i < newRecordKeys.length; i++) {
      const fieldsValueType = util.isObject(fieldsValues[i]) ?
         fieldsValues[i].type :
         fieldsValues[i];

      const itHasRequired = fieldsValues[i].required ?
         fieldsValues[i].required :
         null;

      requiredKeys.push(itHasRequired);

      fieldTypes.push(fieldsValueType);

      newRecordValuesType.push(newRecordValues[i]);

      const checkType =
         util.getType(fieldTypes[i]) ===
         util.getType(newRecordValuesType[i]);

      isEqualType.push(checkType);
   }

   validateTypes({
      types: isEqualType,
      dataKeys: newRecordKeys,
      dataTypes: newRecordValuesType,
      fieldTypes
   });
   validateRequired({
      fieldsKeys,
      dataValues: newRecordValues,
      requiredKeys
   });
}


export default validator;