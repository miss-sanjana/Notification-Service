# 🚀 Notification Service
A backend system designed to send notifications via Email, SMS, and In-App channels. Built with scalability and extensibility in mind, the system also integrates RabbitMQ for message queuing and supports retry logic for failed notifications.

## 📌 Objective
Build a robust Notification Service capable of delivering messages across different channels (Email, SMS, In-App), with API endpoints for sending and retrieving notifications. Bonus implementations include queuing with RabbitM* and retry mechanisms for failed deliveries.

🧾 API Documentation
Interactive Swagger docs available at:
http://localhost:5000/api-docs/#/

📸 Project Demonstration
Images and flow demonstration:
👉 https://docs.google.com/document/d/1ZIEE5uxHiV8NGgsIQZU4YW_COMGNm-nI/edit?usp=sharing&ouid=107713479374932140719&rtpof=true&sd=true

🚀 Bonus Features Implemented
✅ RabbitMQ: All notifications are queued for async processing.
✅ Retry Logic: Failed messages are retried up to a certain limit.
✅ Modular Design: Easy to add support for more notification channels.

## ✅ Features
- 🔔 Send notifications via:
  - 📧 Email
  - 📱 SMS
  - 🖥️ In-App
- 🗂️ MongoDB for persistent storage of notifications and user data
- 🕊️ RabbitMQ used for asynchronous notification delivery via queues
- 🔁 Retry mechanism for failed notification attempts
- 📑 API Documentation with Swagger
- 🛠️ Clean modular structure for easy extensibility


📦 Install & Run
git clone <repo-url>
cd notification-service
npm install
npm run dev   # or use node server.js

📬 Contact
For any queries or collaboration:
Sanjana_Kumari
 📧 misssanjana385@gmail.com

## ⚙️ System Architecture
Client → Express API → MongoDB
 ↓
 RabbitMQ Queue
 ↓
 Notification Consumers (Workers)
 ↓
 Notification sent via Email/SMS/In-App

## 🧪 API Endpoints
1. Send a Notification
2. Get User Notifications
