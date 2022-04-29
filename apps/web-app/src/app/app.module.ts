import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UsersFeatureManageModule } from '@example-app/users/feature-manage';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, UsersFeatureManageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
