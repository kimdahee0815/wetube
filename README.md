# <img src="/frontend/youtube.ico" alt="Wetube" width="40" height="40"> Wetube – YouTube-Style Video Sharing Platform 🎥

A full-stack video streaming platform inspired by YouTube, developed using **Node.js**, **Express**, **MongoDB**, and **Pug** for server-side rendering. It replicates core YouTube functionalities such as video browsing, playback, uploading, and user interaction. The app includes secure media handling with AWS S3, real-time commenting, and now features JWT-based authentication** alongside GitHub OAuth for secure, flexible login.

---

## 🚀 Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** Pug (Server-side rendering), SCSS
- **Authentication:** JWT, GitHub OAuth
- **Media Uploads:** Multer + AWS S3
- **Build Tooling:** Webpack
- **Deployment:** Fly.io

---

## 🌟 Key Features

- 🎥 **Video Upload & Playback**  
  Users can record and upload videos, stream directly in-browser, and view details.

- ☁️ **AWS S3 + Multer Integration**  
  Secure and scalable file storage with real-time file upload previews.

- 🗨 **Live Commenting System**  
  Real-time comments under videos for interactive discussions.

- 📱 **Responsive UI**  
  Designed to work seamlessly across all devices.

- ⚙️ **Webpack Bundling**  
  Optimized JS/CSS bundling and asset management for production.

## 🔒 Security Features

- 🔐 **GitHub OAuth**  
  Users can sign in via GitHub. Token-based auth enhances security for APIs and user sessions.

- 🔐 **Secure JWT Workflows**  
  - Token generation on login
  - Protected routes (upload, comment, profile, etc.)
  - Token refresh and logout flows