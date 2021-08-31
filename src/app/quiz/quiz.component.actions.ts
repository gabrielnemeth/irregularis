import {createAction, props} from '@ngrx/store';
import {Answer} from './answer';

export const componentInit = createAction(
    '[QuizComponent] Quiz component init'
);

export const answerSubmit = createAction(
    '[QuizComponent] Answer submit',
    props<{answer: Answer}>()
);
