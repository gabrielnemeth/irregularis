import {createReducer, createSelector, on} from '@ngrx/store';
import {Answer} from './answer';
import {Verb} from '../verb/verb';
import {newQuestionCreate, stateReset} from './quiz.actions';
import {AppState} from '../app.state';
import {answerSubmit} from './quiz.component.actions';

export interface QuizState {
    questionVerb: Verb | undefined;
    currentQuestionCount: number;
    answers: Answer[];
}

export const initialState: QuizState = {
    questionVerb: undefined,
    currentQuestionCount: 1,
    answers: [],
};

const selectState = (state: AppState) => state.quiz;

export const selectVerbQuestion = createSelector(
    selectState,
    state => state.questionVerb
);

export const selectCurrentQuestionCount = createSelector(
    selectState,
    state => state.currentQuestionCount
);

export const selectAnswers = createSelector(
    selectState,
    state => state.answers
);

export const quizReducer = createReducer(
    initialState,
    on(stateReset, state => ({...state, answers: []})),
    on(newQuestionCreate, (state, {verb}) => {
        if (verb == null) {
            // Reset the count if the question is empty.
            return {
                ...state,
                questionVerb: verb,
                currentQuestionCount: 1,
            };
        }
        return {
            ...state,
            questionVerb: verb,
        };
    }),
    on(answerSubmit, (state, {answer}) => ({
        ...state,
        answers: [...state.answers, answer],
        currentQuestionCount: state.currentQuestionCount + 1,
    }))
);
