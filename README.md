# harpee
Harpee is an asynchronous object modeling tool for HarperDB, harpee supports both callbacks and promises.

## Usage 
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
    username:String,
    email:{type:String,required:true},
    phone:Number
  }})


// create a model, the model represents a table in plural form, if you "User" is your model name, a table of "Users" will be created.

const Users = new harpee.model("User",myUsersSchema);

```