


interface Options {
  get_attr:string[],
  search_val:string,
  search_attr:string
}


export interface Harpee {
  
/** function to Connect to your database.
 * @param {Object} options - An object that takes in `host`, `username`,`password`,`token`.
 * @param {string} options.host - your harperdb host url.
 * @param {string} options.username - your harperdb username.
 * @param {string} options.password - your harperdb password.
 * @param {string} [options.token] - your generated JWT token.
 * @return {void} .
 **/
  connect(options:HarpeeConnect): void;
  /** creates a schema .
   *
   * @param {Object} options - an object takes in `name` and `fields` .
   * @param {string } [options.name=defaultShema] - the name of your schema.
   * 
   * */
   Schema(options:HarpeeSchema):HarpeeSchemaObject;
   Model(modelName:string,schema:HarpeeSchemaObject):Model
   
}

declare const harpee : Harpee
export default harpee
