import {settingsReducer, SettingsState} from './settings/settings.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {verbReducer, VerbState} from './verb/verb.reducer';
import {quizReducer, QuizState} from './quiz/quiz.reducer';

export interface AppState {
    settings: SettingsState;
    verbs: VerbState;
    quiz: QuizState;
}

export const appState: ActionReducerMap<AppState> = {
    settings: settingsReducer,
    verbs: verbReducer,
    quiz: quizReducer,
};