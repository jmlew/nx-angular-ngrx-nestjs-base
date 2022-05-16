import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicformFacade } from '@example-app/shared/dynamicform/domain';

@Component({
  selector: 'dynamicform-generator',
  templateUrl: './dynamicform-generator.component.html',
  styleUrls: ['./dynamicform-generator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicformGeneratorComponent implements OnInit {
  formConfigList$ = this.dynamicformFacade.formConfigList$;

  constructor(private dynamicformFacade: DynamicformFacade) {}

  ngOnInit() {
    this.loadFormConfigs();
  }

  loadFormConfigs(): void {
    this.dynamicformFacade.loadConfigs();
  }
}
