import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { httpInterceptorProviders } from './infrastructure/interceptors';
import { environment } from '@app/shared/environments';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootMetaReducers, rootReducers, rootRuntimeChecks } from './+state';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ROUTER_FEATURE_KEY } from '@app/shared/navigation/domain';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducers, {
      metaReducers: rootMetaReducers,
      runtimeChecks: rootRuntimeChecks,
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      stateKey: ROUTER_FEATURE_KEY,
      // serializer: CustomRouteSerializer,
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
