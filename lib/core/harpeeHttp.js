const Axios = require("node-fetch");
const Util = require("../../helpers/utils");
const Buffer=require('buffer/').Buffer;

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
        Axios(this.config.host,{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth,
            },
            body: JSON.stringify(reqData),
        }).then((res) => res.json()).then((data)=>{
                callback(null,data);
               
            })
            .catch((err) => {

                callback(err, null);
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
                this.$requestHandler(reqData, (err, result) => {
                    if (err) return reject(err);
                    try {
                        
                        return resolve(result);
                    } catch (err) {
                        return reject(err);
                    }
                });
            });
        }
        this.$requestHandler(reqData, (err, result) => {
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
}

module.exports = HarpeeHttp;

// handle error, response.status
