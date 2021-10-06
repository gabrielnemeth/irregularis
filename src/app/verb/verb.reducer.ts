import {createReducer, createSelector, on} from '@ngrx/store';
import {translationLoad, verbsLoad} from './verb.actions';
import {AppState} from '../app.state';
import {VerbRaw} from './verb-raw';
import {Translation} from './translation';

export interface VerbState {
    verbs: VerbRaw[];
    levels: string[];
    translation: Translation[];
}

export const initialState: VerbState = {
    verbs: [],
    levels: [],
    translation: []
};

export const selectSettingsState = (state: AppState) => state.settings;
export const selectVerbsState = (state: AppState) => state.verbs;

export const selectAllLevels = createSelector(
    selectVerbsState,
    state => state.levels
);

export const selectAllVerbs = createSelector(
    selectVerbsState,
    state => {
        return state.verbs.map(verb => {
            const translation = state.translation.find(translation => translation.base === verb.base);

            if (translation == null) {
                throw new TypeError(`Translation can't be Nil!`);
            }

            return {
                ...verb,
                translation: translation.translation
            };
        });
    }
);

export const selectActiveVerbs = createSelector(
    selectAllVerbs,
    selectSettingsState,
    (verbs, settingsState) =>
        verbs.filter(verb =>
            settingsState.activeVerbs.includes(verb.base)
        )
);

export const selectVerb = (base: string) =>
    createSelector(selectAllVerbs, verbs => {
        const verb = verbs.find(verb => verb.base === base);
        if (verb === undefined) {
            throw new TypeError('Verb can\'t be undefined');
        }
        return verb;
    });

export const selectVerbsForLevel = (level: string) =>
    createSelector(selectAllVerbs, verbs =>
        verbs.filter(verb => verb.level === level)
    );

export const verbReducer = createReducer(
    initialState,
    on(verbsLoad, (state, {verbs}) => ({
        ...state,
        verbs,
        levels: getLevels(verbs),
    })),
    on(translationLoad, (state, {translation}) => ({
        ...state,
        translation
    }))
);

function getLevels(verbs: VerbRaw[]): string[] {
    const levels = [...new Set(verbs.map(verb => verb.level))];
    return levels.sort((a, b) => a.localeCompare(b));
}
