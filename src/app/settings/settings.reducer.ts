import {createReducer, createSelector, on} from '@ngrx/store';
import {
    activeVerbsCreate,
    activeVerbsLoad,
    activeVerbsSet,
    questionCountLoad,
} from './settings.actions';
import {AppState} from '../app.state';
import {questionCountSet} from './settings.component.actions';

export interface SettingsState {
    questionCount: number;
    activeVerbs: string[];
}

export const initialState: SettingsState = {
    questionCount: 5,
    activeVerbs: [],
};

export const selectSettings = (state: AppState) => state.settings;

export const selectQuestionCount = createSelector(
    selectSettings,
    state => state.questionCount
);

export const selectActiveVerbs = createSelector(
    selectSettings,
    state => state.activeVerbs
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
    on(activeVerbsLoad, activeVerbsCreate, (state, {activeVerbs}) => ({
        ...state,
        activeVerbs,
    })),
    on(activeVerbsSet, (state, {activeVerbs}) => ({
        ...state,
        verbs: activeVerbs,
    }))
);
