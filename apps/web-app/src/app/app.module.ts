import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutFeatureHeaderModule } from '@app/app-layout/feature-header';
import { AppLayoutFeatureSidebarModule } from '@app/app-layout/feature-sidebar';
import { CoreDomainModule } from '@app/core/domain';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { AppRoutingModule } from './app-routing.module';
import { AppRootComponent } from './components/app-root/app-root.component';

const appModules = [
  CoreDomainModule,
  AppLayoutFeatureHeaderModule,
  AppLayoutFeatureSidebarModule,
];
const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...sharedModules,
    ...appModules,
    AppRoutingModule,
  ],
  declarations: [AppRootComponent],
  bootstrap: [AppRootComponent],
  providers: [],
})
export class AppModule {}
