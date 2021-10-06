import {createAction, props} from '@ngrx/store';

export const onboardingLoad = createAction(
    '[OnboardingEffects] Onboarding loaded',
    props<{ displayed: boolean | null }>()
);
