const Fetch = require("node-fetch");
const Util = require("../../helpers/utils");
const Buffer = require('buffer/').Buffer;

class HarpeeHttp {
   constructor(config = {}) {
      /**
       * @private
       */
      this.config = config;
   }
   /**
    *
    * @param {Object} reqData
    * @param {function} callback
    * @protected
    */
   $requestHandler(reqData, callback) {
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
      Fetch(this.config.host, {
            method: "post",
            headers: {
               "Content-Type": "application/json",
               Authorization: auth,
            },
            body: JSON.stringify(reqData),
         }).then((res) => {
            if (!res.ok) {
               errorObj['status'] = res.status;
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
    * @param {Object} reqData
    * @param {function} [callback]
    * @param {boolean} [single=false]
    * @returns {(any|Promise)}
    * @protected
    */

   $callbackOrPromise(reqData, callback, single = false) {
      if (Util.isUndefined(callback)) {
         return new Promise((resolve, reject) => {
            this.$requestHandler(reqData, (err, data) => {
               if (err) return reject(err);
               try {
                  if (single) {
                     return resolve(data[0])
                  }
                  return resolve(data);
               } catch (err) {
                  return reject(err);
               }
            });
         });
      }
      this.$requestHandler(reqData, (err, data) => {
         if (err) {
            callback(err, null);
         } else {
            try {
               if (single) {

                  callback(null, data[0]);
                  return;
               }
               callback(null, data);

            } catch (err) {
               callback(err, null);
            }
         }
      });
   }
}

module.exports = HarpeeHttp;

// handle error, response.status