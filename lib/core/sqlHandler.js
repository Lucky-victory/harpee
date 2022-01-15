class SqlHandler {
    constructor() {
        /**
         * @protected
         */
        this.query = ``;
    }
    /**
     * @param {Array<string>} columns - an array of column names.
     * @param {boolean} [distinct=false] - whether to include 'DISTINCT' keyword, default is `false`.
     */ 
    select(columns, distinct = false) {
        this.query += columns ? ` SELECT ${distinct ? ' DISTINCT ' :''} ${columns.join(",")} ` : "";
        return this;
    }
    /**
     * @param {string} schema - the schema name
     * @param {string} table - the table name
     */ 
    from(schema, table) {
        this.query += table ? ` FROM ${schema}.${table} ` : "";
        return this;
    }
    /**
     * @param {number} limitCount - specifying the max records.
     * 
     * */
    limit(limitCount) {
        this.query += limitCount ? " LIMIT " + limitCount : "";
        return this;
    }
    offset(hasLimitAndOffset = false, offset) {
        this.query += hasLimitAndOffset ? " OFFSET " + offset : "";
        return this;
    }
    orderBy(column) {
        this.query += column ? " ORDER BY " + column : "";
        return this;
    }
    order(hasOrderbyAndOrder = false, order) {
        this.query += hasOrderbyAndOrder ? ` ${order} ` : "";
        return this;
    }
    delete() {
        this.query += " DELETE ";
        return this;
    }
    where(condition) {
        this.query += condition ? ` WHERE ${condition} ` : "";
        return this;
    }
    equalTo(val) {
        this.query += val ? `='${val}' ` : "";
        return this;
    }
    isEqual(table,column) {
        this.query += table && column ? `=${table}.${column} ` : "";
        return this;
    } 
    in (arr) {
        this.query += arr ? ` IN ("${arr.join('","')}") ` : "";
        return this;
    }
    on(table, column) {
        this.query += table && column ? ` ON ${table}.${column} ` : "";
        return this;
    }
    isNotNull() {
        this.query += arr ? ` IS NOT NULL ` : "";
        return this;
    }
    isNull() {
        this.query += arr ? ` IS NULL ` : "";
        return this;
    }
    between(val) {
        this.query += val ? " BETWEEN " + val : "";
        return this;
    }
    and(val) {
        this.query += val ? " AND " + val : "";
        return this;
    }
    or(val) {
        this.query += val ? " OR " + val : "";
        return this;
    }
    crossJoin(schema,table) {
     this.query += schema && table ? ` CROSS JOIN ${schema}.${table} ` : "";
     return this;
    }
    fullOuterJoin(schema, table){
          this.query += schema && table ? ` FULL OUTER JOIN ${schema}.${table} ` : "";
          return this;   
    }

    innerJoin(schema,table) {
     this.query += schema && table ? ` INNER JOIN ${schema}.${table} ` : "";
     return this;
    }
    leftOuterJoin(schema, table){
          return this;   
    }
    rightOuterJoin(schema, table){
          this.query += schema && table ? ` RIGHT OUTER JOIN ${schema}.${table} ` : "";
          return this;   
    }
}

module.exports = SqlHandler;