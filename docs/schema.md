# Class Schema

   /**
    * Inserts new record to the table,
    * 
    * @param {Object} newRecord - an object of the new record to be created.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
 

/**
   /**
    * Inserts new record to the table,
    * 
    * @param {Object} newRecord - an object of the new record to be created.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
 
    * Inserts new record to the table,
    * 
    * @param {Object} newRecord - an object of the new record to be created.
    * @param {responseCallback} [callback] - optional `callback` function, if not provided `Promise` is returned.
  {Object} HarpeeSchemaObject
 * @property {string} [name=defaultSchema]
 * @property {string} [primaryKey=id]
 * @property {Object} fields
 * @property {boolean} [silent=false]
 *  */

/** 
 * Let's you Specify your schema, also allows you to configure your table's column names and types.
 *
 * @param {Object} schemaConfig - an object that takes in `name`, `fields`,
 ` and `silent`.
 * @param {string } [schemaConfig.name="defaultShema"] - the name of your schema, default is 'defaultSchema'.
 * @param {string } [schemaConfig.primaryKey="id"] - a primary key for your tables an alias for hash_attribute, default is 'id'.
 * @param {boolean } [schemaConfig.silent=false] - turns on/off error throwing if `options.fields` value types doesn't match `Model.create` value types .
 * @param {Object} schemaConfig.fields - an object to specify the table columns.
 * @returns {HarpeeSchemaObject} - an object to be passed as a second argument to {@link Model}
 * @example 
 * const harpee=require('harpee');
 * const myUsersSchema=harpee.Schema({
    name:'myUsersSchema',
    primaryKey:'user_id',
    silent:false,
    fields:{
       age:{type:Number},
       user_id:{type:String},
       name:{type:String},
       city:{type:String},
       joined:{type:Date},
    }
 });
 // Now you can use the returned value in your `Model` instance.
 const myUsers= new harpee.Model('users',myUsersSchema);