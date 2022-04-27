const util = {
    /** Checks if the value is an Object.
     * @param { * } obj - the value to be checked
     * */

    isObject: function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    },
    /** Checks if the value is an Array.
     * @param { * } arr - the value to be checked
     * */

    isArray: function (arr) {
        return Array.isArray(arr);
    },
    /** Checks if the value is a String.
     * @param { * } str - the value to be checked
     * */

    isString: function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    },
    /** Checks if the value is a Number.
     * @param { * } num - the value to be checked
     * */

    isNumber: function (num) {
        return Object.prototype.toString.call(num) === "[object Number]";
    },
    /** Checks if the value is a Boolean.
     * @param { * } bool - the value to be checked
     * */

    isBoolean: function (bool) {
        return Object.prototype.toString.call(bool) === "[object Boolean]";
    },
    /** Checks if the value is a Function.
     * @param { * } val - the value to be checked
     * */

    isFunction: function (val) {
        return Object.prototype.toString.call(val) === "[object Function]";
    },
    /** Checks if the value is a Undefined.
     * @param { * } val - the value to be checked
     * */

    isUndefined: function (val) {
        return (
            Object.prototype.toString.call(val) === "[object Undefined]" ||
            typeof val === "undefined"
        );
    },
    /** Checks if the value is a Null.
     * @param { * } val - the value to be checked
     * */

    isNull: function (val) {
        return Object.prototype.toString.call(val) === "[object Null]";
    },
    /** Checks if the value is a Date.
     * @param { * } date - the value to be checked
     * */
    isDate: function (date) {
        return Object.prototype.toString.call(date) === "[object Date]";
    },
    /** Evaluates two strings and checks if they have same or similar values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    itHas: function (STR, str) {
        return STR.toLowerCase().includes(str.toLowerCase());
    },
    /** Evaluates two strings and checks if they have the same  values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    _sameStrStrict: function (STR, str) {
        return STR.toLowerCase().trim() === str.toLowerCase().trim();
    },
    /** Checks if an object or an array is empty.
     * @param {(array | object)} arg - the value to be checked.
     * */
    isEmpty: function (arg) {
        if (util.isArray(arg) || util.isObject(arg)) {
            return Object.keys(arg).length === 0;
        } else {
            console.error("argument should be an array or an object");
        }
    },
    /** Checks if a string is empty.
     * @param {string} arg - the value to be checked.
     * */
    isEmptyStr: function (arg) {
        return arg === "";
    },
    /** Turns the String to lowercase
     * @param {string} str - the string to be transformed
     */
    toLower: function (str) {
        return String(str).toLowerCase();
    },
    /** Turns the String to uppercase
     * @param {string} str - the string to be transformed
     */
    toUpper: function (str) {
        return String(str).toUpperCase();
    },
    /** Splits an object to an object of `keys` array and `values` array.
     * @param { object} obj - the object to be splitted.
     * */
    splitObject: function (obj) {
        const keys = [];
        const values = [];
        for (let key in obj) {
            keys.push(key);
            values.push(obj[key]);
        }
        return { keys, values };
    },
    /** Splits an object to an object of `keys` sorted array and `values` sorted array .
     * @param { object} obj - the object to be splitted.
     * */
    splitObjectSorted: function (obj) {
        const keys = [];
        const values = [];
        Object.keys(obj)
            .sort()
            .forEach(function (key) {
                keys.push(key);
                values.push(obj[key]);
            });
        return { keys, values };
    },
    /**
     * 
     * @param {{[key:string]:any}[]} arrayOfObj - an array of objects
     * @param {boolean} [keys] - when true, returns object keys otherwise object values 
     * @returns {string[]}
     */
    ObjectArrayToStringArray(arrayOfObj,keys=false){
        if(!Array.isArray(arrayOfObj)){
            return []
        }
        return arrayOfObj.reduce((accum,item)=>{
            for(let key in item){
                keys ? accum.push(key) : accum.push(item[key]);
            }
            return accum;
        },[])
    },
    
    /** Splits a string by a seperator and returns the last string
     * @param {string} str - the string to be splitted.
     *
     */
    getExtname: function (str) {
        return str.split(".").pop();
    },
    /** Splits a string by a seperator and returns the first string
     * @param {string} str - the string to be splitted.
     *
     */
    getFirst: function (str, seperator) {
        return str.split(seperator).shift();
    },
    /** Converts an object into an array seperated by a seperator
     * @param {object} obj - the object to be converted
     * @param {string} seperator - a string to seperate the key and values
     * @return {array} - returns an array of strings;
     *
     *
     */
    objectToArray: function (obj, seperator = ",") {
        const arr = [];
        for (let key in obj) {
            arr.push(`${key}${seperator}'${obj[key]}'`);
        }
        return arr;
    },
    /** Returns the type of a value as a string.
     * @param { * } arg - the value to find the type.
     *
     * */
    getType: function (arg) {
        let type;

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

    
    /**Checks if an array includes a certain  string and returns true or false.
     * @param {string[]} arr - an array of string.
     * @param { string } str - the string to find in the array.
     */
    findStringInArray: function (arr, str) {
       
        return (arr.includes(str)) 
       
    },
    /** returns indexes of same value in an array.
     * @param { array } arr - the array to perform the operation on.
     * @param { * } val - the value to find in the array.
     * */
    findMultipleIndex: function (arr, val) {
        return (arr.reduce((accum, value, index) => {
            if (val === value) {
                accum.push(index);
            }
            return accum;
        }, [])
)
        
    }
    };

module.exports=util;
