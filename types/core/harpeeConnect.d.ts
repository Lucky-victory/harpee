export type Config = {
    host: string;
    username: string;
    password: string;
    token?: string;
};
/**
 *
 * @typedef {{host:string,username:string,password:string,token?:string}} Config
 */
/**
 * Creates a Connection to your harperDB instance, this is the only connection you will need. it covers the connections required for `Utilities` and `Logger` classes.
 * @param {Config} config - config object that takes in `host`, `username`,`password` and/or `token`.
 * @param {(info?:Config,error?:any)=>void} [connectionInfo] - get the connection details or error if any
 * @returns {void}
 */
export function createConnection(config: Config, connectionInfo?: (info?: Config, error?: any) => void): void;
/**
 * An alias for  `createConnection`,  to support older versions of **Harpee**.
 * @deprecated
 *
 **/
export function connect(config: any): void;
