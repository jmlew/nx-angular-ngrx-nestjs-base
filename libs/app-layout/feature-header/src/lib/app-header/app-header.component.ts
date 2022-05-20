import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { IconMat } from '@app/shared/ui-common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  IconMat = IconMat;
  isAuth = false;
  @Output() menuToggle = new EventEmitter<void>();

  onClickAuth() {
    this.isAuth = !this.isAuth;
  }

  onClickMenu() {
    this.menuToggle.emit();
  }
}
