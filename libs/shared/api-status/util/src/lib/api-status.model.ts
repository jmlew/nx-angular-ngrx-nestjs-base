import { ApiStatus } from './api-status.enum';

export interface ApiState {
  status: ApiStatus;
  error: string | null;
}
