export interface UserPermissionId {
  permissionName: string; // Primary key.
}

export interface UserPermission extends UserPermissionId {
  description: string;
  permissionsComp: string[]; // componentName from ComponentRegistry
}
