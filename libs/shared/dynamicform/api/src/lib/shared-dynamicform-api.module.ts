import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicformFeatureFormGeneratorModule } from '@example-app/shared/dynamicform/feature-form-generator';

const exportedModules = [DynamicformFeatureFormGeneratorModule];

@NgModule({
  imports: [CommonModule, ...exportedModules],
  exports: [CommonModule, ...exportedModules],
})
export class SharedDynamicformApiModule {}
