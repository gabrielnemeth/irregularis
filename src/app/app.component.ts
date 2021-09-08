import {Component} from '@angular/core';
import {routeAnimations} from './app.animations';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routeAnimations],
})
export class AppComponent {
    public prepareRoute(outlet: RouterOutlet): unknown {
        return outlet && outlet.activatedRouteData;
    }
}
