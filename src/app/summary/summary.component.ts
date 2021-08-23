import {Component} from '@angular/core';
import {QuizService} from '../quiz/quiz.service';
import {Answer} from '../quiz/answer';
import {Verb} from '../verb/verb';
import {Observable, zip} from 'rxjs';
import {VerbService} from '../verb/verb.service';
import {map} from 'rxjs/operators';

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
})
export class SummaryComponent {
    public viewData$: Observable<ViewData[]> = zip(
        ...this.quizService.answers.map(answer =>
            this.verbService.getVerb(answer.questionBase).pipe(
                map(verb => {
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
                            correct:
                                answer.pastParticiple === verb.pastParticiple,
                        },
                    };

                    return {
                        answer: answerData,
                        verb,
                    };
                })
            )
        )
    );

    public constructor(
        private quizService: QuizService,
        private verbService: VerbService
    ) {}
}
