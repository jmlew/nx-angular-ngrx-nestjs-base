import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { SharedDynamicformDomainModule } from '@app/shared/dynamicform/domain';
import { SharedDynamicformUiModule } from '@app/shared/dynamicform/ui';

import { DynamicformGeneratorComponent } from './dynamicform-generator/dynamicform-generator.component';
import { DynamicformService } from './dynamicform.service';

const sharedModules = [SharedExternalLibrariesModule];
const domainModules = [SharedDynamicformDomainModule, SharedDynamicformUiModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...sharedModules,
    ...domainModules,
  ],
  declarations: [DynamicformGeneratorComponent],
  exports: [DynamicformGeneratorComponent],
  providers: [DynamicformService],
})
export class SharedDynamicformFeatureFormGeneratorModule {}
