/*
  Utils with a responsibility limited to normalisation of and access to properties and
  values which define the data models within a domain's entites.
*/

import { UserProfile } from './user-profile.model';

export function getUserProfileId(item: UserProfile): string {
  return item.emailId;
}
