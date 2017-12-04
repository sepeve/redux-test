import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { reducers, metaReducers } from './index';
import { provideMockActions } from '@ngrx/effects/testing';
import { EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { getTestActions, TestActions } from './spec.helpers';

import { UserEffects } from './effects';
import { UserService } from './../services/user.service';
import * as UserActions from './actions';
import { User } from '../entities/user';

describe('UserEffect', () => {
    let store: Store<any>;
    let storeSpy: jasmine.Spy;
    let effects: UserEffects;
    let actions: Observable<any>;
    let metadata: EffectsMetadata<UserEffects>;
  
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
            HttpClientModule,
            StoreModule.forRoot(reducers, { metaReducers })
        ],
        providers: [
            UserEffects,
            {
                provide: UserService,
                useValue: jasmine.createSpyObj('UserService', ['get'])
            },
            {
                provide: UserActions,
                useFactory: getTestActions
            },
            provideMockActions(() => actions),
                
            
        ],
      });
  
      effects = TestBed.get(UserEffects);
      metadata = getEffectsMetadata(effects);

      store = TestBed.get(Store);
      storeSpy = spyOn(store, 'dispatch').and.callThrough();
      storeSpy = spyOn(store, 'select').and.callThrough();
    });

    function setup() {
        return {
            effects: TestBed.get(UserEffects) as UserEffects,
            userService: TestBed.get(UserService) as jasmine.SpyObj<UserService>,
            actions$: TestBed.get(UserActions) as TestActions
        };
    }

    it('should registrar load$ que lanza un action', () => {
        expect(metadata.load$).toEqual({ dispatch: true });
    });

    it('should llamar a load$', async () => {

        const { effects, userService, actions$ } = setup();
        // const action = new UserActions.LoadUsersAction('');

        // mock this function which we can test later on, due to the promise issue
        // spyOn(effects, 'load$').and.returnValue(Observable.of('load$'));

        // actions$.stream = hot('-a|', { a: action });
        
        expect(effects.load$).toHaveBeenCalled();

    });


    function createServiceStub(response: any) {
        const service = jasmine.createSpyObj('UserService', [ 'get' ]);

        const isError = response instanceof Error;
        const serviceResponse = isError ? Observable.throw(response) : Observable.of(response);

        service.get.and.returnValue(serviceResponse);

        return service;
    }

    // https://medium.com/@adrianfaciu/testing-ngrx-effects-3682cb5d760e
    it('should be an observable', () => {
        const source = cold('a', { a: { type: UserActions.LOAD } });
        const service = createServiceStub({});
        const effects = new UserEffects(new Actions(source), service);

        const expected = cold('a', { a: { type: UserActions.LOAD_DONE } });
        expect(effects.load$).toBeObservable(expected);
    });

})

