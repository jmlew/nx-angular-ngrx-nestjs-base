import { Observable, Subject, filter, takeUntil, tap } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiRequestState, ApiStatus } from '@app/shared/api-status/util';
import {
  ManageUserProfilesFacade,
  UserProfile,
  getUserProfileId,
} from '@app/users/domain';

@Component({
  selector: 'users-manage-profiles',
  templateUrl: './users-manage-profiles.component.html',
  styleUrls: ['./users-manage-profiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersManageProfilesComponent implements OnInit, OnDestroy {
  readonly ApiStatus = ApiStatus;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  readonly userProfiles$: Observable<UserProfile[]> =
    this.userProfilesFacade.userProfiles$;
  readonly userProfilesRequestState$: Observable<ApiRequestState> =
    this.userProfilesFacade.userProfilesRequestState$;
  readonly selectAllUserProfilesLoadded$: Observable<boolean> =
    this.userProfilesFacade.selectAllUserProfilesLoadded$;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userProfilesFacade: ManageUserProfilesFacade
  ) {}

  ngOnInit() {
    // TODO: move loading entities into Effect using navigation state.
    this.selectAllUserProfilesLoadded$
      .pipe(
        filter((allLoaded: boolean) => allLoaded !== true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.loadUsers();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onEdit(item: UserProfile) {
    const id: string = getUserProfileId(item);
    this.router.navigate([id], { relativeTo: this.route });
  }

  onRemove(item: UserProfile) {
    const id: string = getUserProfileId(item);
    console.log('Remove User Profile', id);
  }

  // TODO: move to router state handler and validate persistent state before API call.
  loadUsers(): void {
    this.userProfilesFacade.loadUserProfiles();
  }
}
