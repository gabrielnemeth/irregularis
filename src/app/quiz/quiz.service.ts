import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Verb} from '../verb/verb';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectActiveVerbs} from '../verb/verb.reducer';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    private verbsForActiveLevels$ = this.store.select(selectActiveVerbs);

    public constructor(private store: Store<AppState>) {}

    public generateVerbQuestion(): Observable<Verb> {
        return this.verbsForActiveLevels$.pipe(
            map(verbs => verbs[Math.floor(Math.random() * verbs.length)])
        );
    }
}
