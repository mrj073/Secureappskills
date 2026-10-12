import { UserProfile } from '@/types';

export const INITIAL_MOCK_PROFILES: UserProfile[] = [
  {
    id: 'user_maya',
    name: 'Maya',
    age: 24,
    bio: 'Coffee fanatic & weekend ceramicist ☕🎨 Always looking for the best soundtrack to long drives.',
    location: 'Bandra, Mumbai',
    distance: '2.4 miles away',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Ceramics', 'Specialty Coffee', 'Indie Rock', 'Film Photography'],
    verified: true,
    mockMutualLike: true, // Will trigger Match Celebration!
  },
  {
    id: 'user_arjun',
    name: 'Arjun',
    age: 27,
    bio: 'Architect by day, amateur chef by night. Looking for someone who appreciates brutalist buildings and fresh pasta.',
    location: 'Colaba, Mumbai',
    distance: '3.8 miles away',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Architecture', 'Italian Food', 'Jazz', 'Bouldering'],
    verified: true,
    mockMutualLike: false,
  },
  {
    id: 'user_tara',
    name: 'Tara',
    age: 23,
    bio: 'UI Designer & vinyl collector. If you have an album recommendation from 1978, tell me right now.',
    location: 'Khar West, Mumbai',
    distance: '1.2 miles away',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Graphic Design', 'Vinyl Records', 'Matcha', 'Cycling'],
    verified: true,
    mockMutualLike: true, // Will trigger Match Celebration!
  },
  {
    id: 'user_kabir',
    name: 'Kabir',
    age: 26,
    bio: 'Wildlife biologist & mountain enthusiast. Currently finishing my field notes and scouting trekking trails.',
    location: 'Juhu, Mumbai',
    distance: '5.1 miles away',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Trekking', 'Wildlife', 'Acoustic Guitar', 'Documentaries'],
    verified: true,
    mockMutualLike: false,
  },
  {
    id: 'user_ananya',
    name: 'Ananya',
    age: 25,
    bio: 'Book editor, museum hopper, and passionate baker. My superpower is predicting murder mystery plot twists.',
    location: 'Versova, Mumbai',
    distance: '4.0 miles away',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Books', 'Baking', 'Museums', 'Podcasts'],
    verified: true,
    mockMutualLike: true,
  },
  {
    id: 'user_rohan',
    name: 'Rohan',
    age: 28,
    bio: 'Fintech founder trying to cultivate a healthy work-life balance. Let’s grab sushi and critique design systems.',
    location: 'BKC, Mumbai',
    distance: '3.0 miles away',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    ],
    interests: ['Tech', 'Sushi', 'Scuba Diving', 'Philosophy'],
    verified: true,
    mockMutualLike: false,
  }
];

export const CURRENT_USER_MOCK: UserProfile = {
  id: 'current_user',
  name: 'Alex',
  age: 25,
  bio: 'Product builder living between code, coffee, and playlists. Looking for real chemistry.',
  location: 'Mumbai, India',
  distance: '0 miles',
  photos: [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80'
  ],
  interests: ['Coffee', 'Design', 'Electronic Music', 'Travel'],
  verified: true
};
