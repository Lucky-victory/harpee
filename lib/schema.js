const Util = require("../helpers/utils");
const operations= require("../constants/operations");
const HarpeeHttp=require('./core/harpeeHttp');
const harpeeConnect=require('./core/harpeeConnect');


/**
 * @typedef {Object} HarpeeSchemaObject
 * @property {string} [name=defaultSchema]
 * @property {string} [primaryKey=id]
 * @property {Object} fields
 * @property {boolean} [silent=false]
 *  */

/** 
 * Creates a schema .
 *
 * @param {Object} schemaConfig - an object that takes in `name`, `fields`,`primaryKey` and `silent`.
 * @param {string } [schemaConfig.name="defaultShema"] - the name of your schema.
 * @param {string } [schemaConfig.primaryKey="id"] - a primary key for your tables an alias for hash_attribute.
 * @param {boolean } [schemaConfig.silent=false] - turns on/off error throwing if `options.fields` values doesn't match `Model.create` values .
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
 * */
function Schema(schemaConfig) {
    if (!Util.isObject(schemaConfig)) {
        throw new TypeError("`schemaConfig` must be an object");
    }
    if (!(schemaConfig.fields || Util.isObject(schemaConfig.fields))) {
        throw new Error(
            " schemaConfig `fields` is required and must be an object"
        );
    }
    const schemaName = schemaConfig.name ? schemaConfig.name : "defaultSchema";
    const primaryKey = schemaConfig.primaryKey ? schemaConfig.primaryKey : "id";
    const silent = schemaConfig.silent ? schemaConfig.silent : false;
    
    
    return {
        name: schemaName,
        fields: schemaConfig.fields,
        primaryKey,
        silent,
    };
}

module.exports = Schema;
