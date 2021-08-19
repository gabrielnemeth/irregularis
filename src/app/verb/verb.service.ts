import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Verb} from './verb';
import {Observable} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class VerbService {
    public constructor(private httpClient: HttpClient) {}

    public getVerbs(): Observable<Verb[]> {
        return this.httpClient
            .get<Verb[]>('./assets/data/verbs.json')
            .pipe(share());
    }
}
