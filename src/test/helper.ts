import { harpee, HType } from '../lib';
const { Model, createConnection, Schema } = harpee;

export const connDB = () =>
  createConnection({
  host: 'http://localhost::9925',
        user: 'HDB_ADMIN',
        pass: 'HBD_PASSWORD'});
const schema = new Schema({
  name: 'harpeeTestSchema',
  fields: { name: HType.string(), age: HType.number() },
});
export const model = new Model('test_table', schema);
