import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators} from '@angular/forms';
import {Verb} from '../../verb/verb';
import {Answer} from '../answer';

interface FormData {
    base: string;
    pastSimple: string;
    pastParticiple: string;
}

@Component({
    selector: 'app-quiz-form',
    templateUrl: './quiz-form.component.html',
    styleUrls: ['./quiz-form.component.scss'],
})
export class QuizFormComponent {
    @Input()
    public verb!: Verb;

    @Output()
    public formSubmit: EventEmitter<Answer> = new EventEmitter();

    @ViewChild('firstFormInput')
    public firstFormInput!: ElementRef;

    public quizForm = this.formBuilder.group({
        base: ['', Validators.required],
        pastSimple: ['', Validators.required],
        pastParticiple: ['', Validators.required],
    });

    public constructor(private formBuilder: FormBuilder) {}

    public onFormSubmit(
        questionBase: string,
        formDirective: FormGroupDirective
    ): void {
        const formData: FormData = this.quizForm.value;
        const answer = {...formData, questionBase};
        this.formSubmit.emit(answer);

        this.firstFormInput.nativeElement.focus();
        formDirective.resetForm();
        this.quizForm.reset();
    }
}
