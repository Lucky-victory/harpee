import axios from "axios";
import Utils from "../helpers/utils";
import { IHarpeeConfig, IHarpeeHttpCallback } from "../interfaces/harpee";

export default class HarpeeHttp {
    private config: IHarpeeConfig;
    constructor(config: IHarpeeConfig) {
        this.config = config;
    }

    private $requestHandler<T>(reqBody: any, callback: IHarpeeHttpCallback<T>) {
        let auth: string = "";
        const { username, password, user, pass, token, host } = this.config;
        const _username = username || user;
        const _password = password || pass;
        if (token) {
            auth = "Bearer " + token;
        } else if (username && password) {
            auth =
                "Basic " +
                Buffer.from(_username + ":" + _password, "utf-8").toString(
                    "base64"
                );
        }
        const errorObj: {
            data?: any;
            status?: number;
            message?: string;
            config?: any;
            error?: any;
        } = {};
        axios({
            url: host,
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: auth,
            },
            data: JSON.stringify(reqBody),
        })
            .then((res) => {
                callback(null, res.data);
            })
            .catch((error) => {
                if (error.response) {
                    errorObj["data"] = error.response.data;
                    errorObj["status"] = error.response.status;
                } else if (error.request) {
                    errorObj["error"] = error.request;
                } else {
                    errorObj["error"] = error.message;
                }
                errorObj["config"] = error.config;

                callback(errorObj, null);
            });
    }

    protected $callbackOrPromise<T extends object>(
        reqBody: any,
        callback?: IHarpeeHttpCallback<T>,
        single: boolean = false
    ): Promise<T | T[] | null> | undefined {
        if (Utils.isUndefined(callback)) {
            return new Promise((resolve, reject) => {
                this.$requestHandler<T>(reqBody, (err, result) => {
                    if (err) return reject(err);
                    try {
                        if (single) return resolve((result as T[])[0]);

                        return resolve(result);
                    } catch {
                        return reject(err);
                    }
                });
            });
        }
        if(callback && Utils.isFunction(callback)){

            this.$requestHandler<T>(reqBody, (err, result) => {
                if (err) {
                return callback(err, null);
            }
            try {
                return single
                ? callback(null, (result as T[])[0])
                : callback(null, result);
            } catch {
                return callback(err, null);
            }
        });
    }
    }
}
