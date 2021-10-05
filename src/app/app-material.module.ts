import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {A11yModule} from '@angular/cdk/a11y';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
    exports: [
        A11yModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatSelectModule,
        MatDialogModule,
        MatStepperModule
    ],
})
export class AppMaterialModule {
}
