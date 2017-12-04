import { User } from '../entities/user';
import *  as userActions from './actions';

export interface State {
    loading: boolean;
    query: string;
    users: User[]
}

const initialState: State = {
    loading: false,
    query: '',
    users: []
}

export function reducer(state = initialState, action: userActions.Actions): State {
    switch(action.type) {

        case userActions.LOAD: {
            return { ...state, loading: true, query: action.payload, users: []}
        }

        case userActions.LOAD_DONE: {
            const users = <User[]> action.payload.result;
            return { ...state, loading: false, users: action.payload.result }
        }

        default:
            return state;
    }
}

export const loading = (state: State) => state.loading;
export const query = (state: State) => state.query;
export const users = (state: State) => state.users;