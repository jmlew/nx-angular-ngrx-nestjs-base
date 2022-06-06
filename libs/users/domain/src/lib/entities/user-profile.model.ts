export interface UserProfileId {
  userId: string; // Free text string, editable upon user profile creation.
}

interface DbItem {
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileParams extends UserProfileId {
  userName: string; // Maps to LDAP user name.
  emailId: string;
  password: string;
  isLocked: string;
  isInactive: string;
  lastLoginDatetime: string;
  userRoles: string[]; // roleName from UserRole
}

export interface UserProfile extends UserProfileParams, DbItem {}
