import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from './quiz/quiz.component';
import {SummaryComponent} from './summary/summary.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
    {path: 'summary', component: SummaryComponent},
    {path: 'settings', component: SettingsComponent},
    {path: '', component: QuizComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
