import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType, OnInitEffects,} from '@ngrx/effects';
import {Action, createAction, Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {selectOnboardingDisplayed} from './onboarding.reducer';
import {map, tap} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {OnboardingComponent} from './onboarding.component';
import {finishButtonClick} from './onboarding.component.actions';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {onboardingLoad} from './onboarding.actions';

const init = createAction('[OnboardingEffects] Init');

@Injectable()
export class OnboardingEffects implements OnInitEffects {
    private dialogRef: MatDialogRef<OnboardingComponent> | undefined;

    public constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private dialog: MatDialog,
        private localStorageService: LocalStorageService,
    ) {
    }

    public ngrxOnInitEffects(): Action {
        return init();
    }

    public openOnboardingDialog$ = createEffect(() => {
        return this.actions$.pipe(ofType(onboardingLoad), concatLatestFrom(() => this.store.select(selectOnboardingDisplayed)), tap(([_action, displayed]) => {
            if (!displayed) {
                this.dialogRef = this.dialog.open(OnboardingComponent, {
                    width: '600px',
                    height: '500px',
                    disableClose: true
                });
            }
        }));
    }, {dispatch: false});

    public closeOnboardingDialog$ = createEffect(() => {
        return this.actions$.pipe(ofType(finishButtonClick), tap(() => {
            this.dialogRef?.close();
        }));
    }, {dispatch: false});

    public loadOnboardingDisplayed$ = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(init),
                map(() => this.localStorageService.getOnboardingDisplayed()),
                map(displayed => onboardingLoad({displayed}))
            );
        }
    );

    public saveOnboardingDisplayed$ = createEffect(
        () => {
            return this.actions$.pipe(ofType(finishButtonClick), tap(() => {
                this.localStorageService.setOnboardingDisplayed();
            }));
        },
        {dispatch: false}
    );
}
