import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IconMat } from '@app/shared/ui-common';

@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderLayoutComponent {
  IconMat = IconMat;
  @Input() isAuth: boolean;
  @Output() menuClick = new EventEmitter<void>();
  @Output() authClick = new EventEmitter<void>();
}
