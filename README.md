# PepSales Notification Service

## 📦 Overview
Backend notification service with Email, SMS, In-App support. Simulates queue & retries.

## 🚀 Setup Instructions

1. Clone the repo or unzip the folder.
2. Run `npm install`
3. Set up MongoDB Atlas and update `.env` with your `MONGO_URI`.
4. Start with `npm start`
5. Test APIs using Postman:

### API Endpoints

#### Create User
POST `/users`
```json
{ "name": "John", "email": "john@example.com" }
```

#### Send Notification
POST `/notifications`
```json
{ "userId": "USER_ID", "type": "email", "message": "Hello!" }
```

#### Get User Notifications
GET `/notifications/user/USER_ID`

## ✅ Bonus
- Simulated queue & retry on delivery
- Unique code logic to mimic human style

---
