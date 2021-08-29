import {Component} from '@angular/core';
import {VerbService} from '../verb/verb.service';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../shared/local-storage.service';
import {map} from 'rxjs/operators';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    public levels$: Observable<{value: string; selected: boolean}[]> =
        this.verbService.getLevels().pipe(
            map(levels => {
                const selectedLevels = this.localStorageService.getLevels();
                return levels.map(level => {
                    if (
                        selectedLevels != null &&
                        selectedLevels.includes(level)
                    ) {
                        return {value: level, selected: true};
                    }
                    return {value: level, selected: false};
                });
            })
        );

    private questionCount: string | undefined = this.localStorageService
        .getQuestionCount()
        ?.toString();

    public constructor(
        private verbService: VerbService,
        private localStorageService: LocalStorageService,
        private formBuilder: FormBuilder
    ) {}

    public questionCountForm = this.formBuilder.group({
        count: [this.questionCount, Validators.required],
    });

    public onLevelChange(level: string): void {
        this.localStorageService.setLevels(level);
    }

    public onFormSubmit(count: string): void {
        this.localStorageService.setQuestionCount(Number(count));
    }
}
