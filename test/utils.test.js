const U = require('../utils/utils');

test('checks if the value is a string', () => {
  const str = 'hello'
  expect(U._isStr(str)).toBeTruthy();
})
test('checks if the value is an array', () => {
  const arr = []
  expect(U._isArray(arr)).toBeTruthy();
})
test('checks if the value is an object', () => {
  const obj = {}
  expect(U._isObj(obj)).toBeTruthy();
})
test('checks if an array or object is empty', () => {
  const arr = []
  const obj = {}
  const obj2 = { name: 'lucky' }
  expect(U._isEmpty(arr)).toBeTruthy();
  expect(U._isEmpty(obj)).toBeTruthy();
  expect(U._isEmpty(obj2)).toBeFalsy();
})
test('converts an object into an array with a seperator', () => {
  const obj = { name: 'lucky', age: 25 }
  const arr = ["name='lucky'", "age='25'"]
  expect(U._objToArray(obj, "=")).toEqual(arr);
})
test('checks if a string is empty', () => {
  const str = ''
  const str2 = 'hello'
  expect(U._isEmptyStr(str)).toBeTruthy();
  expect(U._isEmptyStr(str2)).toBeFalsy();
})
test('gets the extension of a file', () => {
  const str = 'hello.html'
  expect(U._getExtname(str)).toBe('html');
})