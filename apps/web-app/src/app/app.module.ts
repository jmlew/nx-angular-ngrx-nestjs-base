import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutFeatureHeaderModule } from '@app/app-layout/feature-header';
import { AppLayoutFeatureSidebarModule } from '@app/app-layout/feature-sidebar';
import { CoreDomainModule } from '@app/core/domain';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/app-root/app-root.component';

const sharedModules = [SharedExternalLibrariesModule];
const appModules = [AppLayoutFeatureHeaderModule, AppLayoutFeatureSidebarModule];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreDomainModule,
    AppRoutingModule,
    ...sharedModules,
    ...appModules,
  ],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  providers: [],
})
export class AppModule {}
