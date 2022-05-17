import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreDomainModule } from '@example-app/core/domain';
import { UsersFeatureManageModule } from '@example-app/users/feature-manage';

import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, CoreDomainModule, UsersFeatureManageModule],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
