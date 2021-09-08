import {animate, query, style, transition, trigger} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
        // Set a default  style for enter and leave
        query(
            ':enter, :leave',
            [
                style({
                    position: 'absolute',
                    opacity: 0,
                }),
            ],
            {optional: true}
        ),
        // Animate the new page in
        query(':enter', [animate('400ms ease', style({opacity: 1}))], {
            optional: true,
        }),
    ]),
]);
