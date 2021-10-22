import {Pipe, PipeTransform} from '@angular/core';
import {AnswerState, ViewData} from './summary.component';

@Pipe({
    name: 'summaryItemClassName'
})
export class SummaryItemClassNamePipe implements PipeTransform {

    transform(data: ViewData): string {
        const summaryItemState = [data.answer.base.state, data.answer.pastSimple.state, data.answer.pastParticiple.state];
        const containsAllWrong = summaryItemState.includes(AnswerState.allWrong);
        const containsAllCorrect = summaryItemState.includes(AnswerState.allCorrect);
        const containsMixed = summaryItemState.includes(AnswerState.mixed);

        if (containsAllWrong) {
            return 'summary-item--incorrect';
        }

        if (containsAllCorrect && !containsMixed && !containsAllWrong) {
            return 'summary-item--correct';
        }

        return 'summary-item--mixed';
    }

}
