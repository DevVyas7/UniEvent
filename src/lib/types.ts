export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer' | 'admin';
};

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizerId: string;
  department: string;
  category: string;
};

export type CollaborationRequest = {
  id: string;
  userId: string;
  userName: string;
  eventId: string;
  eventName: string;
  message: string;
  skillsNeeded: string[];
};
