import harpeeModelConfig from"./harpeeModelConfig";
import harpeeConnectConfig from "./harpeeConnectConfig";
import HarpeeHttp from "./harpeeHttp";
import operations from "../constants/operations";
import util from"../helpers/util";

/**
 * @callback responseCallback
 * @param {*} err - an error or null if no error
 * @param {*} result - response data or null if an error occurs
 *
 */

class HarpeeUtilities extends HarpeeHttp {
   constructor() {
      super(harpeeConnectConfig.getConfig());
      /**
       * @private
       */
      this.modelSchemaConfig = harpeeModelConfig.getConfig();
   }
   /**
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */ 

   async describeAll(callback) {
      try {


       let res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DESCRIBE_ALL,

            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.schema
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */ 

   async createSchema(options, callback) {
      try {
         let res;
         const { schema } = options;
         if (!schema) {
            throw new Error("please provide a name for your schema");
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.CREATE_SCHEMA,
               schema,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.schema
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async dropSchema(options, callback) {
      try {
         let res;
         const { schema } =
         options;

         if (!(schema)) {
            throw new Error(
               "please provide the `schema` name"
            );
         }


        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DROP_SCHEMA,
               schema,


            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.schema
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async describeSchema(options, callback) {
      try {
         let res;
         const { schema } = options;


         if (!(schema)) {
            throw new Error(
               "please provide the `schema` name"
            );
         }


        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DESCRIBE_SCHEMA,
               schema,


            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.schema
    * @param {string} options.table
    * @param {string} [options.hashAttribute]
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async createTable(options, callback) {
      try {
         let res;

         const { schema, table } = options;
         const hash_attribute =
            options.hashAttribute || 'id';
         if (!(table || schema)) {
            throw new Error(
               "please provide a name for the `table` and the `schema`"
            );
         }


        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.CREATE_TABLE,
               schema,
               table,
               hash_attribute,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.schema
    * @param {string} options.table
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async describeTable(options, callback) {
      try {
         let res;

         const { schema, table } = options;

         if (!(table || schema)) {
            throw new Error(
               "please provide the `table` and `schema` name"
            );
         }


        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DESCRIBE_TABLE,
               schema,
               table,

            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.schema
    * @param {string} options.table
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */


   async dropTable(options, callback) {
      try {
         let res;
         const { schema, table } = options;

         if (!(table || schema)) {
            throw new Error(
               "please provide the `table` and `schema` name"
            );
         }


        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DROP_TABLE,
               schema,
               table,

            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
     * @param {Object} options
     * @param {Object} options.permission
     * @param {string} options.role
     * @param {responseCallback} [callback]
     * @returns {(Promise<any> | void)}

     */


   async addRole(options, callback) {
      try {
         let res;
         if (!util.isObject(options)) {
            throw new Error("`options` must be an object");
         }
         const { permission, role } = options;

         if (!(role || permission)) {
            throw new Error("`role` and `permission` are required");
         }
         if (!util.isObject(permission)) {
            throw new Error("`permission` must be an object");
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.ADD_ROLE,
               role,
               permission,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {Object} options.permission
    * @param {string} options.id
    * @param {string} options.role
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */


   async alterRole(options, callback) {
      try {
         let res;
         if (!util.isObject(options)) {
            throw new Error("`options` must be an object");
         }

         const { role, permission, id } = options;
         if (!(role || permission || id)) {
            throw new Error("`role` , `permission` and `id` are required");
         }
         if (!util.isObject(permission)) {
            throw new Error("`permission` must be an object");
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.ALTER_ROLE,
               role,
               permission,
               id,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }

   /**
    * @param {Object} options
    * @param {string} options.username
    * @param {string} options.password
    * @param {string} options.role
    * @param {boolean} [options.active]
    * 
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */


   async addUser(options, callback) {
      try {
         let res;
         if (!util.isObject(options)) {
            throw new Error("`options` must be an object");
         }

         const { username, password, role } = options;
         const active = options.active || true;
         if (!(username || password || role)) {
            throw new Error(
               "`username`,`password` , and `role` are required"
            );
         }
         if (!util.isObject(permission)) {
            throw new Error("`permission` must be an object");
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.ADD_USER,
               username,
               password,
               role,
               active,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.username
    * @param {string} options.password
    * @param {string} options.role
    * @param {boolean} [options.active]
    * 
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */


   async alterUser(options, callback) {
      try {
         let res;

         const { username, password, role } = options;
         const active = options.active || true;
         if (!(username || password || role)) {
            throw new Error(
               "`username`,`password` , and `role` are required"
            );
         }


        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.ALTER_USER,
               username,
               password,
               role,
               active,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {Object} options
    * @param {string} options.username
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async dropUser(options, callback) {
      try {
         let res;
         const { username } = options;

         if (!username) {
            throw new Error(
               "`username` is required"
            );
         }


        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DROP_USER,
               username,

            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async listUsers(callback) {

      try {
         let res;
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.LIST_USERS,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
   async listRoles(callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.LIST_ROLES,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }
   /**
    * Creates the tokens needed for authentication: operation & refresh token. **Note, this operation does not require authorization to be set**.
    * @param {Object} options 
    * @param {string} options.username - username of user to generate tokens for.
    * @param {string} options.password - password of user to generate tokens for. 
    * @param {responseCallback} [callback] - an optional callbac `Promise` is returned;
    * @returns {(void| Promise<any>)}

    **/
   async createAuthenticationTokens(options, callback) {
      try {
         let res;
         const username = options.username || this.config.username;
         const password = options.password || this.config.password;
if(!(username || password)){
   throw new Error('`username` and `password` are required')
}
       /** @private */  
        res = await this.$callbackOrPromise(
            {
               operation: operations.CREATE_AUTHENTICATION_TOKENS,
               username,
               password,
            },callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }

   /**
    * This operation creates a new operation token.
    * @param {Object} options
    * @param {string} options.refreshToken -
    * @param {responseCallback} [callback] 
    * @returns {(void | Promise<any>)}

    **/
   async refreshOperationToken(options,callback) {
      try {
         let res;
         const { refreshToken } = options;
      if(!refreshToken){
         throw new Error('`refreshToken` is required')
      }
         this.config.token = refreshToken;
        res = await /** @private */ this.$callbackOrPromise({
            operation: operations.REFRESH_OPERATION_TOKEN,
         }, callback);
      
         if (!util.isUndefined(res)) {

           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }

   /**
    * Exports data based on a given search operation from table to local file in JSON or CSV format.
    * @param {Object} options     
    * @param {Object} options.searchOperation - searchOperation of search_by_hash, search_by_value or sql.
    * @param {string} options.path - an absolute path where the file should be stored.
    * @param {string} options.format - the format you want your data to be exported, 'json' or 'csv'.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async exportLocal(options, callback) {
      try {
         let res;
         const format = util.toLower(options.format);
         const path = options.path;
         const search_operation = options.searchOperation;
         if (!(format || path || search_operation)) {
            throw new Error(
               "`format`,`path` and `searchOperation` are required"
            );
         }
         if (format && (format !== "json" || format !== "csv")) {
            throw new Error("`format` must be json or csv");
         }
         if (!util.isObject(search_operation)) {
            throw new Error("`searchOperation` must be an object");
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.EXPORT_LOCAL,
               format,
               path,
               search_operation,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }

   /**
    * Exports data based on a given search operation from table to AWS S3 in JSON or CSV format.
    * @param {Object} options 
    * @param {Object} options.searchOperation - searchOperation of search_by_hash, search_by_value or sql.
    * @param {string} options.format - the format you want your data to be exported, 'json' or 'csv'.
    * @param {string} options.key - the name to be given to the exported file.
    * @param {string} options.bucket - the name of your S3 bucket.
    * @param {string} options.awsAccessKeyId - your aws_access_key_id.
    * @param {string} options.awsAccessSecretKey - your aws_access_secret_key.
    * @param {responseCallback} [callback] 
    * @returns {(Promise<any> | void)}

    */
   async exportToS3(options, callback) {
      try {
         let res;
         const format = util.toLower(options.format);
         const search_operation = options.searchOperation;
         const { bucket, key } = options;
         const aws_access_key_id = options.awsAccessKeyId;
         const aws_access_secret_key = options.awsAccessSecretKey;

         if (!(format || search_operation)) {
            throw new Error(
               "`format` and `searchOperation` are required"
            );
         }
         if (format && (format !== "json" || format !== "csv")) {
            throw new Error("`format` must be json or csv");
         }
         if (!util.isObject(search_operation)) {
            throw new Error("`searchOperation` must be an object");
         }
         if (
            !(aws_access_key_id ||
               bucket ||
               key ||
               aws_access_secret_key
            )) {
            throw new Error(
               "`awsAccessSecretKey`,`bucket`,`awsAccessKeyId` and `key` are required"
            );
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.EXPORT_TO_S3,
               format,
               s3: {
                  aws_access_key_id,
                  aws_access_secret_key,
                  bucket,
                  key,
               },
               search_operation,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }
   }

   /**
    * @param {Object} options
    * @param {string} options.project -
    * @param {string} options.file -
    * @param {string} options.payload -
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}
    */

   async deployCustomFunctionProject(options, callback) {
      try {
         let res;
         const { project, file, payload } = options;
         if (!(project || file || payload)) {
            throw new Error('`project`, `file` and `payload` are required');
         }
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DEPLOY_CUSTOM_FUNCTION_PROJECT,
               project,
               file,
               payload
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {string} options.project -
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async addCustomFunctionProject(options, callback) {
      try {
         let res;
         const { project } = options;
         if (!project) {
            throw new Error('`project` is required');
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.ADD_CUSTOM_FUNCTION_PROJECT,
               project
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {string} options.project -
    *@param {responseCallback} [callback]    
    * @returns {(Promise<any> | void)}

    */

   async dropCustomFunctionProject(options, callback) {
      try {
         let res;
         const { project } = options;
         if (!project) {
            throw new Error('`project` is required');
         }

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DROP_CUSTOM_FUNCTION_PROJECT,
               project
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {string} options.project -
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async packageCustomFunctionProject(options, callback) {
      try {
         let res;
         const { project } = options;
         if (!project) {
            throw new Error('`project` is required');
         }
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.PACKAGE_CUSTOM_FUNCTION_PROJECT,
               project
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {string} options.project -
    * @param {string} options.file -
    * @param {('helpers'|'routes')} options.type -
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
   async getCustomFunction(options, callback) {
      try {
         let res;
         const { project, file, type } = options;
         if (!(project || file || type)) {
            throw new Error('`project`, `file` and `type` are required');
         }
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.GET_CUSTOM_FUNCTION,

               project,
               file,
               type
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }

   /**
    * @param {Object} options
    * @param {string} options.project -
    * @param {string} options.file -
    * @param {('helpers'|'routes')} options.type -
    * @param {responseCallback} [callback]
   * @returns {(Promise<any> | void)}

    */
   async dropCustomFunction(options, callback) {
      try {
         let res;
         const { project, file, type } = options;
         if (!(project || file || type)) {
            throw new Error('`project`, `file` and `type` are required');
         }
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.DROP_CUSTOM_FUNCTION,

               project,
               file,
               type
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }

   /**
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
   async getCustomFunctions(callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.GET_CUSTOM_FUNCTIONS,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async systemInformation(callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.SYSTEM_INFORMATION,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async clusterStatus(callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.CLUSTER_STATUS,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async getConfiguation(callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.GET_CONFIGUATION,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async restart(callback) {
      try {
         let res;

        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.RESTART,
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {'custom_functions'} options.service;
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async restartService(options,callback) {
      try {
         let res;
const { service}=options
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.RESTART_SERVICE,
               service
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {string} options.name
    * @param {string} options.host
    * @param {number} options.port
    * @param {Array<object>} options.subscriptions
    *@param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async addNode(options, callback) {
      try {
         let res;
         const { name, host, subscriptions, port } = options;
         if (!(name || host || subscriptions || port)) {
            throw new Error('`name`,`host`, `port` and `subscriptions` are required');
         }
         if (!util.isArray(subscriptions)) {
            throw new Error('`subscriptions` must be an array');
         }
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.ADD_NODE,
               name,
               host,
               port,
               subscriptions
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {string} options.name
    * @param {string} options.host
    * @param {number} options.port
    * @param {Array<object>} options.subscriptions
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */
   async updateNode(options, callback) {
      try {
         let res;
         const { name, host, subscriptions, port } = options;
         if (!(name || host || subscriptions || port)) {
            throw new Error('`name`,`host`, `port` and `subscriptions` are required');
         }
         if (!util.isArray(subscriptions)) {
            throw new Error('`subscriptions` must be an array');
         }
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.UPDATE_NODE,
               name,
               host,
               port,
               subscriptions
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
   /**
    * @param {Object} options
    * @param {string} options.name
    * @param {responseCallback} [callback]
    * @returns {(Promise<any> | void)}

    */

   async removeNode(options, callback) {
      try {
         let res;
         const { name } = options;
         if (!name) {
            throw new Error('`name` is required');
         }
        res = await /** @private */ this.$callbackOrPromise(
            {
               operation: operations.REMOVE_NODE,
               name
            },
            callback
         );
         if (!util.isUndefined(res)) {
           return  Promise.resolve(res);
         }
      } catch (err) {
        return  Promise.reject(err);
      }

   }
}

export default HarpeeUtilities;