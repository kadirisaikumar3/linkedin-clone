# 🚀 LinkedIn Clone – Simple Social Media Web App

**Author:** Saikumar Kadiri  
**GitHub:** [kadirisaikumar3](https://github.com/kadirisaikumar3)

---

## 🌍 Live Demo

- **Frontend (Vercel):** [https://linkedin-clone-iota-eight.vercel.app/](https://linkedin-clone-iota-eight.vercel.app/)
- **Backend API (Render):** [https://linkedin-clone-pqi2.onrender.com/api](https://linkedin-clone-pqi2.onrender.com/api)
- **GitHub Repository:** [https://github.com/kadirisaikumar3/linkedin-clone](https://github.com/kadirisaikumar3/linkedin-clone)

---

## 🧠 Overview

A **LinkedIn Clone** – a simple social media web application that allows users to:

- Sign up and log in
- Create posts (with text and images)
- View posts from all users
- Like, comment, edit, and delete posts
- View a personal profile page

This project demonstrates **Full Stack Development** skills — combining frontend, backend, and database integration.

---

## 🧩 Tech Stack

| Layer | Technology Used |
|-------|------------------|
| **Frontend** | React.js (Vercel Deployment) |
| **Backend** | Node.js + Express.js (Render Deployment) |
| **Database** | MongoDB Atlas |
| **Image Storage** | Cloudinary |
| **Authentication** | JWT (JSON Web Token) |
| **Hosting** | Vercel (Frontend) & Render (Backend) |

---

## ✨ Features

✅ **User Authentication**
- Signup and Login using JWT  
- Secure password hashing with bcrypt  

✅ **Post Management**
- Create posts with text and optional image  
- Edit and delete own posts  

✅ **Social Features**
- Like and comment on posts (with counts)  
- Public feed showing all posts  

✅ **Profile Page**
- Displays user details and their posts  

✅ **Responsive UI**
- Mobile-friendly and clean interface  

---

## 🧰 Installation & Setup (Run Locally)

### 🔹 1. Clone the Repository
bash
git clone https://github.com/kadirisaikumar3/linkedin-clone.git
cd linkedin-clone

### 2. Backend Setup
cd backend
npm install

Create a .env file in the backend folder with:

PORT=5000
MONGO_URI=<your MongoDB URI>
JWT_SECRET=<your-secret-key>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>

Then start the server:
npm run dev

The backend runs on:
👉 http://localhost:5000

### Frontend Setup

cd ../frontend
npm install

Create a .env file in the frontend folder with:

REACT_APP_API_URL=http://localhost:5000/api

Then Start the Frontend:
npm start

Frontend runs on:
http://localhost:3000

### Folder Structure

linkedin-clone/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── .env
│   └── package.json
│
└── README.md

### Deplyoment Info:
## 🚀 Deployment Info

- **Frontend:** Deployed on [Vercel](https://linkedin-clone-iota-eight.vercel.app/)
- **Backend API:** Hosted on [Render](https://linkedin-clone-pqi2.onrender.com/api)
- **Database:** Hosted on MongoDB Atlas (Cloud)
- **Images:** Stored using Cloudinary (Cloud)


### 👨‍💻 Author
Saikumar Kadiri
📍 Bengaluru, India
📞 +91 8688077239
📧 saikumarkadirik@gmail.com
🔗https://github.com/kadirisaikumar3

### 🏁 Acknowledgments
Special thanks to AppDost HR Team for the Full Stack Developer Internship assignment opportunity.

### © 2025 Saikumar Kadiri. All Rights Reserved.


---

### 🧾 How to Use It

1. Create a new file in your project root folder called **`README.md`**  
2. Paste all the text above  
3. Save the file  
4. Push it to GitHub:
   ```bash
   git add README.md
   git commit -m "Add final README for submission"
   git push

✅ Done — your GitHub repo will now look professional and ready for submission.
