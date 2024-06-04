# Zento Server

## Description

This is the backend server for the Zento blog web application. It handles user authentication, blog post management, and serves data to the frontend application. The server is built using Node.js, Express, and MongoDB, with JWT for authentication.

## Features

- **User Authentication**: Register, login, and logout functionality using JWT.
- **Blog Management**: Create, read, update, and delete blog posts.
- **File Uploads**: Handle image uploads using Multer.
- **CORS**: Configured to allow cross-origin requests from the frontend application.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
- **File Uploads**: Multer
- **Environment Variables**: dotenv
- **Development Tools**: Nodemon

## Setup and Running the Project Locally

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jahidhasan6484/zento-server.git
   cd zento-server
   ```

2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Using yarn:

   ```bash
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root of the project and add your configuration:

   ```plaintext
   PORT=your-port
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

4. **Run the server**

   Using npm:

   ```bash
   npm start
   ```

   For development with hot reloading:

   ```bash
   npm run dev
   ```

   Using yarn:

   ```bash
   yarn start
   ```

   For development with hot reloading:

   ```bash
   yarn dev
   ```

   The server should now be running on `http://localhost:your-port`.

### Project Structure

- **/src**
  - **/controllers**: Functions handling the logic for different routes
  - **/models**: Mongoose models
  - **/routes**: Express route definitions
  - **/middleware**: Custom middleware for the application
  - **server.js**: Main entry point for the server

### API Endpoints

#### User Endpoints

- **Register User**

  - **Endpoint:** `POST /api/user/register`
  - **Description:** Register a new user.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```

- **Login User**

  - **Endpoint:** `POST /api/user/login`
  - **Description:** Login a user.
  - **Request Body:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "yourpassword"
    }
    ```

- **Get User Profile**

  - **Endpoint:** `GET /api/user/profile`
  - **Description:** Get the profile information of the authenticated user.

- **Update User Profile**
  - **Endpoint:** `PATCH /api/user/update`
  - **Description:** Update the profile information of the authenticated user.
  - **Request Body:** (FormData)
    - `name`: Updated user name (optional)
    - `email`: Updated user email (optional)
    - `avatar`: Updated user avatar image file (optional)

#### Blog Endpoints

- **Add Blog**

  - **Endpoint:** `POST /api/blog/add`
  - **Description:** Add a new blog post.
  - **Request Body:** (FormData)
    - `title`: Title of the blog post
    - `content`: Content of the blog post
    - `image`: Image file for the blog post (optional)

- **My Blogs**

  - **Endpoint:** `GET /api/blog/my-blogs`
  - **Description:** Get all blog posts created by the authenticated user.

- **Delete Blog**

  - **Endpoint:** `DELETE /api/blog/delete`
  - **Description:** Delete a blog post by ID.
  - **Query Parameters:**
    - `id`: ID of the blog post to delete

- **Get Blog by ID**

  - **Endpoint:** `GET /api/blog/one`
  - **Description:** Get a specific blog post by ID.
  - **Query Parameters:**
    - `id`: ID of the blog post to fetch

- **Update Blog**

  - **Endpoint:** `PATCH /api/blog/update`
  - **Description:** Update a blog post by ID.
  - **Request Body:** (FormData)
    - `title`: Updated title of the blog post (optional)
    - `content`: Updated content of the blog post (optional)
    - `image`: Updated image file for the blog post (optional)

- **Blog Count**

  - **Endpoint:** `GET /api/blog/count`
  - **Description:** Get the count of blog posts created by the authenticated user.

- **Total Blog Count**

  - **Endpoint:** `GET /api/blog/totalCount`
  - **Description:** Get the total count of all blog posts.

- **Get All Blogs**

  - **Endpoint:** `GET /api/blog/all`
  - **Description:** Get all blog posts.

- **Get Key Blogs**
  - **Endpoint:** `GET /api/blog/key`
  - **Description:** Get key blogs for display.

### Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.
