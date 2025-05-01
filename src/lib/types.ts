
export interface User {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

export interface Vote {
  id: string;
  optionId: string;
  userId: string;
  createdAt: string;
}

export interface VoteOption {
  _id: string;
  name: string;
  isCustom?: boolean;
  isPick?: boolean;
  votes?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
