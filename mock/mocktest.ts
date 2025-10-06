import { User } from "../types/types";

export const mockAuth = {
  currentUser: null as User | null,
  login: (email: string, password: string) => {
    mockAuth.currentUser = { id: 'user123', email, credits: 50 };
    return Promise.resolve(mockAuth.currentUser);
  },
  signup: (email: string, password: string) => {
    mockAuth.currentUser = { id: 'user123', email, credits: 50 };
    return Promise.resolve(mockAuth.currentUser);
  },
  logout: () => {
    mockAuth.currentUser = null;
  }
};