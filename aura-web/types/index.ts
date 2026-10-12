export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  distance: string;
  photos: string[];
  interests: string[];
  verified?: boolean;
  mockMutualLike?: boolean; // For triggering instant match celebration
}

export interface MatchItem {
  id: string;
  matchedUserId: string;
  user: UserProfile;
  createdAt: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  unread: boolean;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface SwipeState {
  dailyLimit: number;
  swipesRemaining: number;
  swipesUsedToday: number;
  rewardedSwipesEarned: number;
  lastResetTimestamp: number;
}
