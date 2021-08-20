import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Verb} from '../verb/verb';
import {QuizService} from './quiz.service';
import {Answer} from './answer';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
    public verbs$: Observable<Verb> = this.quizService.verbs$;

    public constructor(private quizService: QuizService) {}

    public ngOnInit(): void {
        this.quizService.generateNewQuestion();
    }

    public onFormSubmit(answer: Answer): void {
        this.quizService.saveAnswer(answer);
    }
}
