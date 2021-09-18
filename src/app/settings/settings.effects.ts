import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType, OnInitEffects,} from '@ngrx/effects';
import {Action, createAction, Store} from '@ngrx/store';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {map, tap} from 'rxjs/operators';
import {
    activeLanguageChange,
    activeLanguageLoad,
    activeVerbsCreate,
    activeVerbsLoad,
    questionCountLoad,
} from './settings.actions';
import {VerbService} from '../verb/verb.service';
import {selectVerbsForLevel} from '../verb/verb.reducer';
import {AppState} from '../app.state';
import {verbsLoad} from '../verb/verb.actions';
import {levelSet, questionCountSet, verbSet,} from './settings.component.actions';
import {selectActiveVerbs} from './settings.reducer';
import {MatSnackBar} from '@angular/material/snack-bar';

const init = createAction('[SettingsEffects] Init');

@Injectable()
export class SettingsEffects implements OnInitEffects {
    public constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private verbService: VerbService,
        private localStorageService: LocalStorageService,
        private snackBar: MatSnackBar
    ) {
    }

    public ngrxOnInitEffects(): Action {
        return init();
    }

    public loadQuestionCount$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(init),
            map(() => this.localStorageService.getQuestionCount()),
            map(count => questionCountLoad({questionCount: count}))
        );
    });

    public setQuestionCount$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(questionCountSet),
                map(({questionCount}) =>
                    this.localStorageService.setQuestionCount(questionCount)
                )
            );
        },
        {dispatch: false}
    );

    public showNotificationAfterQuestionCountSet$ = createEffect(() => {
        return this.actions$.pipe(ofType(questionCountSet), tap(() => this.snackBar.open('Settings saved')));
    }, {dispatch: false});

    public generateActiveVerbs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbsLoad),
            map(({verbs}) => {
                const lsVerbs = this.localStorageService.getVerbs();
                if (lsVerbs === null) {
                    return verbs.map(verb => verb.base);
                }
                return lsVerbs;
            }),
            map(activeVerbs => activeVerbsLoad({activeVerbs}))
        );
    });

    public saveActiveVerbs$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(activeVerbsCreate),
                map(({activeVerbs}) =>
                    this.localStorageService.setVerbs(activeVerbs)
                )
            );
        },
        {dispatch: false}
    );

    public createActiveVerbs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(verbSet),
            concatLatestFrom(() => this.store.select(selectActiveVerbs)),
            map(([{verb, active}, verbs]) => {
                const activeVerbs = [...verbs];

                if (active) {
                    console.assert(
                        !activeVerbs.includes(verb),
                        'Verb is already active'
                    );
                    activeVerbs.push(verb);
                } else {
                    console.assert(
                        activeVerbs.includes(verb),
                        'Verb is already in-active'
                    );
                    const indexToRemove = activeVerbs.indexOf(verb);
                    activeVerbs.splice(indexToRemove, 1);
                }

                return activeVerbs;
            }),
            map(activeVerbs => activeVerbsCreate({activeVerbs}))
        );
    });

    public setActiveLevels$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(levelSet),
            concatLatestFrom(({level}) => [
                this.store.select(selectVerbsForLevel(level)),
                this.store.select(selectActiveVerbs),
            ]),
            map(([{level, active}, verbsForLevel, activeVerbs]) => {
                const verbs = verbsForLevel.map(verb => verb.base);
                const clonedActiveVerbs = [...activeVerbs];
                if (active) {
                    verbs.forEach(verb => {
                        if (!clonedActiveVerbs.includes(verb)) {
                            clonedActiveVerbs.push(verb);
                        }
                    });
                } else {
                    verbs.forEach(verb => {
                        if (clonedActiveVerbs.includes(verb)) {
                            const indexToRemove =
                                clonedActiveVerbs.indexOf(verb);
                            clonedActiveVerbs.splice(indexToRemove, 1);
                        }
                    });
                }
                return clonedActiveVerbs;
            }),
            map(activeVerbs => activeVerbsCreate({activeVerbs}))
        );
    });

    public loadActiveLanguage$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(init),
            map(() => this.localStorageService.getLanguage()),
            map(languageId => activeLanguageLoad({languageId}))
        );
    });

    public saveActiveLanguage$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(activeLanguageChange),
                map(({languageId}) =>
                    this.localStorageService.setLanguage(languageId)
                )
            );
        },
        {dispatch: false}
    );

    public showNotificationAfterLanguageSet$ = createEffect(() => {
        return this.actions$.pipe(ofType(activeLanguageChange), tap(() => this.snackBar.open('Settings saved')));
    }, {dispatch: false});
}
