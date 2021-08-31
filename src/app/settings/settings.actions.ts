import {createAction, props} from '@ngrx/store';

export const questionCountLoad = createAction(
    '[SettingsEffects] QuestionCount loaded',
    props<{questionCount: number | null}>()
);

export const activeLevelsLoad = createAction(
    '[SettingsEffects] Active levels loaded',
    props<{activeLevels: string[]}>()
);

export const activeLevelsSet = createAction(
    '[SettingsEffects] Active levels set',
    props<{activeLevels: string[]}>()
);
