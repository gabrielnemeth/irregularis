import {createAction, props} from '@ngrx/store';
import {VerbWithStatus} from '../verb/verb-with-status';

export const questionCountLoad = createAction(
    '[SettingsEffects] QuestionCount loaded',
    props<{questionCount: number | null}>()
);

export const activeVerbsLoad = createAction(
    '[SettingsEffects] Active verbs load',
    props<{activeVerbs: string[]}>()
);

export const activeVerbsSet = createAction(
    '[SettingsEffects] Active verbs set',
    props<{activeVerbs: VerbWithStatus[]}>()
);

export const activeVerbsCreate = createAction(
    '[SettingsEffects] Active verbs created',
    props<{activeVerbs: string[]}>()
);
