export interface UserProfileId {
  emailId: string; // Primary key.
}

interface DbItem {
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileParams extends UserProfileId {
  userId: string; // Free text string
  userName: string; // Maps to LDAP user name.
  password: string;
  isLocked: string;
  isInactive: string;
  lastLoginDatetime: string;
  userRoles: string[]; // roleName from UserRole
}

export interface UserProfile extends UserProfileParams, DbItem {}
