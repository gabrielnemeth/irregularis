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
