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

@NgModule({
    exports: [
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatSelectModule
    ],
})
export class AppMaterialModule {
}
