import {Component, OnInit} from '@angular/core';
import {VerbService} from './verb/verb.service';
import {LocalStorageService} from './shared/local-storage.service';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public constructor(
        private verbService: VerbService,
        private localStorageService: LocalStorageService
    ) {}

    public ngOnInit(): void {
        this.initializeLevelSettings();
        this.initializeQuestionCountSettings();
    }

    private initializeLevelSettings(): void {
        const selectedLevels = this.localStorageService.getLevels();
        if (selectedLevels == null) {
            this.verbService
                .getLevels()
                .pipe(take(1))
                .subscribe(levels =>
                    levels.forEach(level =>
                        this.localStorageService.setLevels(level)
                    )
                );
        }
    }

    private initializeQuestionCountSettings(): void {
        const questionCount = this.localStorageService.getQuestionCount();
        if (questionCount == null) {
            // Set the default question count.
            this.localStorageService.setQuestionCount(5);
        }
    }
}
