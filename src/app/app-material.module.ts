import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';

@NgModule({
    exports: [MatIconModule, MatInputModule, MatButtonModule, MatListModule],
})
export class AppMaterialModule {}
