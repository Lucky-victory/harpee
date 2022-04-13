export function isObject(obj: any): boolean;
export function isArray(arr: any): boolean;
export function isString(str: any): boolean;
export function isNumber(num: any): boolean;
export function isBoolean(bool: any): boolean;
export function isFunction(val: any): boolean;
export function isUndefined(val: any): boolean;
export function isNull(val: any): boolean;
export function isDate(date: any): boolean;
export function itHas(STR: string, str: string): any;
export function _sameStrStrict(STR: string, str: string): boolean;
export function isEmpty(arg: any): boolean;
export function isEmptyStr(arg: string): boolean;
export function toLower(str: string): string;
export function toUpper(str: string): string;
export function splitObject(obj: any): {
    keys: string[];
    values: any[];
};
export function splitObjectSorted(obj: any): {
    keys: any[];
    values: any[];
};
export function getExtname(str: string): string;
export function getFirst(str: string, seperator: any): string;
export function objectToArray(obj: any, seperator?: string): any[];
export function getType(arg: any): string;
export function findStringInArray(arr: string[], str: string): any;
export function findMultipleIndex(arr: any[], val: any): any;
