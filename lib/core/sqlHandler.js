const util = require("../helpers/util");

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
      this.query += columns ? ` SELECT ${distinct ? ' DISTINCT ' :''}${columns.join(",")}` : "";
      return this;
   }
   /**
    * @param {string} column
    * */
   selectCount(column) {
      this.query += column ? ` SELECT COUNT(${column})` : '';
      return this;
   }
   /**
    * @@param {string} column
    */

   selectAvg(column) {
      this.query += column ? ` SELECT AVG(${column})` : '';
      return this;
   }
   /**
    * @param {string} column
    */
   selectSum(column) {
      this.query += column ? ` SELECT SUM(${column})` : '';
      return this;
   }
   /**
    * @param {string} schema 
    * @param {string} table 
    */
   from(schema, table) {
      this.query += table ? ` FROM ${schema}.[${table}]` : "";
      return this;
   }
   /**
    * @param {number} limit - specifying the max records.
    * 
    * */
   limit(limit) {
      this.query += limit ? ` LIMIT ${limit}` : "";
      return this;
   }

   /**
    *
    * @param {number} offset - the number of rows to skip.
    */
   offset(offset) {
      this.query += offset ? ` OFFSET ${offset}` : "";
      return this;
   }
   /**
    * @param {number} offset - the number of rows to skip.
    */
   offsetRows(offset) {
      this.query += offset ? ` OFFSET ${offset} ROWS` : '';
      return this
   }
   /**
    * @param {number} rows - the number of rows to fetch.
    */
   fetchNextRows(rows) {
      this.query += rows ? ` FETCH NEXT ${rows} ROWS ONLY` : '';
      return this;
   }
   /**
    * @param {string[]} columns
    * */
   orderBy(columns) {
      this.query += columns ? ` ORDER BY  ${columns.join(',')}` : "";
      return this;
   }
   /**
    * @param {('DESC'|'ASC')} order 
    * */
   order(order) {
      this.query += order ? ` ${order}` : "";
      return this;
   }

   delete() {
      this.query += " DELETE";
      return this;
   }
      /**
    * @param {string} schema 
    * @param {string} table 
    */

   update(schema,table) {
      this.query += schema && table ? ` UPDATE ${schema}.[${table}]` : '';
      return this;
   }
      /**
   * @param {Object} options
   * @param {string} options.schema
   * @param {string} options.table
   * @param {Object[]} options.records - an array of objects 
   */

   insertInto(options){
      const {schema,table,records}=options;
      if(Array.isArray(records)){
         
   const {keys,values}=records.reduce((accum,item)=>{
      if(util.isObject(item)){
         
 for(let prop in item){
      accum.keys.push(prop)
      accum.values.push(item[prop])
   }
   }
   return accum
  
},{keys:[],values:[]})
   
this.query+=` INSERT INTO ${schema}.[${table}] (${keys.join(',')}) VALUES("${values.join('","')}")`
      }
else{
   this.query+='';
}
   
      
      return this;
   }
   /**
   * @param {Object[]} records - an array of objects 
   */
   set(records){
      if(Array.isArray(records)){
   const keysAndValues=records.reduce((accum,item)=>{
      if(util.isObject(item)){
         
 for(let prop in item){
      accum.push(`\`${prop}\`="${item[prop]}"`)
   }
   }
   return accum
  
},[])
this.query+=` SET ${keysAndValues.join(',')}`
      }
      else{
         this.query+='';
      }
      
      return this;
   }
   /**
    * @param {string} condition 
    * */
   where(condition) {
      this.query += condition ? ` WHERE ${condition}` : "";
      return this;
   }
   /**
    * @param {string} condition 
    * */
   whereNot(condition) {
      this.query += condition ? ` WHERE NOT ${condition}` : "";
      return this;
   }
   /**
    * @param {(string | number)} val 
    * */
   equalTo(val) {
      this.query += val ? ` ='${val}'` : "";
      return this;
   }
   /**
    * @param {string} table 
    * @param {string} column
    *
    * */
   isEqual(table, column) {
         this.query += table && column ? `=${table}.[${column}]` : "";
         return this;
      }
      /**
       * @param {(number[]|string[])} values 
       *
       */
      in (values) {
         this.query += values ? ` IN ("${values.join('","')}")` : "";
         return this;
      }
      /**
       * @param {string} pattern
       *
       */
      like(pattern) {
         this.query += values ? ` LIKE '${pattern}'` : "";
         return this;
      }

   /**
    * @param {string} table
    * @param {string} column 
    */
   on(table, column) {
      this.query += table && column ? ` ON ${table}.\`${column}\`` : "";
      return this;
   }

   isNotNull() {
      this.query += ` IS NOT NULL`
      return this;
   }
   isNull() {
      this.query += ` IS NULL`
      return this;
   }
   /**
    * @param {number} value 
    */
   greaterThan(value) {
      this.query += value ? ` > ${value}` : "";
      return this;
   }
   /**
    * @param {number} value 
    */
   lessThan(value) {
      this.query += value ? ` < ${value}` : "";
      return this;
   }
   /**
    * @param {(string|number)} val
    * */
   between(val) {
      this.query += val ? ` BETWEEN ${val}` : "";
      return this;
   }
   /**
    * @param {(string|number)} condition
    */
   and(condition) {
      this.query += condition ? ` AND ${condition}` : "";
      return this;
   }
   /**
    * @param {(string|number)} condition
    */
   or(condition) {
      this.query += condition ? ` OR  ${condition}` : "";
      return this;
   }
   /**
    * @param {string} schema - the schema name
    * @param {string} table - the table name
    */
   crossJoin(schema, table) {
      this.query += schema && table ? ` CROSS JOIN ${schema}.[${table}]` : "";
      return this;
   }
   /**
    * @param {string} schema - the schema name
    * @param {string} table - the table name
    */
   fullOuterJoin(schema, table) {
      this.query += schema && table ? ` FULL OUTER JOIN ${schema}.[${table}]` : "";
      return this;
   }
   /**
    * @param {string} schema - the schema name
    * @param {string} table - the table name
    */
   innerJoin(schema, table) {
      this.query += schema && table ? ` INNER JOIN ${schema}.[${table}]` : "";
      return this;
   }
   /**
    * @param {string} schema - the schema name
    * @param {string} table - the table name
    */
   leftOuterJoin(schema, table) {
      this.query += schema && table ? ` LEFT OUTER JOIN ${schema}.[${table}]` : "";
      return this;
   }
   /**
    * @param {string} schema - the schema name
    * @param {string} table - the table name
    */
   rightOuterJoin(schema, table) {
      this.query += schema && table ? ` RIGHT OUTER JOIN ${schema}.[${table}]` : "";
      return this;
   }
}

module.exports= SqlHandler;