import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreDomainModule } from '@app/core/domain';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component/app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreDomainModule,
    // App root routing. Ensure this is last.
    AppRoutingModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule {}
