import { ApiStatus } from './api-status.enum';
import { ApiRequestState } from './api-status.model';

export function getApiStatusInit(): ApiRequestState {
  return {
    status: ApiStatus.Idle,
    error: null,
  };
}

export function onApiStatusInit<T extends ApiRequestState>(state: T): T {
  return {
    ...state,
    ...getApiStatusInit(),
  };
}

export function getApiStatusPending(): ApiRequestState {
  return {
    status: ApiStatus.Pending,
    error: null,
  };
}

export function onApiStatusPending<T extends ApiRequestState>(state: T): T {
  return {
    ...state,
    ...getApiStatusPending(),
  };
}

export function getApiStatusSuccess(): ApiRequestState {
  return {
    status: ApiStatus.Succeeded,
    error: null,
  };
}

export function onApiStatusSuccess<T extends ApiRequestState>(state: T): T {
  return {
    ...state,
    ...getApiStatusSuccess(),
  };
}

export function getApiStatusError(error: string): ApiRequestState {
  return {
    status: ApiStatus.Failed,
    error,
  };
}

export function onApiStatusError<T extends ApiRequestState>(state: T, error: string): T {
  return {
    ...state,
    ...getApiStatusError(error),
  };
}

export function getApiRequestState<T extends ApiRequestState>(state: T): ApiRequestState {
  const { status, error } = state;
  return { status, error };
}
