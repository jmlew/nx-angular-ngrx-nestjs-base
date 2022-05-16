export interface UserDbItem {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserParams {
  name: string;
  email: string;
}

export interface User extends UserParams, UserDbItem {}
