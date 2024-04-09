# Backend Developer Assignment

This repository contains the code for the Backend Developer Assignment. The assignment involves creating REST APIs for user and product management using Express.js and TypeScript, with MongoDB as the database. JSON Web Token (JWT) is integrated for authentication.

## Table of Contents

- [Technologies](#Technologies)
- [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
- [Database](#database)

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **jsonwebtoken**
- **bcrypt**
- **Multer**
- **TypeScript**
- **Postman**
- **GitHub**

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
```
https://github.com/habeebmoosa/leadlly-backend-assignment.git
```

2. Install dependencies:
```
cd backend-assignment
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory and add the following environment variables:
```
PORT=3000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```
Replace `your-mongodb-uri` with your MongoDB connection string and `your-jwt-secret` with your JWT secret key.

4. Start the server:
```
npm run dev
```
The server will start running at `http://localhost:3000`.

## Usage

### API Endpoints

1. **User**

- **Register:** `POST /user/register`
  - Creates a new user account.
  - Requires `name`, `email`, `password`, and `phoneno` in the request body.  `role` is `user` by default.
  - Also user contains `shippingAddress`, and `paymentInfo`.

- **Login:** `POST /user/login`
  - Authenticates a user and generates a JWT token.
  - Requires `email` and `password` in the request body.

- **Logout:** `GET /user/logout`
  - Logs out the currently authenticated user.

- **Edit:** `PUT /user/update`
  - Updates user information.
  - User can update any information of him/her.

- **Edit Password** `PUT /user/updatePassword`
  - Update user password.
  - User requires `oldPassword`, and `newPassword`.

2. **Product**

- **Create Product** `POST /product/create`
- **Get All Products** `GET /product/get`
- **Get Products By Category** `GET /product/get/:category`
- **Get Products By User** `GET /product/getById`

### Authentication

JWT (JSON Web Token) is used for authentication. After successful login, a JWT token is generated and stored in a cookie. This token is required to access protected routes.

## Database

The project uses MongoDB as the database. Ensure you have MongoDB installed and running on your system. Update the `.env` file with the MongoDB URI.


