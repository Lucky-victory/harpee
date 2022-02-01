import fetch from "node-fetch";
import util from "../helpers/util";

//  harpeeHttpAlt is an alternative to harpeeHttp, it was used in places where `this` keyword was conflicting.
/**
 *
 * @param {Object} reqBody
 * @param {function} callback
 * @protected
 */
function requestHandler(config, reqBody, callback) {
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
   fetch( config.host,{
      method: "post",
      headers: {
         "Content-Type": "application/json",
         Authorization: auth,
      },
      body: JSON.stringify(reqBody),
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
   if (util.isUndefined(callback)) {
      return new Promise((resolve, reject) => {
         requestHandler(config, reqData, (err, result) => {
            if (err) return reject(err);
            try {

               return resolve(result);
            } catch{
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

         } catch{
            callback(err, null);
         }
      }
   });
}


export default callbackOrPromise;

