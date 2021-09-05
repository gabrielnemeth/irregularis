import {createAction, props} from '@ngrx/store';

export const questionCountSet = createAction(
    '[SettingsComponent] QuestionCount set',
    props<{questionCount: number}>()
);

export const levelSet = createAction(
    '[SettingsComponent] Level set',
    props<{level: string; active: boolean}>()
);

export const verbSet = createAction(
    '[SettingsComponent] Verb set',
    props<{verb: string; active: boolean}>()
);
