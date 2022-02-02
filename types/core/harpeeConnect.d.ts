/**
 * Creates a Connection to your harperDB instance, this is the only connection you will need. it covers the connections required for `Utilities` and `Logger` classes.
 * @param {object} config - config object that takes in `host`, `username`,`password` and `token`.
 * @param {string} config.host - your harperdb host url.
 * @param {string} config.username - your harperdb username.
 * @param {string} config.password - your harperdb password.
 * @param {string} [config.token] - your generated JWT token.
 * @returns {void}
 **/
export function createConnection(config: {
    host: string;
    username: string;
    password: string;
    token?: string;
}): void;
/**
 * An alias for  `createConnection`,  to support older versions of **Harpee**.
 * @deprecated
 *
 **/
export function connect(config: any): void;
//# sourceMappingURL=harpeeConnect.d.ts.map