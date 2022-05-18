import { ApiStatus } from './api-status.enum';

export interface ApiRequestState {
  status: ApiStatus;
  error: string | null;
}
