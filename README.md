 # Changelog
> Before upgrading to v3.x please read the [docs](https://harpee-docs.netlify.app), this version includes breaking changes. 

# Introduction.
**Harpee** is a modeling tool for [HarperDB](https://harperdb.io/?utm_source=luckyvictory), harpee supports both callbacks and promises.


## Installation.
To use **harpee**, install with

`npm i harpee --save`

or 

`yarn add harpee`

require it in your application.

```js
// commonjs
const harpee = require("harpee");

// as ES6 module
import harpee from "harpee"

```

## Setup
```js
// create a connection.

harpee.createConnection({host:
// "https://localhost:9925" or https://xxxxxxxx.harperdbcloud.com,
  username:"YOUR-DB-USERNAME",
  password:"YOUR-DB-PASSWORD",
  token:xcxxxxxxxxxxx, // your JWT token, you should only use token if no `username` and `password`.
  })
  
  // create a Schema.
  // `name` is optional , if not specified, a default schema with the name `defaultSchema` will be created.
  
  const myUsersSchema =  new harpee.Schema({name:"myUsersSchema",fields:{
  user_id:{type:Number},
    username:{type:String},
    email:{type:String,required:true},
    phone:{type:Number}
  }
   primaryKey:'user_id' // optional, alias for hash_attribute, default 'id'
   silent:true // optional, turn on/off error throwing when `Schema.fields` doesn't match `Model.create` value, default false
  })


// create a model, the model name represents a table.

const Users = new harpee.Model("Users",myUsersSchema);
// Next, initialize it.
// this will create the schema/table if they don't exist yet.
// i recommend you get rid of this method after running your app.

Users.init();

```
## Usage.
Now you can start using the model `Users` to perform several operations.
```js
// this will insert the following data in the `Users` table.
Users.create({
user_id:1,
  username:"lucky",
  email:"user@email",
  phone:1234567890
},callback)

```
```js
// this returns every data  from the `Users` table.
Users.find({}, (err,result)=>{
  if(err) console.log(err);
  console.log(result)
});

// or
Users.find({}).then(result => console.log(result));


// you can specify the columns to be returned.
Users.find({limit:5,offset:10,orderby:'user_id',order:'DESC'2,
getAttributes:["username"]},(err,result)=>{
  if(err) console.log(err);
  console.log(result)
}) // this will return only usernames.


```
```js
// this will return only data based on the specified `ids`,
Users.findById({user_id:[1,2],getAttributes:["username","email"]},(err,result)=>{
    if(err) console.log(err);
    console.log(result)
});

```
## Docs .
> To better understand how **Harpee** works, you should check out [HarperDB docs](https://harperdb.io/docs/overview/?utm_source=luckyvictory) to learn more about HarperDB.


**Harpee** consist of the following function and classes,

- **`createConnection`**: *function*
- **`Schema`**: *class*
- **`Model`**: *class*
- **`Logger`**: *class*
- **`Utilities`**: *class*
- **`Sqler`**: *class*

### createConnection(config)
`createConnection` function creates a connection with your harperDB instance. it takes in an object with the following props.
  - `host` *Type - String* : your HarperDB url, *https://localhost:9925* or *https://xxxxxxxxxx.harperdbcloud.com*.
  - `username` *Type - String* : your HarperDB username.
  - `password` *Type - String* : your HarperDB password.
  - `token` *Type - String* : A generated JWT token, token is *optional*,you should only include it in place of `username` and `password`. 

### Schema(options)
 `Schema` function creates a Schema, it takes in an object with the following props, 
   - `name` *Type - String* :  *optional*, if not specified a default schema named **defaultSchema** will be created, but if you want your schema to have a different name, then you should specify this option.   
   - `primaryKey` *Type - String* _*optional*_: this option allows you to set a *hash_attribute*, if not specified, will default to `id`.
   - `silent` *Type - boolean* : *optional* Turns on/off errors when `Schema.fields` properties doesn't match `Model.create()` properties, default is `false`.
   - `fields` *Type - Object* : this option let's specify table columns and their types ,
 
  > Note: the properties and data-types declared in **fields** must be same with properties and data-types that will be specified at `Model.create()`, otherwise an error will be thrown, you can turn this off by setting `silent` option in `Schema` class to `true` .

```js
const ArticleSchema = new harpee.Schema({name:"MyArticlesSchema"},fields:{
  title:{type:String},
  author:{type:String},
  body:{type:String,required:true},
  publishDate:{type: Date}
})
```
 
### Model(modelName,SchemaObject)

> This class should be instantiated with the `new` keyword. 

the Model class takes the following options.
   - `modelName` *Type - String* : this modelName represents a table that will be created.
  - `schemaObject` Type - Schema(Object) : this option takes in an Object returned from the `Schema` class.
  - 
```js
const Articles = new harpee.Model("Articles",ArticleSchema);

```
#### Methods.

**Model** has the following methods. all methods supports both callbacks and promises, the callback function takes two parameters `err` and `result`.
##### create(object,callback)
inserts new data into the table, takes in an object of the data to be inserted.

  ```js
  // inserts new data into Articles table.
  Articles.create({title:"post 1", 
  author:"lucky",
  body:"lorem ipsum dot set amor",
  publishDate:new Date()
    
  })
  ```
  ##### Find([options],callback)
  
  the **find** method returns all data from the table. to do this, pass an empty array `[]` or wildcard `["*"]` as the first argument, you can also choose to return specific data, for example, in order to return only *Articles titles*, 
  ```js
  // this will return only Articles titles.
  Articles.find(["title"],(err,data)=>{
    console.log(data)
  })
  ```
the **find** method also takes an object with options, this let's do some advanced filtering.
  - `limit`: *Type - Number* *optional*: 
      - `getAttributes`:*Type - Array* *optional*
      - `offset`: **Type - Number ** *optional*, 
      - `desc`: **Type - boolean** *optional*
      - `orderBy` : **Type - String** *optional* 

You can find more methods on the [documentation](https://harpee-docs.netlify.app/model) page.

### Bugs or Feature Request.
For bugs or feature request, please create an [issue](https://github.com/lucky-victory/harpee/issues) on github.

### Support this project.
Want to support this project? [![Buy me a coffee](https://raw.githubusercontent.com/Lucky-victory/folio/main/files/images/yellow-button.png)](https://buymeacoffee.com/luckyvictory).