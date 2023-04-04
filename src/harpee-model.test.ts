import { harpee } from './lib';
import test from 'ava';
const { Model, createConnection, Schema } = harpee;

test.before(() => {
  createConnection({
    user: 'veek',
    pass: '@veek.247',
    host: 'https://hashnode-lv.harperdbcloud.com',
  });
});

test.serial('should initialize model', async () => {
  const schema = new Schema({ name: 'harpeeTestSchema', fields: {} });
  const model = new Model('test_table', schema);

  await model.init();
});
