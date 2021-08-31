import {Injectable} from '@angular/core';
import {
    Actions,
    concatLatestFrom,
    createEffect,
    ofType,
    OnInitEffects,
} from '@ngrx/effects';
import {Action, createAction, Store} from '@ngrx/store';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {map} from 'rxjs/operators';
import {
    activeLevelsLoad,
    activeLevelsSet,
    questionCountLoad,
} from './settings.actions';
import {VerbService} from '../verb/verb.service';
import {selectAllLevels} from '../verb/verb.reducer';
import {AppState} from '../app.state';
import {verbsLoad} from '../verb/verb.actions';
import {levelSet, questionCountSet} from './settings.component.actions';
import {selectActiveLevels} from './settings.reducer';

const init = createAction('[SettingsEffects] Init');

@Injectable()
export class SettingsEffects implements OnInitEffects {
    public constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private verbService: VerbService,
        private localStorageService: LocalStorageService
    ) {}

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

    public loadLevels$ = createEffect(() => {
        return this.actions$.pipe(
            // We have to wait till the verbs load, since we are getting
            // the default levels from verbs.
            ofType(verbsLoad),
            concatLatestFrom(() => this.store.select(selectAllLevels)),
            map(([, allLevels]) => {
                const lsLevels = this.localStorageService.getLevels();
                if (lsLevels === null) {
                    return allLevels;
                }
                return lsLevels;
            }),
            map(activeLevels => activeLevelsLoad({activeLevels}))
        );
    });

    public setLevels$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(levelSet),
            concatLatestFrom(() => this.store.select(selectActiveLevels)),
            map(([{level}, activeLevels]) => {
                const clonedActiveLevels = [...activeLevels];
                if (clonedActiveLevels.includes(level)) {
                    const index = clonedActiveLevels.indexOf(level);
                    clonedActiveLevels.splice(index, 1);
                } else {
                    clonedActiveLevels.push(level);
                }
                return clonedActiveLevels;
            }),
            map(activeLevels => activeLevelsSet({activeLevels}))
        );
    });

    public saveActiveLevels$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(activeLevelsSet),
                map(({activeLevels}) =>
                    this.localStorageService.setLevels(activeLevels)
                )
            );
        },
        {dispatch: false}
    );
}
