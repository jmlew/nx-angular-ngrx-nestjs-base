export interface UserProfileId {
  userId: string; // Free text string, editable upon user profile creation.
}

interface DbItem {
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileParams extends UserProfileId {
  userName: string;
  emailId: string;
  password: string;
}

export interface UserProfile extends UserProfileParams, DbItem {}
