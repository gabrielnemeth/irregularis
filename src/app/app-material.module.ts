import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';

@NgModule({
    exports: [
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatListModule,
        MatCardModule,
    ],
})
export class AppMaterialModule {}
