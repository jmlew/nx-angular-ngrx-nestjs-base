import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDynamicformDomainModule } from '@app/shared/dynamicform/domain';

import { DynamicformGeneratorComponent } from './dynamicform-generator/dynamicform-generator.component';

// const sharedModules = [];
const domainModules = [SharedDynamicformDomainModule];

@NgModule({
  imports: [CommonModule, ...domainModules],
  declarations: [DynamicformGeneratorComponent],
  exports: [DynamicformGeneratorComponent],
})
export class SharedDynamicformFeatureFormGeneratorModule {}
