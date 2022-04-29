import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-filters',
  templateUrl: './users-filters.component.html',
  styleUrls: ['./users-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersFiltersComponent implements OnInit {
  ngOnInit(): void {
    console.log('user filters');
  }
}
