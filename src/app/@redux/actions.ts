import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { UserGrid } from '../entities/user';

export const LOAD = '[User] Load';
export const LOAD_DONE = '[User] Load Done';

export class LoadUsersAction implements Action {
    readonly type = LOAD;
    constructor(public payload: string) { }
}

export class LoadUsersDoneEvent implements Action {
    readonly type = LOAD_DONE;
    constructor(public payload: UserGrid) { }
}

export type Actions = LoadUsersAction | LoadUsersDoneEvent;