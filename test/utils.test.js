const U = require('../utils/utils');

test('checks if the value is a string',()=>{
  let str='hello'
  expect(U._isStr(str)).toBe(true);
})
test('checks if the value is an array',()=>{
  let arr=[]
  expect(U._isArray(obj)).toBe(true);
})
test('checks if the value is an object',()=>{
  let obj={}
  expect(U._isObj(obj)).toBe(true);
})
test('checks if an array or object is empty',()=>{
  let arr=[]
  let obj={}
  let obj2={name:'lucky'}
  expect(U._isEmpty(arr)).toBe(true);
  expect(U._isEmpty(obj)).toBe(true);
  expect(U._isEmpty(obj2)).not.toBe(true);
})
test('converts an object into an array with a seperator',()=>{
  let obj={name:'lucky',age:25}
  let arr=["name='lucky',age='25'"]
  expect(U._objToArray(obj)).toBe(arr);
})
test('checks if a string is empty',()=>{
  let str=''
  let str2='hello'
  expect(U._isEmptyStr(str)).toBe(true);
  expect(U._isEmptyStr(str2)).not.toBe(true);
})
// test('checks if the value is a string',()=>{
//   let str='hello'
//   expect(U._isStr(str)).toBe(true);
// })