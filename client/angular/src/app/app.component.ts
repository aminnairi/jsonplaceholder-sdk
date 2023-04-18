import { Component, OnInit } from '@angular/core';
import { JsonPlaceholderUsersService } from '@jsonplaceholder-sdk/angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public constructor(public readonly jsonPlaceholderUsersService: JsonPlaceholderUsersService) { }

  public ngOnInit(): void {
    this.jsonPlaceholderUsersService.fetchUsers();
  }
}
