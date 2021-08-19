import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Verb} from '../verb/verb';
import {QuizService} from './quiz.service';
import {FormBuilder, Validators} from '@angular/forms';

interface FormData {
    base: string;
    pastSimple: string;
    pastParticiple: string;
}

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
    public verbs$: Observable<Verb> = this.quizService.verbs$;

    public quizForm = this.formBuilder.group({
        base: ['', Validators.required],
        pastSimple: ['', Validators.required],
        pastParticiple: ['', Validators.required],
    });

    public constructor(
        private quizService: QuizService,
        private formBuilder: FormBuilder
    ) {}

    public ngOnInit(): void {
        this.quizService.generateNewQuestion();
    }

    public onFormSubmit(questionBase: string): void {
        const formData: FormData = this.quizForm.value;
        const answer = {...formData, questionBase};
        this.quizService.saveAnswer(answer);
        this.quizForm.reset();
        this.quizService.generateNewQuestion();
    }
}
