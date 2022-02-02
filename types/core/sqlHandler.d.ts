export default SqlHandler;
declare class SqlHandler {
    /**
     * @protected
     */
    protected query: string;
    /**
     * @param {Array<string>} columns - an array of column names.
     * @param {boolean} [distinct=false] - whether to include 'DISTINCT' keyword, default is `false`.
     */
    select(columns: Array<string>, distinct?: boolean): SqlHandler;
    /**
     * @param {string} column
     * */
    selectCount(column: string): SqlHandler;
    /**
     * @@param {string} column
     */
    selectAvg(column: string): SqlHandler;
    /**
     * @param {string} column
     */
    selectSum(column: string): SqlHandler;
    /**
     * @param {string} schema
     * @param {string} table
     */
    from(schema: string, table: string): SqlHandler;
    /**
     * @param {number} limit - specifying the max records.
     *
     * */
    limit(limit: number): SqlHandler;
    /**
     *
     * @param {number} offset - the number of rows to skip.
     */
    offset(offset: number): SqlHandler;
    /**
     * @param {number} offset - the number of rows to skip.
     */
    offsetRows(offset: number): SqlHandler;
    /**
     * @param {number} rows - the number of rows to fetch.
     */
    fetchNextRows(rows: number): SqlHandler;
    /**
     * @param {string[]} columns
     * */
    orderBy(columns: string[]): SqlHandler;
    /**
     * @param {('DESC'|'ASC')} order
     * */
    order(order: ('DESC' | 'ASC')): SqlHandler;
    delete(): SqlHandler;
    /**
     * @param {string} condition
     * */
    where(condition: string): SqlHandler;
    /**
     * @param {string} condition
     * */
    whereNot(condition: string): SqlHandler;
    /**
     * @param {(string | number)} val
     * */
    equalTo(val: (string | number)): SqlHandler;
    /**
     * @param {string} table
     * @param {string} column
     *
     * */
    isEqual(table: string, column: string): SqlHandler;
    /**
     * @param {(number[]|string[])} values
     *
     */
    in(values: (number[] | string[])): SqlHandler;
    /**
     * @param {string} pattern
     *
     */
    like(pattern: string): SqlHandler;
    /**
     * @param {string} table
     * @param {string} column
     */
    on(table: string, column: string): SqlHandler;
    isNotNull(): SqlHandler;
    isNull(): SqlHandler;
    /**
     * @param {number} value
     */
    greaterThan(value: number): SqlHandler;
    /**
     * @param {number} value
     */
    lessThan(value: number): SqlHandler;
    /**
     * @param {(string|number)} val
     * */
    between(val: (string | number)): SqlHandler;
    /**
     * @param {(string|number)} condition
     */
    and(condition: (string | number)): SqlHandler;
    /**
     * @param {(string|number)} condition
     */
    or(condition: (string | number)): SqlHandler;
    /**
     * @param {string} schema - the schema name
     * @param {string} table - the table name
     */
    crossJoin(schema: string, table: string): SqlHandler;
    /**
     * @param {string} schema - the schema name
     * @param {string} table - the table name
     */
    fullOuterJoin(schema: string, table: string): SqlHandler;
    /**
     * @param {string} schema - the schema name
     * @param {string} table - the table name
     */
    innerJoin(schema: string, table: string): SqlHandler;
    /**
     * @param {string} schema - the schema name
     * @param {string} table - the table name
     */
    leftOuterJoin(schema: string, table: string): SqlHandler;
    /**
     * @param {string} schema - the schema name
     * @param {string} table - the table name
     */
    rightOuterJoin(schema: string, table: string): SqlHandler;
}
//# sourceMappingURL=sqlHandler.d.ts.map