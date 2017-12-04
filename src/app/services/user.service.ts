
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { UserGrid } from '../entities/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    get(query: string): Observable<UserGrid> {
        const url = 'https://pswebapidev.azurewebsites.net/api/encuestas';
        return this.http.get<UserGrid>(url);
    }
}