const Fetch = require("node-fetch");
const Util = require("../../helpers/utils");
const Buffer=require('buffer/').Buffer;

// this harpeeHttpAlt is an alternative to harpeeHttp, i used it in places where `this` keyword was conflicting.
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
         console.log(auth)
   }
   Fetch( config.host,{
      method: "post",
      headers: {
         "Content-Type": "application/json",
         Authorization: auth,
      },
      body: JSON.stringify(reqData),
   }).then((res) => res.json()).then((data)=>{
      callback(null,data);
      
   }).catch((err) => {

      callback(err, null);
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
   if (Util.isUndefined(callback)) {
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

