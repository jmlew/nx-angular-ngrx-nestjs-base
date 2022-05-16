interface UserDbItem {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserParams {
  name: string;
  email: string;
}

export interface User extends UserParams, UserDbItem {}

export interface CreateUserResponse extends User {
  createdAt: string;
}

export interface UpdateUserResponse extends User {
  updatedAt: string;
}

export interface GetUsersResponse {
  data: User[];
}

export interface GetUserResponse {
  data: User;
}
