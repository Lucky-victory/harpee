const Utils = {
  _isObj: function(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      return true
    }
    else {
      return false
    }
  },
  _isArray: function(arr) {
    if (Array.isArray(arr)) {
      return true
    }
    else {
      return false
    }
  },
  _isStr: function(str) {
    if (Object.prototype.toString.call(str) === '[object String]') {
      return true
    }
    else {
      return false
    }
  },
  _isNum: function(num) {
    if (Object.prototype.toString.call(num) === '[object Number]') {
      return true
    }
    else {
      return false
    }
  },
  _isBool: function(bool) {
    if (Object.prototype.toString.call(bool) === '[object Boolean]') {
      return true
    }
    else {
      return false
    }
  },
  _isDate: function(date) {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      return true
    }
    else {
      return false
    }
  },
  _itHasStr: function(STR = '', str = '') {
    if (STR.toLowerCase().includes(str.toLowerCase())) {
      return true
    }
    else {
      return false
    }
  },
  _isEmpty: function(arg) {
    if (Utils._isArray(arg) || Utils._isObj(arg)) {
      if (Object.keys(arg).length === 0) {
        return true
      }
      else {
        return false
      }

    }
    else {
      throw new TypeError('argument should be an array or an object');

    }
  },
  _isEmptyStr:function(arg){
    if(arg === ''){
      return true
    }
    else{
      return false
    }
  },
  _splitObj: function(obj) {_getExtname
    const keys = [],
      values = [];
    for (let key in obj) {
      keys.push(key);
      values.push(obj[key])
    }
    return { keys, values }
  },
  /** Splits a string by a seperator and returns the last string
   * @param {string} str - the string to be splitted.
   * 
   */ 
  _getExtname:function(str){
    return str.split('.').pop();
  },
  /** Converts an object into an array seperated by a seperator
   * @param {object} obj - the object to be converted
   * @param {string} seperator - a string to seperate the key and values
   * @return {array} - returns an array of strings;
   * 
   * 
   */ 
  _objToArray: function(obj, seperator = ',') {
    const arr = [];
    for (let key in obj) {
      arr.push(`${key}${seperator}'${obj[key]}'`)
    }
    return arr;
  },
  _getType: function(arg) {
    let type;

    if (Utils._isStr(arg) || arg === String) {

      type = 'String';
    }

    else if (Utils._isObj(arg) || arg === Object) {

      type = 'Object';
    }
    else if (Utils._isArray(arg) || arg === Array) {

      type = 'Array';
    }

    else if (Utils._isNum(arg) || arg === Number) {
      type = 'Number';
    }
    else if (Utils._isBool(arg) || arg === Boolean) {
      type = 'Boolean';
    }
    else if (Utils._isDate(arg) || arg === Date) {
      type = 'Date';
    }
    else {
      type = 'Unknown';
    }

    return type;
  }
}


//module.exports=Utils;