import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {selectActiveLanguage, selectQuestionCount} from '../settings/settings.reducer';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {LanguageId} from '../language/language';
import {activeLanguageChange, finishButtonClick, questionCountSet} from './onboarding.component.actions';
import {selectLanguages} from '../language/language.reducer';

@Component({
    selector: 'app-onboarding',
    templateUrl: './onboarding.component.html',
    styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {

    public languages$ = this.store.select(selectLanguages);
    public activeLanguage$ = this.store.select(selectActiveLanguage);
    private questionCount$ = this.store.select(selectQuestionCount);
    public questionCountString$ = this.questionCount$.pipe(
        map(count => count.toString())
    );

    constructor(private store: Store<AppState>) {
    }

    public onLanguageChange(languageId: LanguageId): void {
        this.store.dispatch(activeLanguageChange({languageId}));
    }

    public onQuestionCountSubmit(count: string): void {
        this.store.dispatch(questionCountSet({questionCount: Number(count)}));
    }

    public closeDialog(): void {
        this.store.dispatch(finishButtonClick());
    }
}
