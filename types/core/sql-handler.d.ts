import { InsertOpts, Order, StringOrNumber } from "../interfaces/harpee.interface";
export declare class SqlHandler {
    private _query;
    constructor();
    /**
     * @param columns - an array of column names.
     * @param distinct - whether to include 'DISTINCT' keyword, default is `false`.
     */
    select(columns: string[], distinct?: boolean): this;
    selectCount(column: string): this;
    selectAvg(column: string): this;
    selectSum(column: string): this;
    from(schema: string, table: string): this;
    as(newName: string): this;
    /**
     * @param limit - specifying the max records.
     *
     * */
    limit(limit: number): this;
    /**
     *
     * @param offset - the number of rows to skip.
     */
    offset(offset: number): this;
    /**
     * @param offset - the number of rows to skip.
     */
    offsetRows(offset: number): this;
    /**
     * @param  rowCount - the number of rows to fetch.
     */
    fetchNextRows(rowCount: number): this;
    orderBy(columns: string[]): this;
    order(order: Order): this;
    delete(): this;
    update(schema: string, table: string): this;
    insertInto<T = object>(options: InsertOpts<T>): this;
    set<T = object>(records: T[]): this;
    where(condition: string): this;
    whereNot(condition: string): this;
    equalTo(val: StringOrNumber): this;
    isEqual(table: string, column: string): this;
    in(values: StringOrNumber[]): this;
    like(pattern: string): this;
    on(table: string, column: string): this;
    isNotNull(): this;
    isNull(): this;
    greaterThan(value: number): this;
    /**
     * same as `greaterThan`
     **/
    gt(value: number): this;
    lessThan(value: number): this;
    /**
     * same as `lessThan`
     *
     */
    lt(value: number): this;
    between(val: StringOrNumber): this;
    and(condition: StringOrNumber): this;
    or(condition: StringOrNumber): this;
    crossJoin(schema: string, table: string): this;
    fullOuterJoin(schema: string, table: string): this;
    innerJoin(schema: string, table: string): this;
    leftOuterJoin(schema: string, table: string): this;
    rightOuterJoin(schema: string, table: string): this;
    get query(): string;
}
