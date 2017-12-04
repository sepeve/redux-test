import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromRoot from './@redux/index';
import * as Actions from './@redux/actions';

import { User } from './entities/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  users: Observable<User[]>;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.store.dispatch(new Actions.LoadUsersAction(''));
    this.users = this.store.select(fromRoot.getUsers);  
  }
}