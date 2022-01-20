const Axios = require("axios");
const Util = require("../../helpers/utils");
/**
 *
 * @param {Object} reqData
 * @param {function} callback
 * @protected
 */
function requestHandler(config, reqData, callback) {
   let auth;
   const username = config.username;
   const password = config.password;
   const token = config.token;
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
   Axios({
      url: config.host,
      method: "post",
      headers: {
         "Content-Type": "application/json",
         Authorization: auth,
      },
      data: JSON.stringify(reqData),
   }).then((res) => {
      callback(null, Util.prepareSuccessOrFailure(res));
   }).catch((err) => {
      let errType = err.request ? err.request : err.response ? err.response : err;

      callback(errType, null);
   });
}

/**
 *
 * @param {Object} config
 * @param {Object} reqData
 * @param {function} [callback]
 * 
 * @returns {(any|Promise)}
 * @protected
 */

function callbackOrPromise(config, reqData, callback){
   if (!Util.isFunction(callback)) {
      return new Promise((resolve, reject) => {
         requestHandler(config, reqData, (err, result) => {
            if (err) return reject(err);
            try {

               return resolve(result);
            } catch (err) {
               return reject(err);
            }
         });
      });
   }
   requestHandler(config, reqData, (err, result) => {
      if (err) {
         callback(err, null);
      } else {
         try {
            callback(null, result);

         } catch (err) {
            callback(err, null);
         }
      }
   });
}


module.exports = callbackOrPromise;

// handle error, response.status