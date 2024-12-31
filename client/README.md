# VirtuMate Virtual Event Platform

## Project Overview

VirtuMate is a virtual event platform designed to facilitate seamless networking, interactive sessions, and event organization. It features user matchmaking, private chat, video calls, and event scheduling to deliver a highly engaging experience.

## Detailed Project Flow

### 1. User Roles

Define three key user roles:

- **Attendee**:
    - Can register for events, join live sessions, interact with others, and use networking features.
- **Organizer**:
    - Creates events, manages exhibitors and sessions, and oversees platform activity.
- **Admin**:
    - Manages user roles, moderates content, and oversees platform performance.

### 2. User Journey

#### a. Registration & Login

- **New Users**:
    - Register via email, Google, or social media using Firebase Authentication or a custom Node.js/Express-based service.
    - Fill in a profile with personal details and networking interests.
- **Returning Users**:
    - Login with credentials or Single Sign-On (SSO).
    - Redirected to a personalized dashboard.

#### b. Dashboard

- **Features**:
    - Upcoming events.
    - Personalized matchmaking suggestions (based on interests).
    - Notifications for scheduled events and messages.
- **Actions**:
    - View or register for events.
    - Join networking lounges or chat with matched users.

#### c. Event Management

- **Event List**:
    - Display active and upcoming events with detailed descriptions.
- **Event Page**:
    - Show event schedule, live sessions, exhibitor booths, and networking lounges.
- **Live Sessions**:
    - Video streaming for sessions (using WebRTC or third-party services like Jitsi or Zoom).
    - Integrated Q&A and polls.

#### d. Networking

- **Matchmaking**:
    - Display suggested attendees with common interests.
    - Allow users to send connection requests or initiate private chats.
- **Chat**:
    - Enable real-time text and media sharing using Socket.IO or Firebase Realtime Database.
- **Video Calls**:
    - Use WebRTC for direct peer-to-peer video calls with signaling managed by Node.js.

#### e. Notifications & Reminders

- **Event reminders**:
    - Notify users about upcoming events and sessions via in-app notifications or email (using Node.js or Firebase Cloud Messaging).
- **Chat alerts**:
    - Real-time updates for new messages.

### 3. Admin Panel

- **User Management**:
    - Approve/reject event organizers.
    - Suspend or remove users for inappropriate behavior.
- **Event Moderation**:
    - Review and manage events created by organizers.
- **Analytics**:
    - Track user activity, session attendance, and platform performance.

### 4. Backend Architecture

**Tech Stack**:

- Frontend: React.js
- Backend: Node.js with Express.js
- Database: Firebase (or MongoDB if advanced querying is needed)
- Real-Time Communication: WebRTC and Socket.IO

**Core API Endpoints (Node.js with Express)**:

- **Authentication**:
    - `/register` (POST): Register a new user.
    - `/login` (POST): Authenticate a user.
- **User Profiles**:
    - `/users/:id` (GET): Fetch user profile.
    - `/users/:id` (PATCH): Update profile.
- **Events**:
    - `/events` (GET): Fetch events.
    - `/events/:id` (GET): Fetch a specific event.
    - `/events` (POST): Create a new event (organizer-only).
- **Chat**:
    - `/chat/:conversationId` (GET): Fetch chat history.
    - `/chat` (POST): Send a message.
- **Matchmaking**:
    - `/matchmaking` (GET): Fetch suggested matches for a user.

### 5. Real-Time Communication

**WebRTC**:

- Used for video calls. The signaling server will be managed using Node.js and Socket.IO.

**Socket.IO**:

- Handles:
    - Real-time messaging.
    - Notifications (e.g., event updates or connection requests).

### 6. Event Scheduling

**Event Scheduling API**:

- Enable organizers to schedule sessions with start/end times.
- Store event details in the database.

**Reminders**:

- Use cron jobs (Node.js) or Firebase Scheduled Functions to send reminders.

### 7. Database Design

**Firebase Example (if using Firestore)**:

- `users`
    - `userId`
        - `name`
        - `email`
        - `interests`
        - `connections`
- `events`
    - `eventId`
        - `name`
        - `organizerId`
        - `schedule`
- `messages`
    - `conversationId`
        - `messageId`
        - `senderId`
        - `text`
        - `timestamp`

**MongoDB Example**:

Collections: `users`, `events`, `messages`

- **Users Schema**:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "interests": ["AI", "Networking"],
    "connections": ["userId1", "userId2"]
}
```

- **Events Schema**:

```json
{
    "name": "Tech Conference 2024",
    "organizer": "userId1",
    "schedule": {
        "start": "2024-01-01T10:00:00Z",
        "end": "2024-01-01T18:00:00Z"
    }
}
```

### 8. Deployment

- **Frontend**:
    - Host React.js on Vercel or Netlify.
- **Backend**:
    - Deploy Node.js with Express on AWS, Heroku, or Render.
- **Database**:
    - Firebase Firestore (fully managed) or MongoDB Atlas.