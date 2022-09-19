import isEmpty from "just-is-empty";

import omit from "just-omit";
import pick from "just-pick";
import safeGet from "just-safe-get";
import safeSet from "just-safe-set";
import typeOf from "just-typeof";

export default class Utils {
    /** Checks if the value is an Object.
     * @param { * } val- the value to be checked
     * */

    static isObject(val: unknown) {
        return typeOf(val) === "object";
    }
    /** Checks if the value is an Array.
     * @param { * } val - the value to be checked
     * */

    static isArray(val: unknown) {
        return typeOf(val) === "array";
    }
    /** Checks if the value is a String.
     * @param { * } val - the value to be checked
     * */

    static isString(val: unknown) {
        return typeOf(val) === "string";
    }
    /** Checks if the value is a Number.
     * @param { * } val - the value to be checked
     * */

    static isNumber(val: unknown) {
        return typeOf(val) === "number";
    }
    /** Checks if the value is a Boolean.
     * @param { * } val - the value to be checked
     * */

    static isBoolean(val: unknown) {
        return typeOf(val) === "boolean";
    }
    /** Checks if the value is a Function.
     * @param { * } val - the value to be checked
     * */

    static isFunction(val: unknown) {
        return typeOf(val) === "function";
    }
    /** Checks if the value is a Undefined.
     * @param { * } val - the value to be checked
     * */
    static notNullOrUndefined(val: unknown) {
        return !Utils.isNull(val) && !Utils.isUndefined(val);
    }
    static isUndefined(val: unknown) {
        return typeOf(val) === "undefined";
    }
    /** Checks if the value is Null.
     * @param { * } val - the value to be checked
     * */

    static isNull(val: unknown): boolean {
        return typeOf(val) === "null";
    }
    /** Checks if the value is a Date.
     * @param { * } val - the value to be checked
     * */
    static isDate(val: unknown): boolean {
        return typeOf(val) === "date";
    }
    /** Evaluates two strings and checks if they have same or similar values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    static stringHas(STR: string, str: string): boolean {
        return STR.toLowerCase().includes(str.toLowerCase());
    }
    /** Evaluates two strings and checks if they have the same  values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    static _sameStrStrict(STR: string, str: string): boolean {
        return STR.toLowerCase().trim() === str.toLowerCase().trim();
    }
    /**
     * Checks if a value is empty.
     */
    static isEmpty(val: CheckValue) {
        return isEmpty(val);
    }

    /** Transforms the String to lowercase
     *
     */
    static toLower(str: string) {
        return String(str).toLowerCase();
    }
    /** Transforms the String to uppercase
     *
     */
    static toUpper(str: string) {
        return String(str).toUpperCase();
    }
    /** Splits an object to an object of `keys` array and `values` array.
     * @param obj - the object to be splitted.
     * */
    static splitObject<T extends object>(obj: T) {
        const keys: string[] = [];
        const values: string[] = [];
        Object.keys(obj).forEach((key) => {
            keys.push(key);
            values.push(obj[key as keyof T] as unknown as string);
        });
        return { keys, values };
    }
    /** Splits an object to an object of `keys` sorted array and `values` sorted array .
     * @param { object} obj - the object to be splitted.
     * */
    static splitObjectSorted<T extends object>(obj: T) {
        const keys: string[] = [];
        const values: string[] = [];
        Object.keys(obj)
            .sort()
            .forEach((key) => {
                keys.push(key);
                values.push(obj[key as keyof T] as unknown as string);
            });
        return { keys, values };
    }
    /**
     *
     *
     * @param  keys - when true, returns object keys otherwise object values
     */
    static ObjectArrayToStringArray<T extends object>(
        arrayOfObj: T[],
        keys = false
    ): string[] {
        if (!Array.isArray(arrayOfObj)) {
            return arrayOfObj;
        }
        return arrayOfObj.reduce((accum, item) => {
            for (let key in item) {
                keys
                    ? accum.push(key)
                    : accum.push(item[key] as unknown as string);
            }
            return accum;
        }, [] as string[]);
    }

    /** Splits a string by a seperator and returns the last string
     * @param {string} str - the string to be splitted.
     *
     */
    static getExtname(str: string) {
        return str.split(".").pop();
    }
    /** Splits a string by a seperator and returns the first string
     * @param {string} str - the string to be splitted.
     *
     */
    static getFirst(str: string, seperator: string = ",") {
        return str.split(seperator).shift();
    }
    /** Converts an object into an array seperated by a seperator
     * @param {object} obj - the object to be converted
     * @param {string} seperator - a string to seperate the key and values
     * @return {array} - returns an array of strings;
     *
     *
     */
    static objectToArray<T extends object>(obj: T, seperator = ",") {
        const arr = [];
        for (let key in obj) {
            arr.push(`${key}${seperator}'${obj[key]}'`);
        }
        return arr;
    }
    /** Returns the type of a value as a string.
     * @param { * } arg - the value to find the type.
     *
     * */
    static getType(arg: unknown) {
        const type = typeOf(arg);

        return type;
    }

    /**Checks if an array includes a certain  string and returns true or false.
     * @param {string[]} arr - an array of string.
     * @param { string } str - the string to find in the array.
     */
    static findStringInArray(arr: string[], str: string): boolean {
        return arr.includes(str);
    }
    /** returns indexes of same value in an array.
     * @param { array } arr - the array to perform the operation on.
     * @param { * } val - the value to find in the array.
     * */
    static findMultipleIndex<T extends Array<string | number>>(
        arr: T,
        val: string | number
    ): number[] {
        return arr.reduce((accum, value, index) => {
            if (val === value) {
                accum.push(index);
            }
            return accum;
        }, [] as number[]);
    }
    static typeOf(obj: unknown) {
        return typeOf(obj);
    }
    static safeGet<T extends object>(
        item: T | T[] | any[],
        target: string | string[],
        defaultValue?: {}
    ) {
        return safeGet(item, target, defaultValue);
    }
    static safeSet<T = object>(item: T, target: string | string[], value: any) {
        return safeSet(item as unknown as object, target, value);
    }

    static pick<T extends object>(obj: T, select: (keyof T)[]) {
        return pick(obj, select);
    }
    static omit<T extends object>(
        obj: T,
        remove: (keyof T)[]
    ): Omit<T, keyof T> {
        return omit(obj, remove);
    }
}

export type CheckValue =
    | string
    | object
    | Date
    | undefined
    | null
    | number
    | boolean;
