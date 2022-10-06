import { ApiStatus } from './api-status.enum';
import { ApiState } from './api-status.model';

export function onApiStateInit<T extends ApiState>(state: T): T {
  return {
    ...state,
    ...getApiInitState(),
  };
}

export function onApiStatePending<T extends ApiState>(state: T): T {
  return {
    ...state,
    ...getApiPendingState(),
  };
}

export function onApiStateSuccess<T extends ApiState>(state: T): T {
  return {
    ...state,
    ...getApiSuccessState(),
  };
}

export function onApiStateFailed<T extends ApiState>(state: T, error: string): T {
  return {
    ...state,
    ...getApiFailedState(error),
  };
}

export function getApiInitState(): ApiState {
  return {
    status: ApiStatus.Idle,
    error: null,
  };
}

export function getApiPendingState(): ApiState {
  return {
    status: ApiStatus.Pending,
    error: null,
  };
}

export function getApiSuccessState(): ApiState {
  return {
    status: ApiStatus.Succeeded,
    error: null,
  };
}

export function getApiFailedState(error: string): ApiState {
  return {
    status: ApiStatus.Failed,
    error,
  };
}

export function getApiRequestState<T extends ApiState>(state: T): ApiState {
  const { status, error } = state;
  return { status, error };
}

export function getApiRequestStatus<T extends ApiState>(state: T): ApiStatus {
  return state.status;
}

export function getApiRequestError<T extends ApiState>(state: T): string | null {
  return state.error;
}

export function isApiStatusIdle<T extends ApiState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Idle;
}

export function isApiStatusPending<T extends ApiState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Pending;
}

export function isApiStatusSucceeded<T extends ApiState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Succeeded;
}

export function isApiStatusFailed<T extends ApiState>(state: T): boolean {
  return getApiRequestStatus(state) === ApiStatus.Failed;
}
