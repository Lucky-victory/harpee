 # Changelog
> As of version `2.1.0`, harpee now has a `.query()` method for executing custom sql queries. 

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

// create a connection.

harpee.createConnection({host:
// "https://localhost:9925" or https://xxxxxxxx.harperdbcloud.com,
  username:"YOUR-DB-USERNAME",
  password:"YOUR-DB-PASSWORD",
  token:xcxxxxxxxxxxx, // your JWT token, you should only use token if no `username` and `password`.
  })
  
  // create a Schema.
  // `name` is optional , if not specified, a default schema with the name `defaultSchema` will be created.
  
  const myUsersSchema = harpee.Schema({name:"myUsersSchema",fields:{
  user_id:Number,
    username:String,
    email:{type:String,required:true},
    phone:Number
  }
    
  })


// create a model, the model name represents a table.

const Users = new harpee.Model("Users",myUsersSchema);

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
Users.find({}, (err,data)=>{
  if(err) throw err;
  console.log(data)
});

// or
Users.find({}).then(data => console.log(data));


// you can specify the columns to be returned.
Users.find({get_attribute:["username"]},(err,data)=>{
  if(err) throw(err);
  console.log(data)
}) // this will return only usernames.



// this will return only one data based on the specified `id`,
Users.findById({user_id:1},(err,data)=>{
    if(err) throw(err);
    console.log(data)
});

```
## Docs .
> To better understand how **Harpee** works, you should check out [HarperDB docs](https://harperdb.io/docs/overview/?utm_source=luckyvictory) to learn more about HarperDB.


**Harpee** has 3 main functions, `createConnection`,`Schema`, and `Model`;
### createConnection(config)
`createConnection` function creates a connection with your database. it takes in an object with the following properties.
  - `host` *Type - String* : your HarperDB url, *https://localhost:9925* or *https://xxxxxxxxxx.harperdbcloud.com*.
  - `username` *Type - String* : your HarperDB username.
  - `password` *Type - String* : your HarperDB password.
  - `token` *Type - String* : A generated JWT token, token is *optional*,you should only include it as a replacement of `username` and `password`. 

### Schema(options)
 `Schema` function creates a Schema, it takes in an object with the following properties, 
   - `name` *Type - String* : this **name** option is *optional*, if not specified a default schema named **defaultSchema** will be created, but if you want your schema to have a different name, then you should specify this option.   
   - `primary_key` *Type - String* _*optional*_: this option allows you to set a *hash_attribute*, if not specified, will default to `id`.
   - `silent` *Type - boolean* : Turns off errors when `Schema.fields` properties doesn't match `Model.create()` properties, default is `false`.
   - `fields` *Type - Object* : this option represents the table columns that will be created in your database,
 
  > Note: the properties and data-types declared in **fields** must be same with properties and data-types that will be specified at `Model.create()`, otherwise an error will be thrown, you can turn this off by setting `silent` option of `Schema` function to `true` . 
```js
const ArticleSchema = harpee.Schema({name:"MyArticlesSchema"},fields:{
  title:String,
  author:String,
  body:{type:String,required:true},
  publishDate: Date
})
```
 
### Model(modelName,SchemaObject)

> This function should be instantiated with the `new` keyword. 

the model function takes the following options.
   - `modelName` *Type - String* : this modelName represents a table that will be created.
  - `schemaObject` Type - Schema(Object) : this option takes in an Object returned from the `Schema` function.
```js
const Articles = new harpee.Model("Articles",ArticleSchema);

```
#### Methods.

**Model** has the following methods. all methods supports both callbacks and promises, the callback function takes two parameters `err` and `data`.
  - `create`: inserts new data into the table, takes in an object of the data to be created.

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
      - `get_attribute`:*Type - Array* *optional*
      - `offset`: **Type - Number ** *optional*, 
      - `desc`: **Type - boolean** *optional*
      - `orderBy` : **Type - String** *optional* 

  - `findById` : the **findById** method returns a single data, based on the specified `id`, takes in an object of id key and value or an array of id string. 
  - `findByIdAndRemove` *param - Object* : deletes a single data from the table based on the specified `id`, takes in an *Object* of id key and value or an *Array* of id string.
  - `update`: updates the table with the new data based on the specified id, takes in the following.
    - `id`: an object of id key and value or an array of id string.
    - `obj`: an object with the data to be updated.
  - `query`: let's you write your custom sql queries.
      - `sqlQuery`: *param - String*: a valid sql string.
  ```js  
  Model.query("SELECT * FROM defaultSchema.Articles LIMIT 5",(err,data)=>{
    if(err) throw err;
    console.log(data)
  })
  
  ```
  - `describeModel`: Returns details about the table (alias model), such as the the number of records on the table, etc.
  - `importFromCsv` *param - Object*: plain csv data to be inserted into the table.
    - `csv`:a well formatted plain csv string.   
    - `action`: *optional*, the action to be performed, default is 'insert'.

  - `importFromCsvFile` *param - Object*: import a .csv file to be inserted into the table, *Note: this only works when using harperdb locally not the cloud instance*.
    - `filePath`: a relative path to the local file. 
    - `action`: *optional*, the action to be performed, default is 'insert'.
 
  - `importFromCsvUrl` *param - Object*: import a .csv file to be inserted into the table from an external Url, this method takes in the following.
    - `fileUrl`: an absolute url ( with file extension) where the file lives.
    - `action`: *optional*, the action to be performed, default is 'insert'.
  - `importFromS3` *param - Object*: import a .csv or .json file from your AWS S3 bucket, this method takes in the following,
    - `s3Key`: your aws access key id.
    - `s3Secret`: your aws secret access key.
    - `bucket`: your aws s3 bucket where the file lives.
    - `filename`: a .csv or .json file.
    - `action`: *optional*, the action to be performed, default is 'insert'.
  - `clearAll`: *Use this with caution*, deletes all data from the table.


### Bugs or Feature Request.
For bugs or feature request, please create an [issue](https://github.com/lucky-victory/harpee/issues) on github.

### Support this project.
Want to support this project? [![Buy me a coffee](https://raw.githubusercontent.com/Lucky-victory/folio/main/files/images/yellow-button.png)](https://buymeacoffee.com/luckyvictory).