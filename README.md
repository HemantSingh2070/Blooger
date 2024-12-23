# Blooger - A Modern Blogging Platform 📝

## Project Overview
**Blooger** is a dynamic and feature-rich blogging website that enables users to create, read, and share blogs seamlessly. The platform incorporates user authentication, file uploads, and an intuitive UI for an engaging user experience. Whether you're a writer looking to share your thoughts or a reader exploring diverse content, **Blooger** caters to all your blogging needs.

---

## Features
1. **User Authentication:**
   - Secure login, signup, and logout functionality using **JWT (JSON Web Tokens)**.

2. **Content Creation and Management:**
   - Users can create, edit, and delete their blogs effortlessly.

3. **File Uploads:**
   - Profile picture uploads enabled via **Multer**, making profiles more personalized.

4. **Template Engine:**
   - **EJS (Embedded JavaScript)** for dynamic, server-side rendering of web pages.

5. **Database Integration:**
   - Blogs, users, and other data are managed using **MongoDB** through the **Mongoose** library.

6. **Read-Only Access:**
   - Blogs can be viewed by anyone without logging in, promoting open access to content.

7. **Write Access:**
   - Only authenticated users can create or modify content, ensuring secure content management.

---

## Tech Stack
- **Frontend:**
  - EJS for templating.
  - HTML, CSS, and JavaScript for a seamless user experience.
- **Backend:**
  - Built with **Express.js** for robust server-side handling.
- **Database:**
  - MongoDB with **Mongoose** for efficient data management.
- **Authentication:**
  - JWT for secure user authentication and session management.
- **File Handling:**
  - **Multer** for handling file uploads like profile pictures.

---

## Prerequisites
- **Node.js** installed on your system.
- A **MongoDB** instance (local or cloud-based, such as MongoDB Atlas).

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blooger.git
## Dependencies

The project uses the following dependencies:

- **cookie-parser**: For parsing cookies.
- **dotenv**: For managing environment variables.
- **ejs**: For rendering dynamic HTML templates.
- **express**: Web framework for building the application.
- **jsonwebtoken**: For secure authentication.
- **mongoose**: For database interaction with MongoDB.
- **multer**: For handling file uploads.


## Steps:
1.npm install
2.In env file:
  -**PORT=3000
MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
**
3.npm run dev
