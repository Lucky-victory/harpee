export = Schema;
/** creates a schema .
 *
 * @param {Object} options - an object takes in `name` and `fields` .
 * @param {string } [options.name=defaultShema] - the name of your schema.
 * @param {Object} options.fields - an object to specify the table columns.
 * @returns {Object} - returns an object.
 **/
declare function Schema(options: {
    name?: string;
    fields: Object;
}): Object;
