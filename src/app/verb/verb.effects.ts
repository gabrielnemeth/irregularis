import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, createAction, Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {VerbService} from './verb.service';
import {translationLoad, verbsLoad} from './verb.actions';
import {selectActiveLanguage} from '../settings/settings.reducer';
import {AppState} from '../app.state';
import {activeLanguageChange} from '../settings/settings.actions';
import {activeLanguageChange as onboardingActiveLanguageChange} from '../onboarding/onboarding.component.actions';

const init = createAction('[VerbEffects] Init');

@Injectable()
export class VerbEffects implements OnInitEffects {
    public constructor(
        private actions$: Actions,
        private verbService: VerbService,
        private store: Store<AppState>
    ) {
    }

    public ngrxOnInitEffects(): Action {
        return init();
    }

    public loadTranslation$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(init, activeLanguageChange, onboardingActiveLanguageChange),
            concatLatestFrom(() => this.store.select(selectActiveLanguage)),
            switchMap(([_, languageId]) => this.verbService.loadTranslation(languageId)),
            map(translation => translationLoad({translation}))
        );
    });

    public loadVerbs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(init),
            switchMap(() => this.verbService.loadVerbs()),
            map(verbs => verbsLoad({verbs}))
        );
    });
}
