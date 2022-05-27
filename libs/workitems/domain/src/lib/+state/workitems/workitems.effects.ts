import { catchError, map, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { Workitem } from '../../entities/workitem.model';
import { WorkitemsDataService } from '../../infrastructure/workitems.data.service';
import * as WorkitemsActions from './workitems.actions';
import * as WorkitemsFeature from './workitems.reducer';

@Injectable()
export class WorkitemsEffects {
  loadWorkitems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkitemsActions.loadWorkitems),
      switchMap(() =>
        this.dataService.getWorkitems().pipe(
          map((workitems: Workitem[]) =>
            WorkitemsActions.loadWorkitemsSuccess({ workitems })
          ),
          catchError((error: any) => of(WorkitemsActions.loadWorkitemsFailure({ error })))
        )
      )
    );
  });

  /* loadWorkitems$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(WorkitemsActions.loadWorkitems, {
      run: (
        action: ReturnType<typeof WorkitemsActions.loadWorkitems>,
        state: WorkitemsFeature.WorkitemsPartialState
      ) => {
        this.dataService.getAllWorkitems().pipe(
          map((workitems: Workitem[]) =>
            WorkitemsActions.loadWorkitemsSuccess({ workitems })
          ),
          catchError((error: any) => of(WorkitemsActions.loadWorkitemsFailure({ error })))
        );
      },
      undoAction: (action: ReturnType<typeof WorkitemsActions.loadWorkitems>, error) => {
        console.error('Error', error);
        return WorkitemsActions.loadWorkitemsFailure({ error });
      },
    })
  ); */

  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<WorkitemsFeature.WorkitemsPartialState>,
    private readonly dataService: WorkitemsDataService
  ) {}
}
