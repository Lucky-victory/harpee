import { HarpeeLogger } from './harpee-logger';
import { HarpeeConnectInfoCallback, IHarpeeAuthConfig } from '../interfaces/harpee.interface';
import { HarpeeModel } from './harpee-model';
import { HarpeeSchema } from './harpee-schema';
import { HarpeeUtilities } from './harpee-utilities';
import { SqlHandler } from './sql-handler';
import { HarpeeHttp } from './harpee-http';
export declare class Harpee extends HarpeeHttp {
    /**
     *creates a connection to your harperDB instance
     * @param config
     * @param connectionCb
     */
    static createConnection(config: IHarpeeAuthConfig, connectionCb?: HarpeeConnectInfoCallback): void | {
        username?: string | undefined;
        password?: string | undefined;
        user?: string | undefined;
        pass?: string | undefined;
        host: string;
        token?: string | undefined;
    };
    /**
     * Alias for  `createConnection`.
     *
     *
     **/
    static connect(config: IHarpeeAuthConfig, connectionInfo?: HarpeeConnectInfoCallback): void | {
        username?: string | undefined;
        password?: string | undefined;
        user?: string | undefined;
        pass?: string | undefined;
        host: string;
        token?: string | undefined;
    };
    static Model: typeof HarpeeModel;
    static Schema: typeof HarpeeSchema;
    static Logger: typeof HarpeeLogger;
    static Utilities: typeof HarpeeUtilities;
    static Sqler: typeof SqlHandler;
}
