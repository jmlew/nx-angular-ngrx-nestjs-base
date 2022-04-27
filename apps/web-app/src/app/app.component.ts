import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@example-app/api-interfaces';

@Component({
  selector: 'example-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello').pipe(map((message) => message.message));
  constructor(private http: HttpClient) {}
}
