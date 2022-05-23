import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { WorkitemDataService } from '../../infrastructure/workitem.data.service';
import * as WorkitemActions from './workitem.actions';

@Injectable()
export class WorkitemEffects {
  loadWorkitem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkitemActions.loadWorkitem),
      switchMap((action) =>
        this.workitemDataService.getAllWorkitems().pipe(
          map((workitem) => WorkitemActions.loadWorkitemSuccess({ workitem })),
          catchError((error) => of(WorkitemActions.loadWorkitemFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private workitemDataService: WorkitemDataService
  ) {}
}
