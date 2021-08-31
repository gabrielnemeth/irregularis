import {Component} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {selectAllLevels} from '../verb/verb.reducer';
import {selectActiveLevels, selectQuestionCount} from './settings.reducer';
import {levelSet, questionCountSet} from './settings.component.actions';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
    private levels$ = this.store.select(selectAllLevels);
    private activeLevels$ = this.store.select(selectActiveLevels);
    private questionCount$ = this.store.select(selectQuestionCount);
    public questionCountString$ = this.questionCount$.pipe(
        map(count => count.toString())
    );

    public levelsViewData$: Observable<
        {value: string; selected: boolean; disabled?: boolean}[]
    > = combineLatest([this.levels$, this.activeLevels$]).pipe(
        map(([levels, activeLevels]) => {
            return levels.map(level => {
                if (activeLevels != null && activeLevels.includes(level)) {
                    return {value: level, selected: true};
                }
                return {value: level, selected: false};
            });
        }),
        map(data => {
            const selectedCount = data.reduce((acc, curr) => {
                if (curr.selected) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            if (selectedCount === 1) {
                // We doesn't want to allow to unselect all levels, so
                // we disable the last selected item.
                return data.map(d => {
                    if (d.selected) {
                        return {...d, disabled: true};
                    }
                    return d;
                });
            }
            return data;
        })
    );

    public constructor(private store: Store<AppState>) {}

    public onLevelChange(level: string): void {
        this.store.dispatch(levelSet({level}));
    }

    public onQuestionCountSubmit(count: string): void {
        this.store.dispatch(questionCountSet({questionCount: Number(count)}));
    }
}
