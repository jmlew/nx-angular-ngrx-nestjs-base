import { NgModule } from '@angular/core';
import { SharedDynamicformDomainModule } from '@app/shared/dynamicform/domain';
import { SharedDynamicformFeatureFormGeneratorModule } from '@app/shared/dynamicform/feature-form-generator';

// Modules to expose to other domains.
const exposedDomainModules = [
  SharedDynamicformDomainModule,
  SharedDynamicformFeatureFormGeneratorModule,
];

@NgModule({
  imports: [...exposedDomainModules],
  exports: [...exposedDomainModules],
})
export class SharedDynamicformApiModule {}
