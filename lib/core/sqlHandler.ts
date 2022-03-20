import util from "../helpers/util"

class SqlHandler implements SqlhandlerT{
     private query:string=``;
   constructor() {
   
   }
   /**
    * @param {Array<string>} columns - an array of column names.
    * @param {boolean} [distinct=false] - whether to include 'DISTINCT' keyword, default is `false`.
    */
   select(columns:string[], distinct?:boolean = false) {
      this.query += columns ? ` SELECT ${distinct ? ' DISTINCT ' :''}${columns.join(",")}` : "";
      return this;
   }
   
   selectCount(column:string) {
      this.query += column ? ` SELECT COUNT(${column})` : '';
      return this;
   }
   
   selectAvg(column:string) {
      this.query += column ? ` SELECT AVG(${column})` : '';
      return this;
   }

   selectSum(column:string) {
      this.query += column ? ` SELECT SUM(${column})` : '';
      return this;
   }

   from(schema:string, table:string) {
      this.query += table ? ` FROM ${schema}.[${table}]` : "";
      return this;
   }
   
   limit(limit:number){
      this.query += limit ? ` LIMIT ${limit}` : "";
      return this;
   
   }

   offset(offset:number):SqlHandler {
      this.query += offset ? ` OFFSET ${offset}` : "";
      return this;
   
   }
   /**
    * @param {number} offset - the number of rows to skip.
    */
   offsetRows(offset:number):SqlHandler {
      this.query += offset ? ` OFFSET ${offset} ROWS` : '';
      return this
   }
   /**
    * @param {number} rows - the number of rows to fetch.
    */
   fetchNextRows(rows:number):SqlHandler {
      this.query += rows ? ` FETCH NEXT ${rows} ROWS ONLY` : '';
      return this;
   }

   orderBy(columns:string[]):SqlHandler {
      this.query += columns ? ` ORDER BY  ${columns.join(',')}` : "";
      return this;
   }
   
   order(order:"DESC"|"ASC") {
      this.query += order ? ` ${order}` : "";
      return this;
   
   }

   delete():SqlHandler {
      this.query += " DELETE";
      return this;
   }
   
   update(schema:string,table:string):SqlHandler {
      this.query += schema && table ? ` UPDATE ${schema}.[${table}]` : '';
      return this;
   }
      
   insertInto(options:{schema:string,table:string,records:object[]}):SqlHandler{
      const {schema,table,records}=options;
      
      if(Array.isArray(records)){
         
   const {keys,values}=records.reduce((accum:{keys:string[],values:string[]},item:object)=>{
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
   
   set(records:object[]):SqlHandler{
      if(Array.isArray(records)){
   const keysAndValues:string[]=records.reduce((accum:string[],item:object)=>{
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
   
   where(condition:string):SqlHandler {
      this.query += condition ? ` WHERE ${condition}` : "";
      return this;
   }
   
   whereNot(condition:string):SqlHandler {
      this.query += condition ? ` WHERE NOT ${condition}` : "";
      return this;
   }
   
   equalTo(val:string|number):SqlhandlerT {
      this.query += val ? ` ='${val}'` : "";
      return this;
   }

   isEqual(table:string, column:string):SqlHandler {
         this.query += table && column ? `=${table}.[${column}]` : "";
         return this;
      }
   
      in (values:number[]|string[]):SqlHandler {
         this.query += values ? ` IN ("${values.join('","')}")` : "";
         return this;
      }
      
      like(pattern:string):SqlHandler {
         this.query += values ? ` LIKE '${pattern}'` : "";
         return this;
      }

   
   on(table:string, column:string) :SqlHandler{
      this.query += table && column ? ` ON ${table}.\`${column}\`` : "";
      return this;
   }

   isNotNull():SqlHandler {
      this.query += ` IS NOT NULL`
      return this;
   }
   isNull():SqlHandler {
      this.query += ` IS NULL`
      return this;
   }
   
   greaterThan(value:number):SqlHandler {
      this.query += value ? ` > ${value}` : "";
      return this;
   }

   lessThan(value:number):SqlHandler {
      this.query += value ? ` < ${value}` : "";
      return this;
   }
   
   between(val:string|number):SqlHandler {
      this.query += val ? ` BETWEEN ${val}` : "";
      return this;
   }
   
   and(condition:string|number):SqlHandler {
      this.query += condition ? ` AND ${condition}` : "";
      return this;
   }
   
   or(condition:string|number):SqlHandler {
      this.query += condition ? ` OR  ${condition}` : "";
      return this;
   }
   crossJoin(schema:string, table:string):SqlHandler {
      this.query += schema && table ? ` CROSS JOIN ${schema}.[${table}]` : "";
      return this;
   }

   fullOuterJoin(schema:string, table:string):SqlHandler {
      this.query += schema && table ? ` FULL OUTER JOIN ${schema}.[${table}]` : "";
      return this;
   }
   
   innerJoin(schema:string, table:string):SqlHandler {
      this.query += schema && table ? ` INNER JOIN ${schema}.[${table}]` : "";
   
      return this;
   }
   
   leftOuterJoin(schema:string, table:string):SqlHandler {
      this.query += schema && table ? ` LEFT OUTER JOIN ${schema}.[${table}]` : "";
      return this;
   }
   
   rightOuterJoin(schema:string, table:string):SqlHandler {
      this.query += schema && table ? ` RIGHT OUTER JOIN ${schema}.[${table}]` : "";
   
      return this;
   }
}

export interface SqlhandlerT{
   query:string;
   select:(columns:string[], distinct?:boolean = false)=>SqlHandler;
   
   selectCount:(column:string)=>SqlHandler;
   
   selectAvg:(column:string)=>SqlHandler

   selectSum:(column:string)=>SqlHandler;

   from:(schema:string, table:string)=>SqlHandler;
   
   limit:(limit:number)=>SqlHandler;

   offset:(offset:number)=>SqlHandler;
   offsetRows:(offset:number)=>SqlHandler;
   fetchNextRows:(rows:number)=>SqlHandler;

   orderBy:(columns:string[])=>SqlHandler;
   
   order:(order:"DESC"|"ASC")=>SqlHandler;

   delete:()=>SqlHandler;
   
   update:(schema:string,table:string)=>SqlHandler;
      
   insertInto:(options:{schema:string,table:string,records:object[]})=>SqlHandler;
   
   set:(records:object[])=>SqlHandler;
   
   where:(condition:string)=>SqlHandler;
   
   whereNot:(condition:string)=>SqlHandler;
   
   equalTo:(val:string|number)=>SqlHandler;

   isEqual:(table:string, column:string)=>SqlHandler;
   
      in:(values:number[]|string[])=>SqlHandler;
      
      like:(pattern:string)=>SqlHandler;

   
   on:(table:string, column:string) =>SqlHandler;

   isNotNull:()=>SqlHandler;
   isNull:()=>SqlHandler;
   
   
   greaterThan:(value:number)=>SqlHandler;

   lessThan:(value:number)=>SqlHandler;
   
   between:(val:string|number)=>SqlHandler;
   and:(condition:string|number)=>SqlHandler;
   
   
   or:(condition:string|number)=>SqlHandler;
   crossJoin:(schema:string, table:string)=>SqlHandler;

   fullOuterJoin:(schema:string, table:string)=>SqlHandler;
   
   innerJoin:(schema:string, table:string)=>SqlHandler;
   leftOuterJoin:(schema:string, table:string)=>SqlHandler;
   rightOuterJoin:(schema:string, table:string)=>SqlHandler;

}

export default SqlHandler;