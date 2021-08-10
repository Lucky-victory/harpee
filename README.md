
# Introduction.
**Harpee** is an asynchronous object modeling tool for [HarperDB](https://harperdb.io/?utm_source=luckyvictory), harpee supports both callbacks and promises.


## Installation.
To use **harpee**, install with

`npm i harpee --save`

or 

`yarn add harpee`

require it in your application.

```js

const harpee = require("harpee");

// create a connection.

harpee.connect({host:
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


// create a model, the model name represents a table in plural form, if you declare "User" as your model name, a table of "Users" will be created.

const Users = new harpee.model("User",myUsersSchema);

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
Users.find([], (err,data)=>{
  if(err) throw err;
  console.log(data)
});

// or
Users.find([]).then(data => console.log(data));


// you can specify the columns to be returned.
Users.find(["username"],(err,data)=>{
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


**Harpee** has 3 main functions, `connect`,`Schema`, and `model`;
- **connect** : the `connect` function creates a connection with your database. it takes in an object with the following properties.
  - `host` *Type - String* : your HarperDB url, *https://localhost:9925* or *https://xxxxxxxxxx.harperdbcloud.com*.
  - `username` *Type - String* : your HarperDB username.
  - `password` *Type - String* : your HarperDB password.
  - `token` *Type - String* : A generated JWT token, token is *optional*,you should only include it as a replacement of `username` and `password`. 

- **Schema** : the `Schema` function creates a Schema, it takes in an object with the following properties, 
   - `name` *Type - String* : this **name** option is *optional*, if not specified a default schema named **defaultSchema** will be created, but if you want your schema to have a different name, then you should specify this option. 
   - `fields` *Type - Object* : this option represents the table columns that will be created in your database,
  > Note: the properties and data-types declared in **fields** must be same with properties and data-types that will be specified at `model.create()`, otherwise an error will be thrown. 
```js
const ArticleSchema = harpee.Schema({name:MyArticlesSchema},fields:{
  title:String,
  author:String,
  body:{type:String,required:true},
  publishDate: Date
})
```
 
- **model**: the `model` should be instantiated with `new` keyword. the model functions takes the following options.
  - `modelName` *Type - Striníg* : this modelName represents a table in plural form, that is, if you specify **Article** as your modelName, a table called **Articles** will be created.
  - `schema` Type - Schema(Object) : this option takes in an Object returned from the `Schema` function.
```js
const Articles = new harpee.model("Article",ArticleSchema);

```

   **model** has the following methods. all model methods supports both callbacks and promises, the callback function takes two parameters `err` and `data`
  - `find` : 
### Bugs or Feature Request.
For bugs or feature request, please create an [issue](https://github.com/lucky-victory/harpee/issues) on github.

### Support this project.
Love this project? you can [Buy me a coffee](https://buymeacoffee.com/luckyvictory).