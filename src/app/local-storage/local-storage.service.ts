import {Injectable} from '@angular/core';
import {LanguageId} from '../language/language';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    public setQuestionCount(count: number): void {
        localStorage.setItem('questionCount', count.toString());
    }

    public getQuestionCount(): number | null {
        const countString = localStorage.getItem('questionCount');
        if (countString != null) {
            return JSON.parse(countString);
        }
        return null;
    }

    public getLevels(): string[] | null {
        const levelString = localStorage.getItem('levels');
        if (levelString != null && levelString.length === 0) {
            return [];
        }

        if (levelString != null && levelString.length > 0) {
            return JSON.parse(levelString);
        }

        return null;
    }

    public setVerbs(activeVerbs: string[]): void {
        localStorage.setItem('verbs', JSON.stringify(activeVerbs));
    }

    public getVerbs(): string[] | null {
        const verbsString = localStorage.getItem('verbs');
        if (verbsString != null && verbsString.length === 0) {
            return [];
        }

        if (verbsString != null && verbsString.length > 0) {
            return JSON.parse(verbsString);
        }

        return null;
    }

    public setLanguage(activeLanguage: LanguageId): void {
        localStorage.setItem('activeLanguage', activeLanguage);
    }

    public getLanguage(): LanguageId | null {
        const activeLanguageId = localStorage.getItem('activeLanguage');
        if (activeLanguageId != null && activeLanguageId.length === 0) {
            return null;
        }

        if (activeLanguageId != null && activeLanguageId.length > 0) {
            return activeLanguageId as LanguageId;
        }

        return null;
    }
}
