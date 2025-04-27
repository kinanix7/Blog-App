export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'author';
}

export interface AuthResponse {
  user: User;
  token?: string;
}