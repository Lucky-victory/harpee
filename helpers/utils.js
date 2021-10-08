const Utils = {
  /** Checks if the value is an Object.
   * @param { * } obj - the value to be checked
   * */

  isObject: function(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if the value is an Array.
   * @param { * } arr - the value to be checked
   * */

  isArray: function(arr) {
    if (Array.isArray(arr)) {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if the value is a String.
   * @param { * } str - the value to be checked
   * */

  isString: function(str) {
    if (Object.prototype.toString.call(str) === '[object String]') {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if the value is a Number.
   * @param { * } num - the value to be checked
   * */

  isNumber: function(num) {
    if (Object.prototype.toString.call(num) === '[object Number]') {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if the value is a Boolean.
   * @param { * } bool - the value to be checked
   * */

  isBoolean: function(bool) {
    if (Object.prototype.toString.call(bool) === '[object Boolean]') {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if the value is a Undefined.
   * @param { * } val - the value to be checked
   * */

  isUndefined: function(val) {
    if (Object.prototype.toString.call(val) === '[object Undefined]' || typeof val === 'undefined') {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if the value is a Null.
   * @param { * } val - the value to be checked
   * */

  isNull: function(val) {
    if (Object.prototype.toString.call(val) === '[object Null]') {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if the value is a Date.
   * @param { * } date - the value to be checked
   * */
  isDate: function(date) {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      return true
    }
    else {
      return false
    }
  },
  /** Evaluates two strings and checks if they have same or similar values.
   * @param { string } STR - the string to be evaluated.
   * @param { string } str - the string to find .
   * 
   * */
  itHas: function(STR, str) {
    if (STR.toLowerCase().includes(str.toLowerCase())) {
      return true
    }
    else {
      return false
    }
  },
  /** Evaluates two strings and checks if they have the same  values.
   * @param { string } STR - the string to be evaluated.
   * @param { string } str - the string to find .
   * 
   * */
  _sameStrStrict: function(STR, str) {
    if (STR.toLowerCase().trim() === str.toLowerCase().trim()) {
      return true
    }
    else {
      return false
    }
  },
  /** Checks if an object or an array is empty.
   * @param {(array | object)} arg - the value to be checked.
   * */
  isEmpty: function(arg) {
    if (Utils.isArray(arg) || Utils.isObject(arg)) {
      if (Object.keys(arg).length === 0) {
        return true
      }
      else {
        return false
      }

    }
    else {
      console.error('argument should be an array or an object');

    }
  },
  /** Checks if a string is empty.
   * @param {string} arg - the value to be checked.
   * */
  isEmptyStr: function(arg) {
    if (arg === '') {
      return true
    }
    else {
      return false
    }
  },
  /** Splits an object to an object of `keys` array and `values` array.
   * @param { object} obj - the object to be splitted.
   * */
  splitObject: function(obj) {
    const keys = [];
     const values = [];
    for (let key in obj) {
      keys.push(key);
      values.push(obj[key])
    }
    return { keys, values }
  },
  /** Splits an object to an object of `keys` sorted array and `values` sorted array .
   * @param { object} obj - the object to be splitted.
   * */
  splitObjectSorted: function(obj) {
    const keys = [];
     const values = [];
    Object.keys(obj).sort().forEach(function(key) {
      keys.push(key);
      values.push(obj[key])
    });
    return { keys, values }
  },
  /** Splits a string by a seperator and returns the last string
   * @param {string} str - the string to be splitted.
   * 
   */
  getExtname: function(str) {
    return str.split('.').pop();
  },
  /** Splits a string by a seperator and returns the first string
   * @param {string} str - the string to be splitted.
   * 
   */
  _getFirst: function(str, seperator) {
    return str.split(seperator).shift();
  },
  /** Converts an object into an array seperated by a seperator
   * @param {object} obj - the object to be converted
   * @param {string} seperator - a string to seperate the key and values
   * @return {array} - returns an array of strings;
   * 
   * 
   */
  objectToArray: function(obj, seperator = ',') {
    const arr = [];
    for (let key in obj) {
      arr.push(`${key}${seperator}'${obj[key]}'`)
    }
    return arr;
  },
  /** Returns the type of a value as a string.
   * @param { * } arg - the value to find the type.
   * 
   * */
  getType: function(arg) {
    let type;

    if (Utils.isString(arg) || arg === String) {

      type = 'String';
    }

    else if (Utils.isObject(arg) || arg === Object) {

      type = 'Object';
    }
    else if (Utils.isArray(arg) || arg === Array) {

      type = 'Array';
    }

    else if (Utils.isNumber(arg) || arg === Number) {
      type = 'Number';
    }
    else if (Utils.isBoolean(arg) || arg === Boolean) {
      type = 'Boolean';
    }
    else if (Utils.isDate(arg) || arg === Date) {
      type = 'Date';
    }
    else if (Utils.isNull(arg) || arg === null) {
      type = 'Null';
    }
    else if (Utils.isUndefined(arg) || arg === undefined) {
      type = 'Undefined';
    }
    else {
      type = 'Unknown';
    }

    return type;
  },
  /**Finds a string in an array and returns true or false.
   * @param {string[]} arr - an array of string.
   * @param { string } str - the string to find in the array.
   */
  findString: function(arr, str) {
    let itHas;
    arr.find((val) => {
      if (val.toLowerCase().trim() === str.toLowerCase().trim()) {
        itHas = true
      }
      else {
        itHas = false
      }
      return itHas
    });
    return itHas
  },
  /**Checks if an array includes a certain  string and returns true or false.
   * @param {string[]} arr - an array of string.
   * @param { string } str - the string to find in the array.
   */
  findStringInArray: function(arr, str) {
    let itHas;
    if (arr.includes(str)) {
      itHas = true
    }
    else {
      itHas = false
    }
    return itHas
  },
  /** returns indexes of same value in an array.
   * @param { array } arr - the array to perform the operation on.
   * @param { * } val - the value to find in the array.
   * */
  findMultipleIndex: function(arr, val) {
    const INDEXES = arr.reduce((accum, value, index) => {
      if (val === value) {
        accum.push(index);
      }
      return accum;
    }, [])

    return INDEXES;
  }

}

module.exports = Utils;