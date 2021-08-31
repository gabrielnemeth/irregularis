import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {Action, createAction} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';
import {VerbService} from './verb.service';
import {verbsLoad} from './verb.actions';

const init = createAction('[VerbEffects] Init');

@Injectable()
export class VerbEffects implements OnInitEffects {
    public constructor(
        private actions$: Actions,
        private verbService: VerbService
    ) {}

    public ngrxOnInitEffects(): Action {
        return init();
    }

    public loadVerbs$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(init),
            switchMap(() => this.verbService.loadVerbs()),
            map(verbs => verbsLoad({verbs}))
        );
    });
}
