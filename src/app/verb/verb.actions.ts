import {createAction, props} from '@ngrx/store';
import {VerbRaw} from './verb-raw';
import {Translation} from './translation';

export const verbsLoad = createAction(
    '[VerbEffects] Verbs loaded',
    props<{ verbs: VerbRaw[] }>()
);

export const translationLoad = createAction(
    '[VerbEffects] Translation loaded',
    props<{ translation: Translation[] }>()
);
