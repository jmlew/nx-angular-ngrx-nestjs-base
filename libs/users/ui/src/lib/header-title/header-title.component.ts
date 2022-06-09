import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconMat } from '@app/shared/ui-common';

@Component({
  selector: 'users-header-title',
  templateUrl: './header-title.component.html',
  styleUrls: ['./header-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderTitleComponent {
  readonly IconMat = IconMat;

  @Input() title: string;
  @Input() isBackButton: boolean;
  @Output() goBack: EventEmitter<void> = new EventEmitter();

  onGoBack() {
    this.goBack.emit();
  }
}
