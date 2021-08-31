import {createAction, props} from '@ngrx/store';
import {Verb} from './verb';

export const verbsLoad = createAction(
    '[VerbEffects] Verbs loaded',
    props<{verbs: Verb[]}>()
);
