import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {QuizComponent} from './quiz/quiz.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SummaryComponent} from './summary/summary.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {QuizFormComponent} from './quiz/quiz-form/quiz-form.component';
import { SettingsComponent } from './settings/settings.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
    declarations: [
        AppComponent,
        QuizComponent,
        QuizFormComponent,
        SummaryComponent,
        SettingsComponent,
        TopBarComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
