import {Component} from '@angular/core';
import {QuizService} from '../quiz/quiz.service';
import {Verb} from '../verb/verb';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectActiveVerbs} from '../verb/verb.reducer';
import {selectAnswers} from '../quiz/quiz.reducer';
import {map} from 'rxjs/operators';
import {Answer} from '../quiz/answer';
import {
    animate,
    query,
    stagger,
    style,
    transition,
    trigger,
} from '@angular/animations';

interface ViewData {
    answer: {
        base: {
            verb: string;
            correct: boolean;
        };
        pastSimple: {
            verb: string;
            correct: boolean;
        };
        pastParticiple: {
            verb: string;
            correct: boolean;
        };
    };
    verb: Verb;
}

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    animations: [
        trigger('enterAnimation', [
            transition('* => *', [
                query(
                    ':enter',
                    [
                        style({opacity: 0, position: 'relative', top: '30px'}),
                        stagger(200, [
                            animate(
                                '400ms ease-out',
                                style({opacity: 1, top: 0})
                            ),
                        ]),
                    ],
                    {optional: true}
                ),
            ]),
        ]),
    ],
})
export class SummaryComponent {
    private answers$ = this.store.select(selectAnswers);
    private activeVerbs$ = this.store.select(selectActiveVerbs);

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
        })
    );

    public constructor(
        private quizService: QuizService,
        private store: Store<AppState>
    ) {}

    private createViewData(answer: Answer, verb: Verb): ViewData {
        const answerData = {
            base: {
                verb: answer.base,
                correct: answer.base === verb.base,
            },
            pastSimple: {
                verb: answer.pastSimple,
                correct: answer.pastSimple === verb.pastSimple,
            },
            pastParticiple: {
                verb: answer.pastParticiple,
                correct: answer.pastParticiple === verb.pastParticiple,
            },
        };

        return {
            answer: answerData,
            verb,
        };
    }
}
