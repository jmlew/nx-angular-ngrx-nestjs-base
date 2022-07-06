import { Observable, map } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DynamicformFacade,
  FormConfigs,
  FormControl,
} from '@app/shared/dynamicform/domain';

@Component({
  selector: 'app-dynamicform-generator',
  templateUrl: './dynamicform-generator.component.html',
  styleUrls: ['./dynamicform-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicformGeneratorComponent {
  // Loaded via initialisation logic in main app shell.
  formControls$: Observable<FormControl[]> = this.dynamicformFacade.formControls$;

  constructor(private dynamicformFacade: DynamicformFacade) {}
}
