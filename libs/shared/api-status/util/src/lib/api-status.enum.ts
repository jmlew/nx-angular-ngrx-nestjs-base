/**
 * State flags to provide progress status.
 */
export enum ApiStatus {
  Idle = 'Idle', // Process not started yet.
  Pending = 'Pending',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}
