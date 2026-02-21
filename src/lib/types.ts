export type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'organizer' | 'admin';
  department?: string;
  enrollmentNumber?: string;
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
  isCredit: boolean;
  status?: 'upcoming' | 'completed' | 'cancelled';
};
