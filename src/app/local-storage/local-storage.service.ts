import {Injectable} from '@angular/core';

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

    public setLevels(levels: string[]): void {
        localStorage.setItem('levels', JSON.stringify(levels));
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
}
