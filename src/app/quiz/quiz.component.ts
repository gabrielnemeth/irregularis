import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Verb} from '../verb/verb';
import {VerbService} from '../verb/verb.service';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
    public verbs$: Observable<Verb[]> = this.verbsService
        .getVerbs()
        .pipe(map(verbs => verbs.slice(0, 5)));

    public constructor(private verbsService: VerbService) {}
}
