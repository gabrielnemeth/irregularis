import {createReducer, createSelector, on} from '@ngrx/store';
import {AppState} from '../app.state';
import {finishButtonClick} from './onboarding.component.actions';
import {onboardingLoad} from './onboarding.actions';

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
    initialState,
    on(finishButtonClick, state => ({...state, displayed: true})),
    on(onboardingLoad, (state, {displayed}) => {
        const disp = displayed == null ? false : displayed;
        return {...state, displayed: disp};
    })
);
