import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {QuizService} from './quiz.service';
import {answerSubmit, componentInit} from './quiz.component.actions';
import {map, switchMap} from 'rxjs/operators';
import {newQuestionCreate, stateReset} from './quiz.actions';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectCurrentQuestionCount} from './quiz.reducer';
import {selectQuestionCount} from '../settings/settings.reducer';
import {Router} from '@angular/router';

@Injectable()
export class QuizEffects {
    public constructor(
        private actions$: Actions,
        private quizService: QuizService,
        private store: Store<AppState>,
        private router: Router
    ) {}

    public resetState$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(componentInit),
            map(() => stateReset())
        );
    });

    public loadInitialQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(componentInit),
            switchMap(() => this.quizService.generateVerbQuestion()),
            map(verb => newQuestionCreate({verb}))
        );
    });

    public loadNewQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(answerSubmit),
            concatLatestFrom(() => [
                this.store.select(selectCurrentQuestionCount),
                this.store.select(selectQuestionCount),
            ]),
            switchMap(([, currentCount, settingsCount]) => {
                if (currentCount <= settingsCount) {
                    return this.quizService.generateVerbQuestion();
                }
                this.router.navigate(['/summary']);
                return of(undefined);
            }),
            map(verb => newQuestionCreate({verb}))
        );
    });
}
