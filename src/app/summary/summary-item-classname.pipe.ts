import {Pipe, PipeTransform} from '@angular/core';
import {ViewData} from './summary.component';

@Pipe({
    name: 'summaryItemClassName'
})
export class SummaryItemClassNamePipe implements PipeTransform {

    transform(data: ViewData): string {
        const baseCorrect = data.answer.base.correct;
        const pastSimpleCorrect = data.answer.pastSimple.correct;
        const pastParticipleCorrect = data.answer.pastParticiple.correct;
        const everythingCorrect = baseCorrect && pastSimpleCorrect && pastParticipleCorrect;
        return everythingCorrect ? 'summary-item--correct' : 'summary-item--incorrect';
    }

}
