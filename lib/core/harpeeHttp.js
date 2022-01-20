const Axios = require("axios");
const Util = require("../../helpers/utils");
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
        Axios({
            url: this.config.host,
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth,
            },
            data: JSON.stringify(reqData),
        })
            .then((res) => {
                callback(null, Util.prepareSuccessOrFailure(res));
            })
            .catch((err) => {
               let errType= err.request ? err.request : err.response ? err.response : err;
               
                callback(errType, null);
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
                        if (single) {
                            return resolve({...result,data:result.data[0]});
                        }
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
                    if (single) {
                        callback(null, {...result,data:result.data[0]});
                    } else {
                        callback(null, result);
                    }
                } catch (err) {
                    callback(err, null);
                }
            }
        });
    }
}

module.exports = HarpeeHttp;

// handle error, response.status
