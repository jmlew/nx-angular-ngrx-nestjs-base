import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { httpInterceptorProviders } from './infrastructure/interceptors';
import { environment } from '@app/shared/environments';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootMetaReducers, rootReducers, rootRuntimeChecks } from './+state';
import {
  DefaultRouterStateSerializer,
  NavigationActionTiming,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { ROUTER_FEATURE_KEY } from '@app/shared/navigation/domain';
import { NxModule } from '@nrwl/angular';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NxModule.forRoot(),
    StoreModule.forRoot(rootReducers, {
      metaReducers: rootMetaReducers,
      runtimeChecks: rootRuntimeChecks,
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_FEATURE_KEY,
      // Ensures the router navigation action fires after route resolvers and guard are
      // executed.
      navigationActionTiming: NavigationActionTiming.PostActivation,

      // Important: the default serialiser must be used for the @nrwl/angular navigation
      // library to respond to routing.
      serializer: DefaultRouterStateSerializer,
    }),
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
