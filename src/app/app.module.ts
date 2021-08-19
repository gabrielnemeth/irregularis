import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {QuizComponent} from './quiz/quiz.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SummaryComponent} from './summary/summary.component';

@NgModule({
    declarations: [AppComponent, QuizComponent, SummaryComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
