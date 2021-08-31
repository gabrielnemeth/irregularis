import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Verb} from '../verb/verb';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectVerbsForActiveLevels} from '../verb/verb.reducer';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    private verbsForActiveLevels$ = this.store.select(
        selectVerbsForActiveLevels
    );

    public constructor(private store: Store<AppState>) {}

    public generateVerbQuestion(): Observable<Verb> {
        return this.verbsForActiveLevels$.pipe(
            map(verbs => verbs[Math.floor(Math.random() * verbs.length)])
        );
    }
}
