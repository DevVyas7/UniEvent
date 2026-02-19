export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'manager' | 'admin';
};

export type Event = {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  price: number;
  managerId: string;
  category: string;
};
