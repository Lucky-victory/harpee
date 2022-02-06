const axios = require('axios').default;
const  util =require("../helpers/util");

class HarpeeHttp {
   constructor(config = {}) {
      /**
       * @private
       */
      this.config = config;
   }
   /**
    *
    * @param {Object} reqBody
    * @param {function} callback
    * @protected
    */
   $requestHandler(reqBody, callback) {
      let auth;
      const username = this.config.username;
      const password = this.config.password;
      const token = this.config.token;
      if (token) {
         auth = "Bearer " + token;
      }
      else if (username && password) {
         auth =
            "Basic " +
            Buffer.from(username + ":" + password, "utf-8").toString(
               "base64"
            );
      }
      const errorObj = {};
      axios({url:this.config.host, 
            method: "post",
            headers: {
               "Content-Type": "application/json",
               Authorization: auth,
            },
            data: JSON.stringify(reqBody),
         }).then((res) => {
            callback(null, res.data);
            
         })
         .catch((error) => {
            if (error.response) {
          errorObj['data']=error.response.data;     
          errorObj['status']=error.response.status;     
            } else if (error.request) {
   
         errorObj['error']=error.request
            } else {
       errorObj['error']=error.message;
            }
       errorObj['config']=error.config;
            
            callback(errorObj, null);
         });
   }

   /**
    *
    * @param {Object} reqBody
    * @param {function} [callback]
    * @param {boolean} [single=false]
    * @returns {(void|Promise<any>)}
    * @protected
    */

   $callbackOrPromise(reqBody, callback, single = false) {
      if (util.isUndefined(callback)) {
         return new Promise((resolve, reject) => {
            this.$requestHandler(reqBody, (err, result) => {
            if (err) return reject(err);
               try {
               if(single)return resolve(result[0]);
                  else{
                     
                  return resolve(result);
                  } 
               } catch {
                  return reject(err);
               }
            });
         });
      }
      this.$requestHandler(reqBody, (err, result) => {
         if (err) {
            callback(err, null);
         } else {
            try {
               single ?
 callback(null, result[0])
                  : callback(null, result);

            } catch {
               callback(err, null);
            }
         }
      });
   }
}

module.exports= HarpeeHttp;

