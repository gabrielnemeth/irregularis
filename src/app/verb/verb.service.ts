import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Verb} from './verb';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VerbService {
    public constructor(private httpClient: HttpClient) {}

    public loadVerbs(): Observable<Verb[]> {
        return this.httpClient.get<Verb[]>('./assets/data/verbs.json');
    }
}
