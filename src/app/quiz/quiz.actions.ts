import {createAction, props} from '@ngrx/store';
import {Verb} from '../verb/verb';

export const newQuestionCreate = createAction(
    '[QuizEffects] New verb question created',
    props<{verb: Verb | undefined}>()
);

export const stateReset = createAction('[QuizEffects] Reset the state');
