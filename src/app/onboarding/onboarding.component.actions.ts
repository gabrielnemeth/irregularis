import {createAction, props} from '@ngrx/store';
import {LanguageId} from '../language/language';

export const questionCountSet = createAction(
    '[OnboardingComponent] QuestionCount set',
    props<{ questionCount: number }>()
);

export const activeLanguageChange = createAction(
    '[OnboardingComponent] Active language change',
    props<{ languageId: LanguageId }>()
);

export const finishButtonClick = createAction(
    '[OnboardingComponent] Finish button click'
);
