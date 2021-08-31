import {createReducer, createSelector, on} from '@ngrx/store';
import {
    activeLevelsLoad,
    activeLevelsSet,
    questionCountLoad,
} from './settings.actions';
import {AppState} from '../app.state';
import {questionCountSet} from './settings.component.actions';

export interface SettingsState {
    questionCount: number;
    activeLevels: string[];
}

export const initialState: SettingsState = {
    questionCount: 5,
    activeLevels: [],
};

export const selectSettings = (state: AppState) => state.settings;

export const selectQuestionCount = createSelector(
    selectSettings,
    state => state.questionCount
);

export const selectActiveLevels = createSelector(
    selectSettings,
    state => state.activeLevels
);

export const settingsReducer = createReducer(
    initialState,
    on(questionCountLoad, (state, {questionCount}) => {
        // If the count is not set in LocalStorage, do nothing
        // and use the default value.
        if (questionCount === null) {
            return {...state};
        }

        return {
            ...state,
            questionCount,
        };
    }),
    on(questionCountSet, (state, {questionCount}) => ({
        ...state,
        questionCount,
    })),
    on(activeLevelsLoad, (state, {activeLevels}) => ({...state, activeLevels})),
    on(activeLevelsSet, (state, {activeLevels}) => ({...state, activeLevels}))
);
