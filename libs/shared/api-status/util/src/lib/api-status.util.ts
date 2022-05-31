import { ApiStatus } from './api-status.enum';
import { ApiRequestState } from './api-status.model';

export function onApiStateInit<T extends ApiRequestState>(state: T): T {
  return {
    ...state,
    ...getApiInitState(),
  };
}

export function onApiStatePending<T extends ApiRequestState>(state: T): T {
  return {
    ...state,
    ...getApiPendingState(),
  };
}

export function onApiStateSuccess<T extends ApiRequestState>(state: T): T {
  return {
    ...state,
    ...getApiSuccessState(),
  };
}

export function onApiStateFailed<T extends ApiRequestState>(state: T, error: string): T {
  return {
    ...state,
    ...getApiFailedState(error),
  };
}

export function getApiInitState(): ApiRequestState {
  return {
    status: ApiStatus.Idle,
    error: null,
  };
}

export function getApiPendingState(): ApiRequestState {
  return {
    status: ApiStatus.Pending,
    error: null,
  };
}

export function getApiSuccessState(): ApiRequestState {
  return {
    status: ApiStatus.Succeeded,
    error: null,
  };
}

export function getApiFailedState(error: string): ApiRequestState {
  return {
    status: ApiStatus.Failed,
    error,
  };
}

export function getApiRequestState<T extends ApiRequestState>(state: T): ApiRequestState {
  const { status, error } = state;
  return { status, error };
}

export function getApiRequestStatus<T extends ApiRequestState>(state: T): ApiStatus {
  return state.status;
}

export function getApiRequestError<T extends ApiRequestState>(state: T): string | null {
  return state.error;
}

export function isApiStatusIdle<T extends ApiRequestState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Idle;
}

export function isApiStatusPending<T extends ApiRequestState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Pending;
}

export function isApiStatusSucceeded<T extends ApiRequestState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Succeeded;
}

export function isApiStatusFailed<T extends ApiRequestState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Failed;
}
