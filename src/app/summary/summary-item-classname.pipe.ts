import {Pipe, PipeTransform} from '@angular/core';
import {AnswerState, ViewData} from './summary.component';

@Pipe({
    name: 'summaryItemClassName'
})
export class SummaryItemClassNamePipe implements PipeTransform {

    transform(data: ViewData): string {
        const baseCorrect = data.answer.base.state === AnswerState.allCorrect;
        const pastSimpleCorrect = data.answer.pastSimple.state === AnswerState.allCorrect;
        const pastParticipleCorrect = data.answer.pastParticiple.state === AnswerState.allCorrect;
        const everythingCorrect = baseCorrect && pastSimpleCorrect && pastParticipleCorrect;
        return everythingCorrect ? 'summary-item--correct' : 'summary-item--incorrect';
    }

}
