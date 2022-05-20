import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
})
export class AppShellComponent {
  constructor(private readonly router: Router) {}

  onGoTo(path: string) {
    this.router.navigate([path]);
  }
}
