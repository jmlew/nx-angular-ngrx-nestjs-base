import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';
import { SharedDynamicformDomainModule } from '@app/shared/dynamicform/domain';

import { DynamicformControlComponent } from './dynamicform-control/dynamicform-control.component';
import { DynamicformErrorSelectComponent } from './dynamicform-error-select/dynamicform-error-select.component';
import { DynamicformErrorTextfieldComponent } from './dynamicform-error-textfield/dynamicform-error-textfield.component';
import { DynamicformGeneratorComponent } from './dynamicform-generator/dynamicform-generator.component';
import { FormControlService } from './form-control.service';

const sharedModules = [SharedExternalLibrariesModule];
const domainModules = [SharedDynamicformDomainModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...sharedModules,
    ...domainModules,
  ],
  declarations: [
    DynamicformGeneratorComponent,
    DynamicformControlComponent,
    DynamicformErrorTextfieldComponent,
    DynamicformErrorSelectComponent,
  ],
  exports: [DynamicformGeneratorComponent],
  providers: [FormControlService],
})
export class SharedDynamicformFeatureFormGeneratorModule {}
