import { harpee } from '../lib';
const { createConnection, Utilities } = harpee;
import test from 'ava';

import { model, connDB } from './helper';
const harpeeUtils = new Utilities();
connDB();

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

test.serial('should initialize model', async (t) => {
  try {
    await model.init();
    t.pass('init success');
  } catch (err) {
    t.fail('init failed');
  }
});
test.after.always('should drop the schema ', async (t) => {
  try {
    await harpeeUtils.dropSchema({ schema: 'harpeeTestSchema' });
    t.pass('schema dropped');
  } catch (err) {
    t.falsy(err);
  }
});
test.serial('should create and retrieve a record', async (t) => {
  const record = { name: 'Lucky', age: 27, id: 1 };
  try {
    await model.create(record);

    const { data } = await model.findOne({ age: 27 }, model.fields);
    t.deepEqual(record, data);
  } catch (err) {
    t.falsy(err, 'create and retrieve failed');
  }
});
test.serial('should create and retrieve many record by ID', async (t) => {
  const record = [
    { name: 'Lucky', age: 27, id: 1 },
    { name: 'Ben', age: 33, id: 2 },
  ];
  try {
    await model.createMany(record);

    const { data } = await model.findById({
      id: [1, 2],
      getAttributes: model.fields,
    });
    t.deepEqual(record, data);
  } catch (err) {
    t.falsy(err, 'create and retrieve many failed');
  }
});
