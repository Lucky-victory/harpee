import Utils from "../helpers/utils";
import {
    InsertOpts,
    Order,
    StringOrNumber,
} from "../interfaces/harpee.interface";

export class SqlHandler {
    private _query: string = "";
    constructor() {
        this._query = ``;
    }
    /**
     * @param columns - an array of column names.
     * @param distinct - whether to include 'DISTINCT' keyword, default is `false`.
     */
    select(columns: string[], distinct: boolean = false) {
        this._query += Utils.isArray(columns)
            ? ` SELECT ${distinct ? " DISTINCT " : ""}${columns.join(",")}`
            : "";
        return this;
    }

    selectCount(column: string) {
        this._query += column ? ` SELECT COUNT(\`${column}\`)` : "";
        return this;
    }

    selectAvg(column: string) {
        this._query += column ? ` SELECT AVG(\`${column}\`)` : "";
        return this;
    }

    selectSum(column: string) {
        this._query += column ? ` SELECT SUM(\`${column}\`)` : "";
        return this;
    }

    from(schema: string, table: string) {
        this._query += table ? ` FROM ${schema}.\`${table}\`` : "";
        return this;
    }
    as(newName: string) {
        this._query += newName ? ` AS \`${newName}\`` : "";
        return this;
    }
    /**
     * @param limit - specifying the max records.
     *
     * */
    limit(limit: number) {
        this._query += Utils.notNullOrUndefined(limit) ? ` LIMIT ${limit}` : "";
        return this;
    }

    /**
     *
     * @param offset - the number of rows to skip.
     */
    offset(offset: number) {
        this._query += Utils.notNullOrUndefined(offset)
            ? ` OFFSET ${offset}`
            : "";
        return this;
    }
    /**
     * @param offset - the number of rows to skip.
     */
    offsetRows(offset: number) {
        this._query += Utils.notNullOrUndefined(offset)
            ? ` OFFSET ${offset} ROWS`
            : "";
        return this;
    }
    /**
     * @param  rowCount - the number of rows to fetch.
     */
    fetchNextRows(rowCount: number) {
        this._query += Utils.notNullOrUndefined(rowCount)
            ? ` FETCH NEXT ${rowCount} ROWS ONLY `
            : "";
        return this;
    }

    orderBy(columns: string[]) {
        this._query += !Utils.isEmpty(columns)
            ? ` ORDER BY  ${columns.join(",")}`
            : "";
        return this;
    }

    order(order: Order) {
        this._query += !Utils.isEmpty(order) ? ` ${Utils.toUpper(order)}` : "";
        return this;
    }

    delete() {
        this._query += " DELETE ";
        return this;
    }

    update(schema: string, table: string) {
        this._query += schema && table ? ` UPDATE ${schema}.\`${table}\`` : "";
        return this;
    }

    insertInto<T = object>(options: InsertOpts<T>) {
        const { schema, table, records } = options;
        if (Utils.isArray(records)) {
            const { keys, values } = records.reduce(
                (accum, item) => {
                    if (Utils.isObject(item)) {
                        for (const prop in item) {
                            accum.keys.push(prop);
                            accum.values.push(item[prop]);
                        }
                    }
                    return accum;
                },
                {
                    keys: [] as string[],
                    values: [] as T[Extract<keyof T, string>][],
                }
            );

            this._query += ` INSERT INTO ${schema}.\`${table}\` (${keys.join(
                ","
            )}) VALUES("${values.join('","')}")`;
        } else {
            this._query += "";
        }

        return this;
    }

    set<T = object>(records: T[]) {
        if (Array.isArray(records)) {
            const keysAndValues = records.reduce((accum, item) => {
                if (Utils.isObject(item)) {
                    for (const prop in item) {
                        accum.push(`\`${prop}\`="${item[prop]}"`);
                    }
                }
                return accum;
            }, [] as string[]);
            this._query += ` SET ${keysAndValues.join(",")}`;
        } else {
            this._query += "";
        }

        return this;
    }

    where(condition: string) {
        this._query += !Utils.isEmpty(condition) ? ` WHERE ${condition}` : "";

        return this;
    }

    whereNot(condition: string) {
        this._query += condition ? ` WHERE NOT ${condition}` : "";
        return this;
    }

    equalTo(val: StringOrNumber) {
        this._query += Utils.notNullOrUndefined(val) ? ` ='${val}'` : "";
        console.log(this._query);
        return this;
    }

    isEqual(table: string, column: string) {
        this._query += table && column ? `=${table}.\`${column}\`` : "";
        return this;
    }

    in(values: StringOrNumber[]) {
        this._query += Utils.isArray(values)
            ? ` IN ("${values.join('","')}")`
            : "";
        return this;
    }

    like(pattern: string) {
        this._query += pattern ? ` LIKE '${pattern}'` : "";
        return this;
    }

    on(table: string, column: string) {
        this._query += table && column ? ` ON ${table}.\`${column}\`` : "";
        return this;
    }

    isNotNull() {
        this._query += ` IS NOT NULL`;
        return this;
    }
    isNull() {
        this._query += ` IS NULL`;
        return this;
    }

    greaterThan(value: number) {
        this._query += Utils.notNullOrUndefined(value) ? ` > ${value}` : "";
        return this;
    }
    /**
     * same as `greaterThan`
     **/
    gt(value: number) {
        return this.greaterThan(value);
    }

    lessThan(value: number) {
        this._query += Utils.notNullOrUndefined(value) ? ` < ${value}` : "";
        return this;
    }
    /**
     * same as `lessThan`
     *
     */
    lt(value: number) {
        return this.lessThan(value);
    }

    between(val: StringOrNumber) {
        this._query += Utils.notNullOrUndefined(val) ? ` BETWEEN ${val}` : "";
        return this;
    }

    and(condition: StringOrNumber) {
        this._query += Utils.notNullOrUndefined(condition)
            ? ` AND ${condition}`
            : "";
        return this;
    }

    or(condition: StringOrNumber) {
        this._query += Utils.notNullOrUndefined(condition)
            ? ` OR  ${condition}`
            : "";
        return this;
    }

    crossJoin(schema: string, table: string) {
        this._query +=
            schema && table ? ` CROSS JOIN ${schema}.\`${table}\`` : "";
        return this;
    }

    fullOuterJoin(schema: string, table: string) {
        this._query +=
            schema && table ? ` FULL OUTER JOIN ${schema}.\`${table}\`` : "";
        return this;
    }

    innerJoin(schema: string, table: string) {
        this._query +=
            schema && table ? ` INNER JOIN ${schema}.\`${table}\`` : "";
        return this;
    }

    leftOuterJoin(schema: string, table: string) {
        this._query +=
            schema && table ? ` LEFT OUTER JOIN ${schema}.\`${table}\`` : "";
        return this;
    }

    rightOuterJoin(schema: string, table: string) {
        this._query +=
            schema && table ? ` RIGHT OUTER JOIN ${schema}.\`${table}\`` : "";
        return this;
    }
    get query() {
        return this._query;
    }
}
