import {Component} from '@angular/core';
import {QuizService} from '../quiz/quiz.service';
import {Verb} from '../verb/verb';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectActiveVerbs} from '../verb/verb.reducer';
import {selectAnswers} from '../quiz/quiz.reducer';
import {map, tap} from 'rxjs/operators';
import {Answer} from '../quiz/answer';
import {Router} from '@angular/router';

export interface ViewData {
    answer: {
        base: {
            verb: string;
            state: AnswerState;
        };
        pastSimple: {
            verb: string;
            state: AnswerState;
        };
        pastParticiple: {
            verb: string;
            state: AnswerState;
        };
    };
    verb: Verb;
}

export enum AnswerState {
    allCorrect = 'allCorrect',
    allWrong = 'allWrong',
    mixed = 'mixed',
};

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent {
    private answers$ = this.store.select(selectAnswers);
    private activeVerbs$ = this.store.select(selectActiveVerbs);
    public answerState: typeof AnswerState = AnswerState;

    public viewData$: Observable<ViewData[]> = combineLatest([
        this.answers$,
        this.activeVerbs$,
    ]).pipe(
        map(([answers, verbs]) => {
            return answers.map(answer => {
                const verb = verbs.find(v => v.base === answer.questionBase);
                if (verb == null) {
                    throw new Error(`Verb can't be Nil`);
                }
                return this.createViewData(answer, verb);
            });
        }),
        tap(data => {
            if (data.length === 0) {
                // Redirect to the homepage if the user get here directly,
                // or refreshed the page.
                this.router.navigate(['/']);
            }
        })
    );

    public constructor(
        private quizService: QuizService,
        private store: Store<AppState>,
        private router: Router
    ) {
    }

    private createViewData(answer: Answer, verb: Verb): ViewData {
        const answerData = {
            base: {
                verb: answer.base,
                state: this.isAnswerCorrect(verb.base, answer.base),
            },
            pastSimple: {
                verb: answer.pastSimple,
                state: this.isAnswerCorrect(verb.pastSimple, answer.pastSimple),
            },
            pastParticiple: {
                verb: answer.pastParticiple,
                state: this.isAnswerCorrect(verb.pastParticiple, answer.pastParticiple),
            },
        };

        return {
            answer: answerData,
            verb,
        };
    }

    private isAnswerCorrect(verb: string, answer: string): AnswerState {
        // Some verbs are separated by '/' character and with spaces, so we need to split them and trim the spaces.
        const verbs = verb.split('/').map(v => v.trim());
        const answers = answer.split(new RegExp('(?:;|,|\\/|$)')).map(v => v.trim());
        const answerStates = verbs.map(v => answers.includes(v));
        const allCorrect = !answerStates.includes(false);
        const allWrong = !answerStates.includes(true);

        if (allCorrect) {
            return AnswerState.allCorrect;
        }

        if (allWrong) {
            return AnswerState.allWrong;
        }

        return AnswerState.mixed;
    }
}
