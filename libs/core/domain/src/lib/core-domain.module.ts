import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { httpInterceptorProviders } from './infrastructure/interceptors';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    /*
    TODO: Add core NgRX.
    StoreModule.forRoot(fromStore.reducers, {
      metaReducers: fromStore.metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot(fromStore.effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }), */
  ],
  exports: [HttpClientModule],
  providers: [httpInterceptorProviders],
})
export class CoreDomainModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreDomainModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreDomainModule is already imported. Import into AppModule only.'
      );
    }
  }
}
