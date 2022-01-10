const Axios = require("axios").default;
const Util = require("../../helpers/utils");
class HarpeeHttp {
    constructor(config = {}) {
        this.config = config;
    }
    $requestHandler(reqData, callback) {
        let auth;
        const username = this.config.username;
        const password = this.config.password;
        const token = this.config.token;
        if (username && password) {
            if (!Util.isUndefined(window) && Util.isFunction(window.btoa)) {
                auth = "Basic " + window.btoa(username + ":" + password);
            } else {
                auth =
                    "Basic " +
                    Buffer.from(username + ":" + password, "utf-8").toString(
                        "base64"
                    );
            }
        } else if (token) {
            auth = "Bearer " + token;
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
                callback(null, res.data);
            })
            .catch((err) => {
                callback(err, null);
            });
    }
    $callbackOrPromise(reqData, callback, singleData = false) {
        if (Util.isUndefined(callback)) {
            return new Promise((resolve, reject) => {
                this.$requestHandler(reqData, (err, data) => {
                    if (err) return reject(err);
                    try {
                        if (single) {
                            return resolve(data[0]);
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
                    } else {
                        callback(null, data);
                    }
                } catch (err) {
                    callback(err, null);
                }
            }
        });
    }
}

module.exports = HarpeeHttp;
