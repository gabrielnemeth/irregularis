import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LanguageId} from '../language/language';
import {Translation} from './translation';
import {VerbRaw} from './verb-raw';

@Injectable({
    providedIn: 'root',
})
export class VerbService {
    public constructor(private httpClient: HttpClient) {
    }

    public loadVerbs(): Observable<VerbRaw[]> {
        return this.httpClient.get<VerbRaw[]>('./assets/data/verbs.json');
    }

    public loadTranslation(languageId: LanguageId): Observable<Translation[]> {
        return this.httpClient.get<Translation[]>(`./assets/data/translations/${languageId}.json`);
    }
}
