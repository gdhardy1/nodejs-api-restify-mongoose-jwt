# nodejs-api-restify-mongoose-jwt

A simple REST API utilizing Restify, Mongoose, and jsonwebtokens.

## About the Project

This project focuses on creating a RESTful API to create, read, update, and delete Customers from a MongoDB database. It uses Restify to handle endpoints and Mongoose to set up database schemas. Route protection added using JWT and bcrypt for password encryption.

## Technologies Used

- Restify
- MongoDB + Mongoose
- JSON Web Tokens
- Bcrypt

<br></br>

# Documentation

## Open Endpoints

Open endpoints require no Authentication.

### User Login

URL: `/login`

Method: `POST`
<br></br>

**Request**

Body:

```javascript
{ "email": String (required), "password": String (required)}
```

**Response**

Code: `200 OK`

Body:

```json
{ "iat": "token issue time", "exp": "token expiration time", "token": "token" }
```

Code: `401 Unauthorized`

Body:

```json
{ "code": "Unauthorized", "message": "Authentication Failed" }
```

<br></br>

### Register User

URL: `/register`

Method: `POST`
<br></br>

**Request**

Body:

```javascript
{ "email": String (required), "password": String (required)}
```

**Response**

Code: `201 Created`

Body: None
<br></br>

## Closed Endpoints

Closed endpoints require a valid Token to be included in the header of the
request. Header shall use the `Authorization: Bearer <token>` schema. Token can be retrieved from a succesful user login.
<br></br>

### Get All Customers

URL: `/customers`

Method: `GET`
<br></br>

**Response**

Code: `200 OK`

Body:

```javascript
[
    {
        balance: Number,
        _id: String "userID",
        name: String "User Name",
        email: String "user@email.com",
        updatedAt: Date "timestamp",
        createdAt: Date "timestamp",
        __v: 0
    }
]
```

<br></br>

### Get Customer by ID

URL: `/customers/:id`

Method: `GET`

Parameters:

`:id - userID _id`
<br></br>

**Response**

Code: `204 No Content`

```javascript
{
    balance: Number,
    _id: String "userID",
    name: String "User Name",
    email: String "user@email.com",
    updatedAt: Date "timestamp",
    createdAt: Date "timestamp",
    __v: 0
}
```

<br></br>

### Add Customer

URL: `/customers`

Method: `POST`

<br></br>
**Request**

Body:

```javascript
{
  name: String (required), email: String (required), balance: Number;
}
```

**Response**

Code: `201 Created`

Body:

```javascript
{
    balance: Number,
    _id: String "userID",
    name: String "User Name",
    email: String "user@email.com",
    updatedAt: Date "timestamp",
    createdAt: Date "timestamp",
    __v: 0
}
```

<br></br>

### Delete Customer

URL: `/customers/:id`

Method: `DELETE`

Parameters:

`:id - userID _id`
<br></br>

**Response**

Success

Code: `204 No Content`
