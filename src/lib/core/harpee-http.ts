import axios from 'axios';
import Utils from '../helpers/utils';
import {
  HarpeeResponseCallback,
  IHarpeeAuthConfig,
  IHarpeeHttpError,
  IHarpeeResponse,
  IHarpeeSchemaConfig,
} from '../interfaces/harpee.interface';
import { HarpeeConfig } from './harpee-config';

export class HarpeeHttp {
  protected config: IHarpeeAuthConfig;
  protected schemaConfig: IHarpeeSchemaConfig;
  protected static _config: IHarpeeAuthConfig;
  static _schemaConfig: IHarpeeSchemaConfig;
  constructor() {
    this.config = HarpeeHttp._config;
    this.schemaConfig = HarpeeHttp._schemaConfig;
  }
  protected static set _setConfig(config: IHarpeeAuthConfig) {
    HarpeeHttp._config = config;
  }
  protected static set _setSchemaConfig(schemaConfig: IHarpeeSchemaConfig) {
    HarpeeHttp._schemaConfig = schemaConfig;
  }
  private $requestHandler(
    reqBody: any,
    callback: (err: unknown | null, data: any | null) => void
  ) {
    let auth: string = '';
    const { username, password, token, host } =
      this.config || HarpeeHttp._config || {};
    const _username = username;
    const _password = password;
    if (token) {
      auth = 'Bearer ' + token;
    } else if (username && password) {
      auth =
        'Basic ' +
        Buffer.from(_username + ':' + _password, 'utf-8').toString('base64');
    }

    const errorObj: IHarpeeHttpError = {
      message: 'an error occurred',
      data: undefined,
    };

    axios({
      url: host,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      data: JSON.stringify(reqBody),
    })
      .then((res) => {
        callback(null, res.data);
      })
      .catch((error) => {
        if (error?.response) {
          errorObj.data = error?.response?.data;
          errorObj.status = error?.response?.status;
        } else if (error?.request) {
          errorObj.data = error?.request;
        }
        errorObj.message = error?.message;
        callback(errorObj, null);
      });
  }

  protected $callbackOrPromise<T>(
    reqBody: any,
    callback?: HarpeeResponseCallback<T>,
    single: boolean = false
  ): Promise<IHarpeeResponse<T>> | undefined {
    if (Utils.isUndefined(callback)) {
      return new Promise((resolve, reject) => {
        this.$requestHandler(reqBody, (err, result) => {
          if (err)
            return reject({
              success: false,
              data: null,
              error: err,
            });

          if (single)
            return resolve({
              success: true,
              data: (result as T[])[0],
              error: null,
            });

          return resolve({
            success: true,
            data: result as T,
            error: null,
          });
        });
      });
    }
    callback &&
      this.$requestHandler(reqBody, (err, result) => {
        if (err) {
          return callback(
            {
              success: false,
              data: null,
              error: err,
            },
            null
          );
        }

        return single
          ? callback(null, {
              success: true,
              data: (result as T[])[0],
              error: null,
            })
          : callback(null, {
              success: true,
              data: result as T,
              error: null,
            });
      });
  }
}
