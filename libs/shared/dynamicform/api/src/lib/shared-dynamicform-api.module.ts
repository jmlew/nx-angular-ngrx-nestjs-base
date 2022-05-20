import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedDynamicformFeatureFormGeneratorModule } from '@app/shared/dynamicform/feature-form-generator';

const exportedModules = [SharedDynamicformFeatureFormGeneratorModule];

@NgModule({
  imports: [CommonModule, ...exportedModules],
  exports: [CommonModule, ...exportedModules],
})
export class SharedDynamicformApiModule {}
