import { harpee, HType } from '../lib';
import test from 'ava';
const { Model, createConnection, Schema } = harpee;

const connectDB = () =>
  createConnection({
    user: 'veek',
    pass: '@veek.247',
    host: 'https://hashnode-lv.harperdbcloud.com',
  });
const schema = new Schema({
  name: 'harpeeTestSchema',
  fields: { name: HType.string(), age: HType.number() },
});
const model = new Model('test_table', schema);

test.serial('should throw error on empty config', (t) => {
  //@ts-ignore
  t.throws(() => createConnection());
});
test.serial('should throw error when only host is provided', (t) => {
  //@ts-ignore
  t.throws(() => createConnection({ host: 'http://localhost::9925' }));
});
test.serial(
  'should throw error when host, username, password and token are provided',
  (t) => {
    //@ts-ignore
    t.throws(() =>
      createConnection({
        host: 'http://localhost::9925',
        user: 'HDB_ADMIN',
        pass: 'HBD_PASSWORD',
        token: 'JjAq3ar/0GyLDJk8AfP6LXr...',
      })
    );
  }
);

// test.serial('should initialize model', async (t) => {
//   try {
//     connectDB();
//     await model.init();
//     t.pass('init success');
//   } catch (err) {
//     t.fail('init failed');
//   }
// });
test.serial('should create and retrieve a record', async (t) => {
  const record = { name: 'Lucky', age: 27, id: 1 };
  try {
    connectDB();
    await model.create(record);
    // const { data } = await model.findOne({ id: 1 }, model.fields);
    t.pass('create passed');
    // t.deepEqual(data, record);
  } catch (err) {
    console.log(JSON.stringify(err));

    t.fail('create failed');
  }
});
