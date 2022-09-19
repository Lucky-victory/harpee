import { HarpeeLogger } from "./harpee-logger";
import { HarpeeConnectInfoCallback, IHarpeeConfig } from "../interfaces/harpee.interface";
import { HarpeeModel } from "./harpee-model";
import { HarpeeSchema } from "./harpee-schema";
import { HarpeeUtilities } from "./harpee-utilities";
import { SqlHandler } from "./sql-handler";
export declare class Harpee {
    private static _config;
    protected get config(): IHarpeeConfig;
    /**
     *creates a connection to your harperDB instance
     * @param config
     * @param connectionInfo
     */
    static createConnection(config: IHarpeeConfig, connectionInfo?: HarpeeConnectInfoCallback): void;
    /**
     * Alias for  `createConnection`.
     *
     *
     **/
    static connect(config: IHarpeeConfig, connectionInfo?: HarpeeConnectInfoCallback): void;
    static Model: typeof HarpeeModel;
    static Schema: typeof HarpeeSchema;
    static Logger: typeof HarpeeLogger;
    static Utilities: typeof HarpeeUtilities;
    static Sqler: typeof SqlHandler;
}
