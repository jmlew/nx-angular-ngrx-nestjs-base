import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedExternalLibrariesModule } from '@app/shared-external-libraries';

import { DynamicformControlComponent } from './dynamicform-control/dynamicform-control.component';
import { DynamicformErrorSelectComponent } from './dynamicform-error-select/dynamicform-error-select.component';
import { DynamicformErrorTextfieldComponent } from './dynamicform-error-textfield/dynamicform-error-textfield.component';

const sharedModules = [SharedExternalLibrariesModule];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...sharedModules],
  declarations: [
    DynamicformControlComponent,
    DynamicformErrorTextfieldComponent,
    DynamicformErrorSelectComponent,
  ],
  exports: [
    DynamicformControlComponent,
    DynamicformErrorTextfieldComponent,
    DynamicformErrorSelectComponent,
  ],
})
export class SharedDynamicformUiModule {}
