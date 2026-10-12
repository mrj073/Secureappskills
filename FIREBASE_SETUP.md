# FIREBASE_SETUP.md — Aura Database Schema & Security Architecture

## 1. Cloud Firestore Data Schema

### Collection: `users/{userId}`
User identity and authentication metadata.
```json
{
  "userId": "string (uid)",
  "email": "string | null",
  "phoneNumber": "string | null",
  "createdAt": "timestamp",
  "lastActiveAt": "timestamp",
  "isBanned": "boolean",
  "accountStatus": "active | paused | deleted"
}
```

### Collection: `profiles/{userId}`
Publicly visible dating profile data.
```json
{
  "userId": "string",
  "displayName": "string",
  "birthDate": "timestamp",
  "age": "number (calculated)",
  "gender": "man | woman | nonbinary",
  "interestedIn": ["man", "woman", "everyone"],
  "bio": "string",
  "interests": ["music", "hiking", "photography", "coffee"],
  "photos": [
    {
      "id": "photo_1",
      "url": "https://storage.googleapis.com/...",
      "isPrimary": true,
      "order": 0
    }
  ],
  "location": {
    "city": "Mumbai",
    "coordinates": "GeoPoint(19.0760, 72.8777)"
  },
  "maxDistanceKm": 50,
  "ageRangePreference": { "min": 21, "max": 32 },
  "updatedAt": "timestamp"
}
```

### Collection: `swipeUsage/{userId}`
**Critical Collection: Tamper-proof daily limit and reward ledger.**
```json
{
  "userId": "string",
  "currentDateKey": "YYYY-MM-DD",
  "dailyLimit": 25,
  "dailySwipesUsed": 18,
  "rewardedSwipesGranted": 0,
  "lastResetAt": "timestamp",
  "adRewardsClaimedToday": 0,
  "updatedAt": "timestamp"
}
```

### Collection: `likes/{likeId}`
Format: `{fromUserId}_{toUserId}`
```json
{
  "fromUserId": "string",
  "toUserId": "string",
  "createdAt": "timestamp"
}
```

### Collection: `passes/{passId}`
Format: `{fromUserId}_{toUserId}`
```json
{
  "fromUserId": "string",
  "toUserId": "string",
  "createdAt": "timestamp"
}
```

### Collection: `matches/{matchId}`
Format: Canonical sorted IDs e.g. `{userIdA}_{userIdB}`
```json
{
  "matchId": "string",
  "users": ["uid_1", "uid_2"],
  "createdAt": "timestamp",
  "lastMessageText": "string",
  "lastMessageTimestamp": "timestamp",
  "lastMessageSenderId": "string",
  "unreadCount": {
    "uid_1": 0,
    "uid_2": 1
  }
}
```

### Subcollection: `matches/{matchId}/messages/{messageId}`
```json
{
  "messageId": "string",
  "senderId": "string",
  "recipientId": "string",
  "content": "Hey there! Love your travel photos.",
  "type": "text | photo",
  "status": "sent | delivered | read",
  "createdAt": "timestamp"
}
```

### Collection: `blocks/{blockId}`
Format: `{blockerId}_{blockedId}`
```json
{
  "blockerId": "string",
  "blockedId": "string",
  "createdAt": "timestamp"
}
```

### Collection: `reports/{reportId}`
```json
{
  "reportId": "string",
  "reporterId": "string",
  "reportedUserId": "string",
  "reason": "Fake profile | Spam | Harassment | Inappropriate content | Other",
  "notes": "string",
  "status": "pending_review | resolved",
  "createdAt": "timestamp"
}
```

---

## 2. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
    }

    // Profiles collection
    match /profiles/{userId} {
      allow read: if isAuthenticated();
      allow write: if isOwner(userId);
    }

    // Swipe Usage: Strictly READ-ONLY for users!
    // Writes must ONLY happen via server functions/Admin SDK
    match /swipeUsage/{userId} {
      allow read: if isOwner(userId);
      allow write: if false; // Deny direct client mutation
    }

    // Likes & Passes
    match /likes/{likeId} {
      allow read: if isAuthenticated() && (request.auth.uid == resource.data.fromUserId);
      allow create: if isAuthenticated() && request.auth.uid == request.resource.data.fromUserId;
      allow update, delete: if false;
    }

    match /passes/{passId} {
      allow read: if isAuthenticated() && (request.auth.uid == resource.data.fromUserId);
      allow create: if isAuthenticated() && request.auth.uid == request.resource.data.fromUserId;
      allow update, delete: if false;
    }

    // Matches
    match /matches/{matchId} {
      allow read: if isAuthenticated() && request.auth.uid in resource.data.users;
      allow write: if false; // Created via atomic server function
      
      // Messages inside matches
      match /messages/{messageId} {
        allow read: if isAuthenticated() && request.auth.uid in get(/databases/$(database)/documents/matches/$(matchId)).data.users;
        allow create: if isAuthenticated() 
          && request.auth.uid in get(/databases/$(database)/documents/matches/$(matchId)).data.users
          && request.resource.data.senderId == request.auth.uid;
      }
    }

    // Blocks & Reports
    match /blocks/{blockId} {
      allow read, create: if isAuthenticated() && request.auth.uid == request.resource.data.blockerId;
    }

    match /reports/{reportId} {
      allow create: if isAuthenticated() && request.auth.uid == request.resource.data.reporterId;
      allow read, update, delete: if false; // Only admins can read/process reports
    }
  }
}
```

---

## 3. Firebase Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/photos/{photoId} {
      // Anyone logged in can view public dating photos
      allow read: if request.auth != null;
      // Only owner can upload, under 5MB and image types only
      allow write: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```
