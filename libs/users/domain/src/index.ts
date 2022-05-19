export * from './lib/users-domain.module';

/* NgRX: Only export actions and facade. */
export * from './lib/+state/users/users.facade';
export * from './lib/+state/users/users.actions';

/* Domain: only export models and facades along with the module. */

export * from './lib/application/manage-user-profiles.facade';
export * from './lib/entities/user.model';
