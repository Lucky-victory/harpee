export default class Utils {
    /** Checks if the value is an Object.
     * @param { * } val- the value to be checked
     * */
    static isObject(val: unknown): boolean;
    /** Checks if the value is an Array.
     * @param { * } val - the value to be checked
     * */
    static isArray(val: unknown): boolean;
    /** Checks if the value is a String.
     * @param { * } val - the value to be checked
     * */
    static isString(val: unknown): boolean;
    /** Checks if the value is a Number.
     * @param { * } val - the value to be checked
     * */
    static isNumber(val: unknown): boolean;
    /** Checks if the value is a Boolean.
     * @param { * } val - the value to be checked
     * */
    static isBoolean(val: unknown): boolean;
    /** Checks if the value is a Function.
     * @param { * } val - the value to be checked
     * */
    static isFunction(val: unknown): boolean;
    /** Checks if the value is a Undefined.
     * @param { * } val - the value to be checked
     * */
    static notNullOrUndefined(val: unknown): boolean;
    static isUndefined(val: unknown): boolean;
    /** Checks if the value is Null.
     * @param { * } val - the value to be checked
     * */
    static isNull(val: unknown): boolean;
    /** Checks if the value is a Date.
     * @param { * } val - the value to be checked
     * */
    static isDate(val: unknown): boolean;
    /** Evaluates two strings and checks if they have same or similar values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    static stringHas(STR: string, str: string): boolean;
    /** Evaluates two strings and checks if they have the same  values.
     * @param { string } STR - the string to be evaluated.
     * @param { string } str - the string to find .
     *
     * */
    static _sameStrStrict(STR: string, str: string): boolean;
    /**
     * Checks if a value is empty.
     */
    static isEmpty(val: CheckValue): boolean;
    /** Transforms the String to lowercase
     *
     */
    static toLower(str: string): string;
    /** Transforms the String to uppercase
     *
     */
    static toUpper(str: string): string;
    /** Splits an object to an object of `keys` array and `values` array.
     * @param obj - the object to be splitted.
     * */
    static splitObject<T extends object>(obj: T): {
        keys: string[];
        values: string[];
    };
    /** Splits an object to an object of `keys` sorted array and `values` sorted array .
     * @param { object} obj - the object to be splitted.
     * */
    static splitObjectSorted<T extends object>(obj: T): {
        keys: string[];
        values: string[];
    };
    /**
     *
     *
     * @param  keys - when true, returns object keys otherwise object values
     */
    static ObjectArrayToStringArray<T extends object>(arrayOfObj: T[], keys?: boolean): string[];
    /** Splits a string by a seperator and returns the last string
     * @param {string} str - the string to be splitted.
     *
     */
    static getExtname(str: string): string | undefined;
    /** Splits a string by a seperator and returns the first string
     * @param {string} str - the string to be splitted.
     *
     */
    static getFirst(str: string, seperator?: string): string | undefined;
    /** Converts an object into an array seperated by a seperator
     * @param {object} obj - the object to be converted
     * @param {string} seperator - a string to seperate the key and values
     * @return {array} - returns an array of strings;
     *
     *
     */
    static objectToArray<T extends object>(obj: T, seperator?: string): string[];
    /** Returns the type of a value as a string.
     * @param { * } arg - the value to find the type.
     *
     * */
    static getType(arg: unknown): string;
    /**Checks if an array includes a certain  string and returns true or false.
     * @param {string[]} arr - an array of string.
     * @param { string } str - the string to find in the array.
     */
    static findStringInArray(arr: string[], str: string): boolean;
    /** returns indexes of same value in an array.
     * @param { array } arr - the array to perform the operation on.
     * @param { * } val - the value to find in the array.
     * */
    static findMultipleIndex<T extends Array<string | number>>(arr: T, val: string | number): number[];
    static typeOf(obj: unknown): string;
    static safeGet<T extends object>(item: T | T[] | any[], target: string | string[], defaultValue?: {}): any;
    static safeSet<T = object>(item: T, target: string | string[], value: any): boolean;
    static pick<T = object>(obj: T, select: (keyof T)[] | string[]): Pick<T, keyof T>;
    static omit<T extends object>(obj: T, remove: (keyof T)[]): Omit<T, keyof T>;
}
export declare type CheckValue = string | object | Date | undefined | null | number | boolean;
