import { Injectable, Inject } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

import * as userActions from './actions';
import { UserService } from '../services/user.service';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions, private userService: UserService) { }

    @Effect()
    load$: Observable<Action> = this.actions$
        .ofType(userActions.LOAD)
        .map((action: userActions.LoadUsersAction) => action.payload)
        .switchMap((query) => {
            return this.userService.get(query)
                .map(results => { 
                    return new userActions.LoadUsersDoneEvent(results);
                })
        });
}