import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicformFacade, FormConfig } from '@app/shared/dynamicform/domain';

@Component({
  selector: 'app-dynamicform-generator',
  templateUrl: './dynamicform-generator.component.html',
  styleUrls: ['./dynamicform-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicformGeneratorComponent {
  // Loaded via initialisation logic in main app shell.
  formConfigList$: Observable<FormConfig[]> = this.dynamicformFacade.formConfigList$;

  constructor(private dynamicformFacade: DynamicformFacade) {}
}
