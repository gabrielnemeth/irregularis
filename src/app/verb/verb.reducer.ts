import {createReducer, createSelector, on} from '@ngrx/store';
import {Verb} from './verb';
import {verbsLoad} from './verb.actions';
import {AppState} from '../app.state';

export interface VerbState {
    verbs: Verb[];
    levels: string[];
}

export const initialState: VerbState = {
    verbs: [],
    levels: [],
};

export const selectSettingsState = (state: AppState) => state.settings;
export const selectVerbsState = (state: AppState) => state.verbs;

export const selectAllLevels = createSelector(
    selectVerbsState,
    state => state.levels
);

export const selectAllVerbs = createSelector(
    selectVerbsState,
    state => state.verbs
);

export const selectActiveVerbs = createSelector(
    selectVerbsState,
    selectSettingsState,
    (verbsState, settingsState) =>
        verbsState.verbs.filter(verb =>
            settingsState.activeVerbs.includes(verb.base)
        )
);

export const selectVerb = (base: string) =>
    createSelector(selectVerbsState, state => {
        const verb = state.verbs.find(verb => verb.base === base);
        if (verb === undefined) {
            throw new TypeError("Verb can't be undefined");
        }
        return verb;
    });

export const selectVerbsForLevel = (level: string) =>
    createSelector(selectVerbsState, state =>
        state.verbs.filter(verb => verb.level === level)
    );

export const verbReducer = createReducer(
    initialState,
    on(verbsLoad, (state, {verbs}) => ({
        ...state,
        verbs,
        levels: getLevels(verbs),
    }))
);

function getLevels(verbs: Verb[]): string[] {
    const levels = [...new Set(verbs.map(verb => verb.level))];
    return levels.sort((a, b) => a.localeCompare(b));
}
