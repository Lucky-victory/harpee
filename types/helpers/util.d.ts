export default util;
declare namespace util {
    function isObject(obj: any): boolean;
    function isArray(arr: any): boolean;
    function isString(str: any): boolean;
    function isNumber(num: any): boolean;
    function isBoolean(bool: any): boolean;
    function isFunction(val: any): boolean;
    function isUndefined(val: any): boolean;
    function isNull(val: any): boolean;
    function isDate(date: any): boolean;
    function itHas(STR: string, str: string): any;
    function _sameStrStrict(STR: string, str: string): boolean;
    function isEmpty(arg: any): boolean;
    function isEmptyStr(arg: string): boolean;
    function toLower(str: string): string;
    function toUpper(str: string): string;
    function splitObject(obj: any): {
        keys: string[];
        values: any[];
    };
    function splitObjectSorted(obj: any): {
        keys: any[];
        values: any[];
    };
    function getExtname(str: string): string;
    function getFirst(str: string, seperator: any): string;
    function objectToArray(obj: any, seperator?: string): any[];
    function getType(arg: any): string;
    function findStringInArray(arr: string[], str: string): any;
    function findMultipleIndex(arr: any[], val: any): any;
    function setSuccess(result: any): {
        message: string;
        statusCode: any;
        data: any;
    };
    function setSuccess(result: any): {
        message: string;
        statusCode: any;
        data: any;
    };
    function setError(result: any): {
        message: string;
        statusCode: any;
        data: any;
    };
    function setError(result: any): {
        message: string;
        statusCode: any;
        data: any;
    };
    function prepareSuccessOrFailure(result: any): {
        message: string;
        statusCode: any;
        data: any;
    };
    function prepareSuccessOrFailure(result: any): {
        message: string;
        statusCode: any;
        data: any;
    };
}
//# sourceMappingURL=util.d.ts.map