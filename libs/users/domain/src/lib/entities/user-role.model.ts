export interface UserRoleId {
  roleName: string; // Primary key.
}

export interface UserRole extends UserRoleId {
  description: string;
  rolePermissions: string[]; // permissionName from UserPermission
}
