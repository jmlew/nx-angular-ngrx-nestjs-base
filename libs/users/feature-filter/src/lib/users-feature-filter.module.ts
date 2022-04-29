import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersFiltersComponent } from './users-filters/users-filters.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UsersFiltersComponent],
  exports: [UsersFiltersComponent],
})
export class UsersFeatureFilterModule {}
