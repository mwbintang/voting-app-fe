
export interface User {
  id: string;
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
  id: string;
  name: string;
  count: number;
  isCustom?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
