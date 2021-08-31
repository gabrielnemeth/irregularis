import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {QuizComponent} from './quiz/quiz.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SummaryComponent} from './summary/summary.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {QuizFormComponent} from './quiz/quiz-form/quiz-form.component';
import {SettingsComponent} from './settings/settings.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {LogoComponent} from './top-bar/logo/logo.component';
import {StoreModule} from '@ngrx/store';
import {appState} from './app.state';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {EffectsModule} from '@ngrx/effects';
import {SettingsEffects} from './settings/settings.effects';
import {VerbEffects} from './verb/verb.effects';
import {QuizEffects} from './quiz/quiz.effects';

@NgModule({
    declarations: [
        AppComponent,
        QuizComponent,
        QuizFormComponent,
        SummaryComponent,
        SettingsComponent,
        TopBarComponent,
        LogoComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        StoreModule.forRoot(appState),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([SettingsEffects, VerbEffects, QuizEffects]),
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
