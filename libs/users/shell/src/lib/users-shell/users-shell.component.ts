import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './users-shell.component.html',
  styleUrls: ['./users-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersShellComponent {}
