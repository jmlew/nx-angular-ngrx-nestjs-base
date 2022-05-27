import { createAction, props } from '@ngrx/store';

import { UserProfile } from '../../entities/user-profile.model';

export const loadUserProfiles = createAction('[UserProfiles/API] Load UserProfiles');

export const loadUserProfilesSuccess = createAction(
  '[UserProfiles/API] Load UserProfiles Success',
  props<{ profiles: UserProfile[] }>()
);

export const loadUserProfilesFailure = createAction(
  '[UserProfiles/API] Load UserProfiles Failure',
  props<{ error: any }>()
);
