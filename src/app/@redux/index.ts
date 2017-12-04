import { createSelector, createFeatureSelector, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { ActionReducer, combineReducers } from '@ngrx/store';

import * as fromUser from './reducer';

export interface State {
    user: fromUser.State;
}
export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
};

export const metaReducers: MetaReducer<any, any>[] = [logger];

export function logger(reducer: ActionReducer<State>): ActionReducer<any, any> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}


const productionReducer: ActionReducer<State> = combineReducers(reducers);

export const getUserState = (state: State) => state.user;

export const getLoading = createSelector(getUserState, fromUser.loading);
export const getQuery = createSelector(getUserState, fromUser.query);
export const getUsers = createSelector(getUserState, fromUser.users);
  