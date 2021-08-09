export = connect;
/** function to Connect to your database.
 * @param {Object} options - An object that takes in `host`, `username`,`password`,`token`.
 * @param {string} options.host - your harperdb host url.
 * @param {string} options.username - your harperdb username.
 * @param {string} options.password - your harperdb password.
 * @param {string} [options.token] - your generated JWT token.
 * @return {void} .
 **/
declare function connect(options: {
    host: string;
    username: string;
    password: string;
    token?: string;
}): void;
