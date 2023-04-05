import { harpee, HType } from '../lib';
const { Model, createConnection, Schema } = harpee;

export const connDB = () =>
  createConnection({
    user: 'veek',
    pass: '@veek.247',
    host: 'https://hashnode-lv.harperdbcloud.com',
  });
const schema = new Schema({
  name: 'harpeeTestSchema',
  fields: { name: HType.string(), age: HType.number() },
});
export const model = new Model('test_table', schema);
