const harpeeModelConfig = require("./harpeeConfig");
const harpeeConnect = require("./harpeeConnect");
const HarpeeHttp = require("./harpeeHttp");
const operations = require("../../constants/operations");
const Util = require("../../helpers/utils");

class HarpeeUtilities extends HarpeeHttp {
    constructor() {
        super(harpeeConnect.getConfig());
        /**
         * @private
         */
        this.modelSchemaConfig = harpeeModelConfig.getConfig();
    }
    async createSchema(schema, callback) {
       try{
        let res;

        if (!schema || Util.isEmptyStr(schema)) {
            throw new Error("please provide a name for your schema");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.CREATE_SCHEMA,
                    schema,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    async createTable(options, callback) {
       try{
        let res;
        const schema =
            options.schema ;
        const table = options.table;
        const hash_attribute =
            options.hashAttribute || 'id';
        if (!table || !schema) {
            throw new Error(
                "please provide a name for the table and the schema"
            );
        }
        if (!table && schema) {
            throw new Error("please provide a name for the table");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.CREATE_TABLE,
                    schema,
                    table,
                    hash_attribute,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    async addRole(options, callback) {
       try{
        let res;
        if (!Util.isObject(options)) {
            throw new Error("`options` must be an object");
        }
        const role = options.role;
        const permission = options.permission;
        if (!role || !permission) {
            throw new Error("`role` and `permission` are required");
        }
        if (!Util.isObject(permission)) {
            throw new Error("`permission` must be an object");
        }
      
            res = await this.$callbackOrPromise(
                {
                    operation: operations.ADD_ROLE,
                    role,
                    permission,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    async alterRole(options, callback) {
       try{
        let res;
        if (!Util.isObject(options)) {
            throw new Error("`options` must be an object");
        }
        const role = options.role;
        const permission = options.permission;
        const id = options.id;
        if (!role || !permission || !id) {
            throw new Error("`role` , `permission` and `id` are required");
        }
        if (!Util.isObject(permission)) {
            throw new Error("`permission` must be an object");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.ALTER_ROLE,
                    role,
                    permission,
                    id,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    async addUser(options, callback) {
       try{
        let res;
        if (!Util.isObject(options)) {
            throw new Error("`options` must be an object");
        }
        const username = options.username;
        const password = options.password;
        const role = options.role;
        const active = options.active || true;
        if (!username || !password || !permission) {
            throw new Error(
                "`username`,`password` , and `persmission` are required"
            );
        }
        if (!Util.isObject(permission)) {
            throw new Error("`permission` must be an object");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.ADD_USER,
                    username,
                    password,
                    role,
                    active,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    async alterUser(options, callback) {
        try{
        let res;
        const username = options.username;
        const password = options.password;
        const permission = options.permission;
        const active = options.active || true;
        if (!username || !password || !permission) {
            throw new Error(
                "`username`,`password` , and `persmission` are required"
            );
        }
        if (!Util.isObject(permission)) {
            throw new Error("`permission` must be an object");
        }
       
            res = await this.$callbackOrPromise(
                {
                    operation: operations.ALTER_USER,
                    username,
                    password,
                    permission,
                    active,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    async listUsers(callback) {

        try {
        let res;
            res = await this.$callbackOrPromise(
                {
                    operation: operations.LIST_USERS,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    async listRoles(callback) {
        try {
        let res;

            res = await this.$callbackOrPromise(
                {
                    operation: operations.LIST_ROLES,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    /**
     * Creates the tokens needed for authentication: operation & refresh token. **Note, this operation does not require authorization to be set**.
     * @param {Object} options 
     * @param {string} options.username - username of user to generate tokens for.
     * @param {string} options.password - password of user to generate tokens for. 
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned;

     **/ 
    async createAuthenticationTokens(options, callback) {
       try{
        let res;
        const username = options.username || this.config.username;
        const password = options.password || this.config.password;
        
        // get the initial config here,
        // so we can use it elsewhere
        const initialConfig=this.config;
            res = await this.$callbackOrPromise(
                {
                   operation: operations.CREATE_AUTHENTICATION_TOKENS,
                    username,
                    password,
                },
                (err,result)=>{
                   const token=result && result.data.operation_token;
                   const refreshToken= result && result.data.refresh_token;
                   // reset the config and add refreshToken
        harpeeConnect.setConfig({...initialConfig,token,refreshToken})
                   
                   // return a new callback for the user.
                   return callback(err,result);
                }
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }

/**
 * This operation creates a new operation token.
 * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned.
 * 
 **/ 
    async refreshOperationToken(callback) {
        try {
        let res;
        this.config=harpeeConnect.getConfig();
        const refreshToken=this.config.refreshToken;
        this.config['token']=refreshToken;
        // get the initial config here,
        // so we can use elsewhere.
const initialConfig=this.config;
            res = await this.$callbackOrPromise({
                operation: operations.REFRESH_OPERATION_TOKEN,
            },(err,result)=>{
               const newToken = result && result.data.operation_token;
               // set a new token
               harpeeConnect.setConfig({ ...initialConfig, 'token':newToken});
               
               // return a new callback for the user.
               return callback(err,result);
            });
            // reset the config
            this.config=harpeeConnect.getConfig();
            if (!Util.isUndefined(res)) {
               
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    
    /**
     * Exports data based on a given search operation from table to local file in JSON or CSV format.
     * @param {Object} options     
     * @param {Object} options.searchOperation - searchOperation of search_by_hash, search_by_value or sql.
     * @param {string} options.path - an absolute path where the file should be stored.
     * @param {string} options.format - the format you want your data to be exported, 'json' or 'csv'.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned;
     * 
     */ 
    async exportLocal(options, callback) {
        try{
        let res;
        const format = Util.toLower(options.format);
        const path = options.path;
        const search_operation = options.searchOperation;
        if (!(format || path || search_operation)) {
            throw new Error(
                "`format`,`path` and `searchOperation` are required"
            );
        } else if (format && (format !== "json" || format !== "csv")) {
            throw new Error("`format` must be json or csv");
        }
        if (!Util.isObject(search_operation)) {
            throw new Error("`searchOperation` must be an object");
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.EXPORT_LOCAL,
                    format,
                    path,
                    search_operation,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
    
    /**
     * Exports data based on a given search operation from table to AWS S3 in JSON or CSV format.
     * @param {Object} options 
     * @param {Object} options.searchOperation - searchOperation of search_by_hash, search_by_value or sql.
     * @param {string} options.format - the format you want your data to be exported, 'json' or 'csv'.
     * @param {string} options.filename - the name to be given to the exported file.
     * @param {string} options.s3Bucket - the name of your S3 bucket.
     * @param {string} options.s3Key - your aws_access_key_id.
     * @param {string} options.s3Secret - your aws_access_secret_key.
     * @param {responseCallback} [callback] - an optional callback, if not provided, `Promise` is returned;

     */ 
    async exportToS3(options, callback) {
      try{
        let res;
        const format = Util.toLower(options.format);
        const search_operation = options.searchOperation;
        const bucket = options.s3Bucket;
        const aws_access_key_id = options.s3Key;
        const aws_access_secret_key = options.s3Secret;
        const filename = options.filename;
        if (!(format || search_operation)) {
            throw new Error(
                "`format` and `searchOperation` are required"
            );
        } else if (format && (format !== "json" || format !== "csv")) {
            throw new Error("`format` must be json or csv");
        }
        if (!Util.isObject(search_operation)) {
            throw new Error("`searchOperation` must be an object");
        }
        if (
            !(aws_access_key_id ||
            bucket ||
            filename ||
            aws_access_secret_key
       ) ) {
            throw new Error(
                "`s3Key`,`s3Bucket`,`s3Secret` and `filename` are required"
            );
        }
        
            res = await this.$callbackOrPromise(
                {
                    operation: operations.EXPORT_TO_S3,
                    format,
                    s3: {
                        aws_access_key_id,
                        aws_access_secret_key,
                        bucket,
                        key: filename,
                    },
                    search_operation,
                },
                callback
            );
            if (!Util.isUndefined(res)) {
                Promise.resolve(res);
            }
        } catch (err) {
            Promise.reject(err);
        }
    }
}

module.exports = HarpeeUtilities;
