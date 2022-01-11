class SqlHandler {
    constructor() {
        this.query = ``;
    }
    select(arr) {
        this.query += arr ? " SELECT " + arr.join(",") : "";
        return this;
    }
    from(schema, table) {
        this.query += table ? ` FROM ${schema}.${table} ` : "";
        return this;
    }
    limit(limit) {
        this.query += limit ? " LIMIT " + limit : "";
        return this;
    }
    offset(hasLimitAndOffset, offset) {
        this.query += hasLimitAndOffset ? " OFFSET " + offset : "";
        return this;
    }
    orderBy(attr) {
        this.query += attr ? " ORDER BY " + attr : "";
        return this;
    }
    order(hasOrderbyAndOrder, order) {
        this.query += hasOrderbyAndOrder ? ` ${order} ` : "";
        return this;
    }
    delete() {
        this.query += arr ? " DELETE " : "";
        return this;
    }
    where(attr) {
        this.query += attr ? ` WHERE ${attr} ` : "";
        return this;
    }
    isEqualTo(val) {
        this.query += val ? `='${val}'` : "";
        return this;
    }
    in(arr) {
        this.query += arr ? ` IN ("${arr.join('","')}") ` : "";
        return this;
    }
    contains(arr) {
        this.query += arr ? ` CONTAINS ("${arr.join('","')}") ` : "";
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
}

module.exports = SqlHandler;
