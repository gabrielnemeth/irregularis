import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    exports: [MatIconModule, MatInputModule, MatButtonModule],
})
export class AppMaterialModule {}
