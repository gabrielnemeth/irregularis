import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Verb} from '../verb/verb';
import {Answer} from './answer';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {answerSubmit, componentInit} from './quiz.component.actions';
import {selectVerbQuestion} from './quiz.reducer';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
    public verbs$: Observable<Verb | undefined> =
        this.store.select(selectVerbQuestion);

    public constructor(private store: Store<AppState>) {}

    public ngOnInit(): void {
        this.store.dispatch(componentInit());
    }

    public onFormSubmit(answer: Answer): void {
        this.store.dispatch(answerSubmit({answer}));
    }
}
