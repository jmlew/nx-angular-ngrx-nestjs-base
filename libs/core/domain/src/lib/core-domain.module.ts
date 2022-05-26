import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { httpInterceptorProviders } from './infrastructure/interceptors';
import { environment } from '@app/shared/environments';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(
      { router: routerReducer },
      {
        metaReducers: environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
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
