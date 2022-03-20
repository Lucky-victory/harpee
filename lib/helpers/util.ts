const util:Util = {
    /** Checks if the value is an Object.
     * */

    isObject(obj:any):boolean {
        return Object.prototype.toString.call(obj) === "[object Object]";
    },
    /** Checks if the value is an Array.
     * */

    isArray(arr:any):boolean {
        return Array.isArray(arr);
    },
    /** Checks if the value is a String.
     * */

    isString(val:any):boolean {
        return Object.prototype.toString.call(val) === "[object String]";
    },
    /** Checks if the value is a Number.
     * */

    isNumber(val:any):boolean {
        return Object.prototype.toString.call(val) === "[object Number]";
    },
    /** Checks if the value is a Boolean.
     * */

    isBoolean(val:any):boolean {
        return Object.prototype.toString.call(val) === "[object Boolean]";
    },
    /** Checks if the value is a Function.
     * */

    isFunction(val:any):boolean {
        return Object.prototype.toString.call(val) === "[object Function]";
    },
    /** 
     * Checks if the value is Undefined.
     * */

    isUndefined(val:any):boolean {
        return (
            Object.prototype.toString.call(val) === "[object Undefined]" ||
            typeof val === "undefined"
        );
    },
    /** Checks if the value is a Null.
     * */

    isNull(val:any):boolean {
        return Object.prototype.toString.call(val) === "[object Null]";
    },
    /** 
     * Checks if the value is a Date.
     * */
    isDate(date:any):boolean {
        return Object.prototype.toString.call(date) === "[object Date]";
    },
    /** 
     * Evaluates two strings and checks if they have same or similar values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    itHas(STR:string, str:string):boolean {
        return STR.toLowerCase().includes(str.toLowerCase());
    },
    /** 
     * Evaluates two strings and checks if they have the same  values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    _sameStrStrict(STR:string, str:string):boolean {
        return STR.toLowerCase().trim() === str.toLowerCase().trim();
    },
    /** 
     * Checks if an object or an array is empty.
     * */
    isEmpty(arg:(object |(string|number)[])):boolean {

        if (util.isArray(arg) || util.isObject(arg)) {
            return Object.keys(arg).length === 0;
        } else {
            console.error("argument should be an array or an object");
        }
    },
    /** 
     * Checks if a string is empty
     * */
    isEmptyStr(arg:string):boolean {
        return arg === "";
    },
    /** 
     * Turns the String to lowercase
     */
    toLower(str:string):string {
        return String(str).toLowerCase();
    },
    /** 
     * Turns the String to uppercase
     */
    toUpper(str:string):string {
        return String(str).toUpperCase();
    },
    /**
     * Splits an object to an object of `keys` array and `values` array.
     */
    splitObject(obj:object):KeysValuesObject {
        const keys:(string|number)[] = [];
      const values:(string|number)[] = [];
        for (let key in obj) {
            keys.push(key);
            values.push(obj[key]);
        }
        
        return { keys, values };
    },
    /** 
     * Splits an object to an object of `keys` sorted array and `values` sorted array .
    */
    splitObjectSorted(obj:object):KeysValuesObject {
        const keys:string[] = [];
        const values:string[] = [];
        Object.keys(obj)
            .sort()
            .forEach((key)=>{
                keys.push(key);
                values.push(obj[key]);
            });
        return { keys, values };
    },
    /**
     * Splits a file name and returns the last part after a `.`,to get the extension
     */
    getExtname(str:string):string{
       return str.split(".").pop();
       
    },
    /** 
     * Splits a string by a seperator and returns the first string.
     */
    getFirst(str:string, seperator:string):string {
        return str.split(seperator).shift();
    },
    /**
     * Converts an object into an array seperated by a seperator
     * @param {object} obj - the object to be converted
     *
     */
    objectToArray(obj:object, seperator?:string = ","):string[] {
        const arr:string[] = [];
        for (let key in obj) {
            arr.push(`${key}${seperator}'${obj[key]}'`);
        }
        return arr;
    },
    /** 
     * Returns the type of a value as a string.
     * @param { * } arg - the value to find the type.
     *
     * */
    getType(arg:any):string {
        let type:string;

        if (util.isString(arg) || arg === String) {
            type = "String";
        } else if (util.isObject(arg) || arg === Object) {
            type = "Object";
        } else if (util.isArray(arg) || arg === Array) {
            type = "Array";
        } else if (util.isNumber(arg) || arg === Number) {
            type = "Number";
        } else if (util.isBoolean(arg) || arg === Boolean) {
            type = "Boolean";
        } else if (util.isDate(arg) || arg === Date) {
            type = "Date";
        } else if (util.isNull(arg) || arg === null) {
            type = "Null";
        } else if (util.isUndefined(arg) || arg === undefined) {
            type = "Undefined";
        } else {
            type = "Unknown";
        }

        return type;
    },

    
    /**
     * Checks if an array includes a certain  string and returns true or false.
     * @param {string[]} arr - an array of string.
     * @param { string } str - the string to find in the array.
     */
    findStringInArray(arr:string[], str:string) :boolean{
      
        return (arr.includes(str)) 
    },
    /**
     * Returns indexes of same value in an array.
     * @param { array } arr - the array to perform the operation on.
     * @param { * } val - the value to find in the array.
     * */
    findMultipleIndex(arr:Array<StrOrNum>, val:number|string):Array<StrOrNum>{
   return (arr.reduce((accum:Array<StrOrNum>, value:(string|number), index:number):Array<StrOrNum> => {
            if (val === value) {
                accum.push(index);
            }
          
            return accum;
        }, [])) ;
        
    }
    
    };



export interface KeysValuesObject{
   keys:string[];
   values:string[];
}
export type StrOrNum=(string|number);
export interface Util{
    isObject(obj:any):boolean,
    isArray(arr:any):boolean,
    isString(val:any):boolean ,
    isNumber(val:any):boolean,
    isBoolean(val:any):boolean,
    isFunction(val:any):boolean,
    isUndefined(val:any):boolean,
    isNull(val:any):boolean,
    isDate(date:any):boolean,
    itHas(STR:string, str:string):boolean,
    _sameStrStrict(STR:string, str:string):boolean,
    isEmpty(arg:object |((string|number)[])):boolean,
    isEmptyStr(arg:string):boolean,
    toLower(str:string):string,
    toUpper(str:string):string,
    splitObject(obj:object):KeysValuesObject,
    splitObjectSorted(obj:object):KeysValuesObject,
    getExtname(str:string):string,
   
    getFirst(str:string, seperator:string):string,
   
    objectToArray(obj:object, seperator?:string):string[],
    getType(arg:any):string,
    findStringInArray(arr:string[], str:string):boolean,
    findMultipleIndex(arr:Array<StrOrNum>, val:number|string):Array<StrOrNum>;
   
   
}
export default util;
