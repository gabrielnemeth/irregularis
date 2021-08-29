import {Component} from '@angular/core';
import {VerbService} from '../verb/verb.service';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../shared/local-storage.service';
import {map} from 'rxjs/operators';

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

    public constructor(
        private verbService: VerbService,
        private localStorageService: LocalStorageService
    ) {}

    public onLevelChange(level: string): void {
        this.localStorageService.setLevels(level);
    }
}
