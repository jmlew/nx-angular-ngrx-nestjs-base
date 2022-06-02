export interface UserProfileId {
  userId: string; // Free text string, editable upon user profiule creation.
}

interface DbItem {
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfileParams extends UserProfileId {
  emailId: string; // Primary key.
  userName: string; // Maps to LDAP user name.
  password: string;
  isLocked: string;
  isInactive: string;
  lastLoginDatetime: string;
  userRoles: string[]; // roleName from UserRole
}

export interface UserProfile extends UserProfileParams, DbItem {}
