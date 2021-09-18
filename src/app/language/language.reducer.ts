import {createReducer, createSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {Language} from './language';

export interface LanguageState {
    languages: Language[];
}

export const initialState: LanguageState = {
    languages: [
        {id: 'en', name: 'English'},
        {id: 'sk', name: 'Slovak'},
        {id: 'es', name: 'Spanish'}
    ]
};

export const selectLanguage = (state: AppState) => state.language;

export const selectLanguages = createSelector(
    selectLanguage,
    state => state.languages
);

export const languageReducer = createReducer(
    initialState
);
