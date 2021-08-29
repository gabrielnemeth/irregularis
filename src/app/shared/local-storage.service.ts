import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    public setLevels(level: string): void {
        const levelString = localStorage.getItem('levels');
        if (levelString == null || levelString.length === 0) {
            localStorage.setItem('levels', JSON.stringify([level]));
        } else {
            const levels = JSON.parse(levelString);
            if (levels.includes(level)) {
                const index = levels.indexOf(level);
                levels.splice(index, 1);
            } else {
                levels.push(level);
            }
            localStorage.setItem('levels', JSON.stringify(levels));
        }
    }

    public getLevels(): string[] | undefined {
        const levelString = localStorage.getItem('levels');
        if (levelString != null && levelString.length === 0) {
            return [];
        }

        if (levelString != null && levelString.length > 0) {
            return JSON.parse(levelString);
        }

        return undefined;
    }
}
