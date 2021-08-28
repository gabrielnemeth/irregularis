import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Verb} from './verb';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class VerbService {
    private verbs: Verb[] | undefined;

    public constructor(private httpClient: HttpClient) {}

    public getVerbs(): Observable<Verb[]> {
        if (this.verbs) {
            return of(this.verbs);
        }

        return this.httpClient
            .get<Verb[]>('./assets/data/verbs.json')
            .pipe(tap(verbs => (this.verbs = verbs)));
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

    public getLevels(): Observable<string[]> {
        return this.getVerbs().pipe(
            map(verbs => [...new Set(verbs.map(verb => verb.level))]),
            map(verbs => verbs.sort((a, b) => a.localeCompare(b)))
        );
    }
}
