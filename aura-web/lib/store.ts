'use client';

import { useState, useEffect } from 'react';
import { UserProfile, MatchItem, ChatMessage, SwipeState } from '@/types';
import { INITIAL_MOCK_PROFILES, CURRENT_USER_MOCK } from '@/data/mockProfiles';
import { APP_CONFIG } from './config';

const STORAGE_KEYS = {
  SWIPES: 'aura_swipe_state',
  MATCHES: 'aura_matches',
  PROFILES: 'aura_profiles',
  MESSAGES: 'aura_messages',
  CURRENT_USER: 'aura_current_user',
  BLOCKED: 'aura_blocked_users',
};

export function useAuraStore() {
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER_MOCK);
  const [profiles, setProfiles] = useState<UserProfile[]>(INITIAL_MOCK_PROFILES);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({});
  const [blockedUserIds, setBlockedUserIds] = useState<string[]>([]);
  
  const [swipeState, setSwipeState] = useState<SwipeState>({
    dailyLimit: APP_CONFIG.DAILY_FREE_SWIPES,
    swipesRemaining: APP_CONFIG.DAILY_FREE_SWIPES,
    swipesUsedToday: 0,
    rewardedSwipesEarned: 0,
    lastResetTimestamp: 0,
  });

  const [activeMatchCelebration, setActiveMatchCelebration] = useState<UserProfile | null>(null);
  const [isAdModalOpen, setIsAdModalOpen] = useState<boolean>(false);
  const [adSuccessModal, setAdSuccessModal] = useState<boolean>(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const savedSwipes = localStorage.getItem(STORAGE_KEYS.SWIPES);
      if (savedSwipes) setSwipeState(JSON.parse(savedSwipes));

      const savedMatches = localStorage.getItem(STORAGE_KEYS.MATCHES);
      if (savedMatches) setMatches(JSON.parse(savedMatches));

      const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedBlocked = localStorage.getItem(STORAGE_KEYS.BLOCKED);
      if (savedBlocked) setBlockedUserIds(JSON.parse(savedBlocked));

      const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      if (savedMessages) setMessages(JSON.parse(savedMessages));
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Save changes
  const saveSwipeState = (newState: SwipeState) => {
    setSwipeState(newState);
    try {
      localStorage.setItem(STORAGE_KEYS.SWIPES, JSON.stringify(newState));
    } catch {}
  };

  // Commit a Swipe Action (Left: Pass, Right: Like)
  const commitSwipe = (action: 'like' | 'pass'): { success: boolean; isMatch: boolean; reachedLimit: boolean } => {
    if (swipeState.swipesRemaining <= 0) {
      return { success: false, isMatch: false, reachedLimit: true };
    }

    const currentProfile = profiles[currentIndex];
    if (!currentProfile) {
      return { success: false, isMatch: false, reachedLimit: false };
    }

    // Decrement swipe counter immediately
    const newRemaining = swipeState.swipesRemaining - 1;
    const newUsed = swipeState.swipesUsedToday + 1;
    const updatedState: SwipeState = {
      ...swipeState,
      swipesRemaining: newRemaining,
      swipesUsedToday: newUsed,
    };
    saveSwipeState(updatedState);

    let isMatch = false;
    if (action === 'like' && currentProfile.mockMutualLike) {
      isMatch = true;
      // Create new match record
      const newMatch: MatchItem = {
        id: `match_${currentProfile.id}`,
        matchedUserId: currentProfile.id,
        user: currentProfile,
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        lastMessage: 'You connected on Aura! Say hello 👋',
        lastMessageTimestamp: 'Just now',
        unread: true,
      };

      const updatedMatches = [newMatch, ...matches.filter(m => m.matchedUserId !== currentProfile.id)];
      setMatches(updatedMatches);
      try {
        localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(updatedMatches));
      } catch {}

      setActiveMatchCelebration(currentProfile);
    }

    // Move to next card
    setCurrentIndex(prev => prev + 1);

    return {
      success: true,
      isMatch,
      reachedLimit: newRemaining <= 0
    };
  };

  // Grant Rewarded Ad Swipes
  const grantRewardedSwipes = (amount: number) => {
    const updatedState: SwipeState = {
      ...swipeState,
      swipesRemaining: swipeState.swipesRemaining + amount,
      rewardedSwipesEarned: swipeState.rewardedSwipesEarned + amount,
    };
    saveSwipeState(updatedState);
    setAdSuccessModal(true);
  };

  // Send a message in chat
  const sendMessage = (matchId: string, text: string) => {
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      matchId,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    const currentChat = messages[matchId] || [];
    const updatedChat = [...currentChat, newMsg];
    const updatedMessages = { ...messages, [matchId]: updatedChat };
    setMessages(updatedMessages);

    // Update match last message
    const updatedMatches = matches.map(m => {
      if (m.id === matchId) {
        return {
          ...m,
          lastMessage: text,
          lastMessageTimestamp: 'Just now',
          unread: false,
        };
      }
      return m;
    });
    setMatches(updatedMatches);

    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updatedMessages));
      localStorage.setItem(STORAGE_KEYS.MATCHES, JSON.stringify(updatedMatches));
    } catch {}

    // Simulated auto-reply from matched partner after 1.5 seconds!
    setTimeout(() => {
      const match = matches.find(m => m.id === matchId);
      const replyName = match ? match.user.name : 'Match';
      const autoReply: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        matchId,
        senderId: match ? match.matchedUserId : 'partner',
        text: `Hey! Thanks for messaging. Free dating on Aura feels so refreshing 😊`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };
      setMessages(prev => {
        const nextList = [...(prev[matchId] || []), autoReply];
        const nextMap = { ...prev, [matchId]: nextList };
        try { localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(nextMap)); } catch {}
        return nextMap;
      });
    }, 1500);
  };

  // Block User
  const blockUser = (userId: string) => {
    const updatedBlocked = [...blockedUserIds, userId];
    setBlockedUserIds(updatedBlocked);
    // Remove from active matches and profiles
    setMatches(prev => prev.filter(m => m.matchedUserId !== userId));
    try {
      localStorage.setItem(STORAGE_KEYS.BLOCKED, JSON.stringify(updatedBlocked));
    } catch {}
  };

  // Update Profile
  const updateProfile = (updated: Partial<UserProfile>) => {
    const newUser = { ...currentUser, ...updated };
    setCurrentUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    } catch {}
  };

  // Filter out blocked users from active profiles
  const visibleProfiles = profiles
    .filter(p => !blockedUserIds.includes(p.id))
    .slice(currentIndex);

  return {
    currentUser,
    visibleProfiles,
    currentProfile: visibleProfiles[0] || null,
    totalRemainingCards: visibleProfiles.length,
    matches,
    messages,
    swipeState,
    commitSwipe,
    grantRewardedSwipes,
    sendMessage,
    blockUser,
    updateProfile,
    activeMatchCelebration,
    setActiveMatchCelebration,
    isAdModalOpen,
    setIsAdModalOpen,
    adSuccessModal,
    setAdSuccessModal,
  };
}
