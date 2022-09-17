import HarpeeLogger from "./harpee-logger";
import Utils from "../helpers/utils";
import {
    HarpeeConnectInfoCallback,
    IHarpeeConfig,
    IHarpeeSchemaConfig,
} from "../interfaces/harpee.interface";
import HarpeeModel from "./harpee-model";
import HarpeeSchema from "./harpee-schema";
import HarpeeUtilities from "./harpee-utilities";

export class Harpee {
    private static _config: IHarpeeConfig;
    private static _schemaConfig: IHarpeeSchemaConfig;
    protected get config() {
        return Harpee._config;
    }

    protected get schemaConfig() {
        return Harpee._schemaConfig;
    }
    protected set schemaConfig(schemaConfig: IHarpeeSchemaConfig) {
        Harpee._schemaConfig = schemaConfig;
    }
    static createConnection(
        config: IHarpeeConfig,
        connectionInfo?: HarpeeConnectInfoCallback
    ) {
        try {
            if (!Utils.isObject(config)) {
                throw new TypeError("connection `config` must be an Object");
            }
            if (!config.host) {
                throw new Error("`host` is required");
            }
            const host = config.host;
            const username = config.username || config.user;
            const password = config.password || config.pass;
            const token = config.token;
            if ((username && !password) || (password && !username)) {
                throw new Error(
                    "you must include both `username` and `password`"
                );
            }
            if (username && password && token) {
                throw new Error(
                    "you should include `username` and `password` or only `token`"
                );
            }
            const connectionConfig = { host, username, password, token };
            this._config = connectionConfig;

            if (connectionInfo && Utils.isFunction(connectionInfo)) {
                connectionInfo(config, null);
            }
        } catch (error) {
            if (connectionInfo && Utils.isFunction(connectionInfo)) {
                connectionInfo(config, error);
            }
        }
    }
    /**
     * Alias for  `createConnection`.
     *
     *
     **/
    static connect(
        config: IHarpeeConfig,
        connectionInfo?: HarpeeConnectInfoCallback
    ) {
        return Harpee.createConnection(config, connectionInfo);
    }
    static Model = HarpeeModel;
    static Schema = HarpeeSchema;
    static Logger = HarpeeLogger;
    static Utilities = HarpeeUtilities;
}
