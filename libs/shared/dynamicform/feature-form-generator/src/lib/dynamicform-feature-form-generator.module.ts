import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicformDomainModule } from '@app/shared/dynamicform/domain';

import { DynamicformGeneratorComponent } from './dynamicform-generator/dynamicform-generator.component';

// const sharedModules = [];
const domainModules = [DynamicformDomainModule];

@NgModule({
  imports: [CommonModule, ...domainModules],
  declarations: [DynamicformGeneratorComponent],
  exports: [DynamicformGeneratorComponent],
})
export class DynamicformFeatureFormGeneratorModule {}
