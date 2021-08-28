import {Injectable} from '@angular/core';
import {Answer} from './answer';
import {VerbService} from '../verb/verb.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Verb} from '../verb/verb';
import {map, share, shareReplay, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {LocalStorageService} from '../shared/local-storage.service';

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

    private verbsSubject$: BehaviorSubject<Verb | undefined> =
        new BehaviorSubject<Verb | undefined>(undefined);
    public verbs$: Observable<Verb | undefined> =
        this.verbsSubject$.asObservable();

    public constructor(
        private verbService: VerbService,
        private router: Router,
        private localstorageService: LocalStorageService
    ) {}

    public resetState(): void {
        this.currentQuestion = 1;
        this._answers = [];
    }

    public generateNewQuestion(): void {
        const levels = this.localstorageService.getLevels();
        if (this.currentQuestion <= this.numberOfQuestions) {
            this.verbService
                .getVerbs()
                .pipe(
                    map(verbs => {
                        if (levels.length === 0) {
                            return verbs;
                        }
                        return verbs.filter(verb =>
                            levels.includes(verb.level)
                        );
                    })
                )
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
