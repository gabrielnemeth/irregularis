import {createReducer, createSelector, on} from '@ngrx/store';
import {
    activeLanguageChange,
    activeLanguageLoad,
    activeVerbsCreate,
    activeVerbsLoad,
    activeVerbsSet,
    questionCountLoad,
} from './settings.actions';
import {AppState} from '../app.state';
import {questionCountSet} from './settings.component.actions';
import {LanguageId} from '../language/language';

export interface SettingsState {
    activeLanguage: LanguageId;
    questionCount: number;
    activeVerbs: string[];
}

export const initialState: SettingsState = {
    activeLanguage: 'en',
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

export const selectActiveLanguage = createSelector(
    selectSettings,
    state => state.activeLanguage
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
    })),
    on(activeLanguageLoad, (state, {languageId}) => {
        // If the language is not set in LocalStorage, do nothing
        // and use the default value.
        if (languageId === null || languageId.length === 0) {
            return {...state};
        }

        return {
            ...state,
            activeLanguage: languageId,
        };
    }),
    on(activeLanguageChange, (state, {languageId}) => ({
        ...state,
        activeLanguage: languageId
    }))
);
