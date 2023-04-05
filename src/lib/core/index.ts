import { HarpeeLogger } from './harpee-logger';
import Utils from '../helpers/utils';
import {
  HarpeeConnectInfoCallback,
  IHarpeeAuthConfig,
} from '../interfaces/harpee.interface';
import { HarpeeModel } from './harpee-model';
import { HarpeeSchema } from './harpee-schema';
import { HarpeeUtilities } from './harpee-utilities';
import { SqlHandler } from './sql-handler';
import { HarpeeHttp } from './harpee-http';

export class Harpee extends HarpeeHttp {
  /**
   *creates a connection to your harperDB instance
   * @param config
   * @param connectionCb
   */
  static createConnection(
    config: IHarpeeAuthConfig,
    connectionCb?: HarpeeConnectInfoCallback
  ) {
    if (!config || !Utils.isObject(config)) {
      throw new TypeError('connection `config` must be an Object');
    }
    if (!config.host) {
      throw new Error('`host` is required');
    }
    const host = config.host;
    const username = config.username || config.user;
    const password = config.password || config.pass;
    const token = config.token;
    if (!(username && password)) {
      throw new Error('you must include both `username` and `password`');
    }
    if (username && password && token) {
      throw new Error(
        'you should include `username` and `password` or only `token`'
      );
    }
    const connectionConfig = { host, username, password, token };

    HarpeeHttp._setConfig = connectionConfig;
    if (!connectionCb) {
      return { ...config };
    }
    return connectionCb && connectionCb(config, null);
  }
  /**
   * Alias for  `createConnection`.
   *
   *
   **/
  static connect(
    config: IHarpeeAuthConfig,
    connectionInfo?: HarpeeConnectInfoCallback
  ) {
    return Harpee.createConnection(config, connectionInfo);
  }
  static Model = HarpeeModel;
  static Schema = HarpeeSchema;
  static Logger = HarpeeLogger;
  static Utilities = HarpeeUtilities;
  static Sqler = SqlHandler;
}
