import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Verb} from './verb';
import {Observable} from 'rxjs';
import {map, share} from 'rxjs/operators';

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

    public getVerb(base: string): Observable<Verb> {
        return this.getVerbs().pipe(
            map(verbs => {
                const verb = verbs.find(verb => verb.base === base);
                if (verb === undefined) {
                    throw new TypeError("Verb can't be undefined");
                }
                return verb;
            })
        );
    }
}
