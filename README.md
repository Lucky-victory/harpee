> This [documentation](https://harpee-docs-v4.netlify.app) is for v4.x, you can find the documentation for previous versions [here](https://harpee-docs.netlify.app), Before upgrading please read the docs , this version includes breaking changes.

# Introduction.

**Harpee** is a modeling tool for [HarperDB](https://harperdb.io/?utm_source=luckyvictory), supports both callbacks and promises.

## Installation.

To use **harpee**, install with

`npm i harpee --save`

or

`yarn add harpee`

require it in your application.

```js
// commonjs
const { harpee } = require("harpee");

// as ES6 module
import { harpee } from "harpee";
```

## Setup

```js
// as ES6 module
import { harpee,HType } from "harpee";
// create a connection.

harpee.createConnection({host:
// "https://localhost:9925" or https://xxxxxxxx.harperdbcloud.com,
  user:"YOUR-DB-USERNAME",
  pass:"YOUR-DB-PASSWORD",
  token:xcxxxxxxxxxxx, // your JWT token, you should only use token if no `username` and `password`.
  })

  // create a Schema.
  // `name` is optional , if not specified, a default schema with the name `defaultSchema` will be created.

  const usersSchema =  new harpee.Schema({
  name:"usersSchema",
  fields:{
    username: HType.string().required(),
    email: HType.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required() ,
    phone: HType.number(),
    verified:HType.bool().default(false)
  }
   primaryKey:'user_id' // optional, alias for hash_attribute, default 'id'
   silent:false // optional, when true turns off error throwing when `Schema.fields` doesn't match `Model.create` values, default is false
  })


// create a model, the model name represents a table.

const UsersModel = new harpee.Model("users",myUsersSchema);

// Next, initialize it.
// Recommended: you may get rid of this method after running your app for the first time.

UsersModel.init();

```

## Usage.

Now you can start using the model `UsersModel` to perform several operations.

```js
// this will insert the following data in `users` table.
UsersModel.create(
    {
        username: "lucky",
        email: "user@email.com",
        phone: 1234567890,
    },
    callback
);
```

```js
// this returns every data  from the `users` table.
UsersModel.find({}, (err, result) => {
    if (err) console.log(err);
    console.log(result.data);
});

// or
UsersModel.find([]).then((result) => console.log(result.data));

// you can specify the columns to be returned.

const result = await UsersModel.find(["username"]);
//  console.log(result.data)

// you can specify an object with options
UsersModel.find(
    {
        limit: 5,
        offset: 10,
        orderby: ["user_id"],
        order: "desc",
        where: 'username="lucky"',
        getAttributes: ["username"],
    },
    (err, result) => {
        if (err) console.log(err);
        console.log(result.data);
    }
); // this will return only usernames.
```

```js
// this will return only data based on the specified `ids`,
UsersModel.findById(
    { ids: [1, 2], getAttributes: ["username", "email"] },
    (err, result) => {
        if (err) console.log(err);
        console.log(result.data);
    }
);
```

## Docs .

> To better understand how **Harpee** works, you should check out [HarperDB docs](https://harperdb.io/docs/overview/?utm_source=luckyvictory) to learn more about HarperDB.

**Harpee** consist of the following function and classes,

-   **`createConnection`**: _function_
-   **[Schema](https://harpee-docs-v4.netlify.app/classes/core_harpee_schema.HarpeeSchema.html)**: _class_
-   **[Model](https://harpee-docs-v4.netlify.app/classes/core_harpee_model.HarpeeModel.html)**: _class_
-   **[Logger](https://harpee-docs-v4.netlify.app/classes/core_harpee_logger.HarpeeLogger.html)**: _class_
-   **[Utilities](https://harpee-docs-v4.netlify.app/classes/core_harpee_utilities.HarpeeUtilities.html)**: _class_
-   **[Sqler](https://harpee-docs-v4.netlify.app/classes/core_sql_handler.SqlHandler.html)**: _class_

## createConnection(config)

`createConnection` function creates a connection with your harperDB instance. it takes in an object with the following props.

-   `host` _Type - String_ : your HarperDB url, _https://localhost:9925_ or *https://xxxxxxxxxx.harperdbcloud.com*.
-   `username` _Type - String_ : your HarperDB username.
-   `user` _Type - String_ : same as username.
-   `password` _Type - String_ : your HarperDB password.
-   `pass` _Type - String_ : same as password.
-   `token` _Type - String_ : A generated JWT token, token is _optional_,you should only include it in place of `username` and `password`.

## Schema(options)

`Schema` class creates a schema, it takes in an object with the following props,

-   `name` _Type - String_ : _optional_, if not specified a default schema named **defaultSchema** will be created, but if you want your schema to have a different name, then you should specify this option.
-   `primaryKey` _Type - String_ _*optional*_: this option allows you to set a _hash_attribute_, if not specified, will default to `id`.
-   `silent` _Type - boolean_ : _optional_ when true, turns off errors when `Schema.fields` types doesn't match `Model.create()` values, default is `false`.
-   `fields` _Type - Object_ : this option let's specify table columns and their types ,

> Note: the properties and data-types declared in **fields** must be same with properties and data-types that will be specified at `Model.create(object)` or `Model.createMany(object[])`, otherwise an error will be thrown, you can turn this off by setting `silent` option in `Schema` class to `true` .

```js
const ArticleSchema = new harpee.Schema({ name:"MyArticlesSchema"},
fields:{
  title: HType.string().required(),
  author: HType.object({name: HType.string()}).required(),
  body: HType.string().required(),
  publishDate: HType.date().default(new Date()),
  status:HType.string().equal('published','draft').default('published'),
  tags:HType.array()
})
```

## Model(modelName,SchemaConfig)

The Model class takes the following options.

-   `modelName` _Type - String_ : this modelName represents a table that will be created.
-   `schemaConfig` Type - Schema(Object) : this option takes in an instance of `Schema` .
-

```js
const Articles = new harpee.Model("Articles", ArticleSchema);
```

### Methods.

**Model** has the following methods. all methods supports both callbacks and promises, the callback function takes two parameters `err` and `result`.

#### create(object,callback)

inserts new data into the table, takes in an object of the data to be inserted.

```js
// inserts new data into Articles table.
Articles.create({
    id: 1,
    title: "post 1",
    author: { name: "lucky" },
    body: "lorem ipsum dot set amor",
    publishDate: new Date(),
    tags: ["first"],
});
```

#### updateNested({id,path,value,returnData?},callback)

This methods let's you update values as well nested values, such as objects & arrays, by simply specifying a path.

```js
Articles.updateNested(
    {
        // the id of the data to be updated
        id: 1,
        // this will update the author's name, 'lucky' => 'lucky victory'
        path: "author.name",
        // the new value
        value: "lucky victory",
        // returns the updated data
        returnData: true,
    },
    (err, result) => {
        console.log(result.data);
    }
);

// exampme 2
Articles.updateNested(
    {
        // the id of the data to be updated
        id: 1,
        // this will update the tags
        path: ".tags",
        // the new value
        value: (article) => {
            article.tags.push("second");
            return article.tags;
        },
        // returns the updated data
        returnData: true,
    },
    (err, result) => {
        console.log(result.data);
    }
);
```

#### find([options],callback)

The **find** method returns all data from the table. to do this, pass an empty array `[]` or wildcard `["*"]` as the first argument, you can also choose to return specific data,
for instance, in order to return only _Article titles_,

```js
// this will return only Articles titles.
Articles.find(["title"], (err, result) => {
    console.log(result.data);
});
```

the **find** method also takes an object with options, useful for advanced filtering.

-   `limit`: _Type - Number_ _optional_:
    -   `getAttributes`:_Type - Array_ _optional_
    -   `limit`: **Type - Number** _optional_,
    -   `offset`: **Type - Number** _optional_,
    -   `order`: **Type - String** _optional_
    -   `orderby` : **Type - String[]** _optional_
    -   `where` : **Type - String** _optional_
    -   `and` : **Type - String|Number** _optional_

You can find more methods on the [documentation](https://harpee-docs-v4.netlify.app/classes/core_harpee_model.HarpeeModel.html) page.

### Bugs or Feature Request.

For bugs or feature request, please create an [issue](https://github.com/lucky-victory/harpee/issues).
