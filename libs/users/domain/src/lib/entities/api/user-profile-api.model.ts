/**
 * HTTP API Interfaces which are imported to both Angular and NestJS as the common
 * interfaces for a given domain model. This ensures imports to NestJS through the main
 * index.ts barrel file excludes entities which import Angular dependancies. See
 * https://github.com/nrwl/nx/issues/9738.
 */

import { UserProfile, UserProfileParams } from '../user-profile.model';
export { UserProfile, UserProfileParams };

export interface WriteUserProfileResponse {
  userId: string;
  status: string; // To be converted into an ID referencing the Messages API map.
}

export interface WriteUserProfileFailedResponse {
  userId: string;
  errorMessages: string[];
}
