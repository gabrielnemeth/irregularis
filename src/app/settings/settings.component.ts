import {AfterViewInit, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {AppState} from '../app.state';
import {Store} from '@ngrx/store';
import {selectAllLevels, selectAllVerbs} from '../verb/verb.reducer';
import {selectActiveVerbs, selectQuestionCount} from './settings.reducer';
import {
    levelSet,
    questionCountSet,
    verbSet,
} from './settings.component.actions';
import {VerbWithStatus} from '../verb/verb-with-status';
import {
    MAT_CHECKBOX_DEFAULT_OPTIONS,
    MatCheckboxDefaultOptions,
} from '@angular/material/checkbox';

interface ViewData {
    level: string;
    active: boolean;
    indeterminate: boolean;
    verbs: VerbWithStatus[];
}

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    providers: [
        {
            provide: MAT_CHECKBOX_DEFAULT_OPTIONS,
            useValue: {clickAction: 'noop'} as MatCheckboxDefaultOptions,
        },
    ],
})
export class SettingsComponent implements AfterViewInit {
    private levels$ = this.store.select(selectAllLevels);
    private verbs$ = this.store.select(selectAllVerbs);
    private activeVerbs$ = this.store.select(selectActiveVerbs);
    private questionCount$ = this.store.select(selectQuestionCount);
    public questionCountString$ = this.questionCount$.pipe(
        map(count => count.toString())
    );
    public animationDisabled: boolean = true;

    private verbsWithStatus$ = this.verbs$.pipe(
        switchMap(verbs =>
            this.activeVerbs$.pipe(
                map(activeVerbs =>
                    verbs.map(verb => {
                        if (activeVerbs.includes(verb.base)) {
                            return {
                                ...verb,
                                active: true,
                            };
                        }
                        return {
                            ...verb,
                            active: false,
                        };
                    })
                )
            )
        )
    );

    public viewData$: Observable<ViewData[]> = this.levels$.pipe(
        switchMap(levels =>
            this.verbsWithStatus$.pipe(
                map(verbs =>
                    levels.map(level => {
                        const verbsForLevel = verbs.filter(
                            verb => verb.level === level
                        );

                        if (verbsForLevel.find(verb => !verb.active) == null) {
                            return {
                                level,
                                active: true,
                                indeterminate: false,
                                verbs: verbsForLevel,
                            };
                        } else {
                            if (
                                verbsForLevel.find(verb => verb.active) == null
                            ) {
                                return {
                                    level,
                                    active: false,
                                    indeterminate: false,
                                    verbs: verbsForLevel,
                                };
                            }
                            return {
                                level,
                                active: false,
                                indeterminate: true,
                                verbs: verbsForLevel,
                            };
                        }
                    })
                )
            )
        )
    );

    public constructor(private store: Store<AppState>) {}

    public ngAfterViewInit(): void {
        setTimeout(() => (this.animationDisabled = false), 0);
    }

    public trackByLevelId(id: number, _level: ViewData): string {
        return id.toString();
    }

    public trackByVerbId(id: number, _level: VerbWithStatus): string {
        return id.toString();
    }

    public onLevelChange(evt: Event, data: ViewData): void {
        evt.stopPropagation();
        this.store.dispatch(
            levelSet({level: data.level, active: !data.active})
        );
    }

    public onVerbChange(verb: VerbWithStatus): void {
        this.store.dispatch(verbSet({verb: verb.base, active: !verb.active}));
    }

    public onQuestionCountSubmit(count: string): void {
        this.store.dispatch(questionCountSet({questionCount: Number(count)}));
    }
}
