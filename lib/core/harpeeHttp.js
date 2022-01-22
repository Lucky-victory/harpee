import fetch from "node-fetch";
import  util from "../helpers/utils";

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
      fetch(this.config.host, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
               Authorization: auth,
            },
            body: JSON.stringify(reqBody),
         }).then((res) => {
            if (!res.ok) {
               errorObj['statusCode'] = res.status;
               errorObj['message'] = res.statusText;
               throw errorObj
            }
            return (res.json())

         }).then((data) => {
            callback(null, data);

         })
         .catch((err) => {
            errorObj['error'] = err;
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
                  if (single) {
                     return resolve(result[0])
                  }
                  return resolve(result);
               } catch (err) {
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
               if (single) {

                  callback(null, result[0]);
                  return;
               }
               callback(null, result);

            } catch (err) {
               callback(err, null);
            }
         }
      });
   }
}

export default  HarpeeHttp;

