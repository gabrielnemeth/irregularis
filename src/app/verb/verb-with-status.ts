import {Verb} from './verb';

export interface VerbWithStatus extends Verb {
    active: boolean;
}
