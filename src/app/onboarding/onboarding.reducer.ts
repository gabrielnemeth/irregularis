import {createReducer, createSelector} from '@ngrx/store';
import {AppState} from '../app.state';

export interface OnboardingState {
    displayed: boolean;
}

const initialState: OnboardingState = {
    displayed: false
};

export const selectLanguage = (state: AppState) => state.onboarding;

export const selectOnboardingDisplayed = createSelector(
    selectLanguage,
    state => state.displayed
);

export const onboardingReducer = createReducer(
    initialState
);
