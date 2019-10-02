# nodejs-api-restify-mongoose-jwt

A simple REST API utilizing Restify, Mongoose, and jsonwebtokens.

## About the Project

This project focuses on creating a RESTful API to create, read, update, and delete Customers from a MongoDB database. It uses Restify to handle endpoints and Mongoose to set up database schemas. Route protection added using JWT and bcrypt for password encryption.

## Technologies Used

- Restify
- MongoDB + Mongoose
- JSON Web Tokens
- Bcrypt

# Documentation

## Open Endpoints

Open endpoints require no Authentication.

### User Login

URL: `/login`

Method: `POST`
<br></br>

**Request**

Body: `{ "email": "valid email", "password": "plain text password" }`
<br></br>

**Response**

Code: 200 OK

Body:

`{ "iat": token issue time, "exp": token expiration time, "token": token }`
<br></br>

Code: 401 Unauthorized

Body:

`{ "code": "Unauthorized", "message": "Authentication Failed" }`
<br></br>

### Register User

URL: `/register`

Method: `POST`
<br></br>

**Request**

Body: `{ "email": "valid email", "password": "plain text password" }`
<br></br>

**Response**

Code: 201 Created

Body: None

<br></br>

## Closed Endpoints

Closed endpoints require a valid Token to be included in the header of the
request. Header shall use the `Authorization: Bearer <token>` schema. Token can be retrieved from a succesful user login.

### Get All Customers

URL: `/customers`

Method: `GET`
<br></br>

**Response**

Code: 200 OK

Body:
`[ { "balance": Number, "_id": "String - userID ", "name": "String - User Name", "email": "String - user@email.com", "updatedAt": "timestamp", "createdAt": "timestamp", "__v": 0 } ]`

<br></br>
