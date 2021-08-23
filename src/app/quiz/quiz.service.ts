import {Injectable} from '@angular/core';
import {Answer} from './answer';
import {VerbService} from '../verb/verb.service';
import {Observable, Subject} from 'rxjs';
import {Verb} from '../verb/verb';
import {take} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class QuizService {
    private readonly numberOfQuestions: number = 2;
    private currentQuestion: number = 1;
    private _answers: Answer[] = [];
    public get answers(): Answer[] {
        return this._answers;
    }

    private verbsSubject$: Subject<Verb> = new Subject();
    public verbs$: Observable<Verb> = this.verbsSubject$.asObservable();

    public constructor(
        private verbService: VerbService,
        private router: Router
    ) {}

    public generateNewQuestion(): void {
        if (this.currentQuestion <= this.numberOfQuestions) {
            this.verbService
                .getVerbs()
                .pipe(take(1))
                .subscribe(verbs => {
                    const randomVerb =
                        verbs[Math.floor(Math.random() * verbs.length)];
                    this.verbsSubject$.next(randomVerb);
                });
        }
    }

    public saveAnswer(answer: Answer): void {
        if (this.currentQuestion <= this.numberOfQuestions) {
            this._answers.push(answer);
            this.generateNewQuestion();
        }

        if (this.currentQuestion === this.numberOfQuestions) {
            this.router.navigate(['/summary']);
        }
        this.currentQuestion++;
    }
}
