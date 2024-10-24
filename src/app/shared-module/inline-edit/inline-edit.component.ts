import { Component, Output, forwardRef, EventEmitter, Renderer, Input} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators} from '@angular/forms';

// creates an ngModel accessor to be used in components providers
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InlineEditComponent),
    multi: true
};

@Component({
    selector: 'inline-editor',
    templateUrl: './inline-edit.component.html',
    styleUrls: ['./inline-edit.component.sass'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InlineEditComponent {

    @Output() public onSave: EventEmitter<any> = new EventEmitter();
    @Input() public placeholder: string;
    @Input() public defaultContent: any;
    form: FormGroup;
    requesting: boolean = false;

    private _value: string = '';
    private preValue: string = '';

    public onChange: any = Function.prototype;
    public onTouched: any = Function.prototype;

    get value(): any { return this._value; };

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    constructor(private _renderer: Renderer, private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(){
        this.form = this.formBuilder.group({
            name: [this.defaultContent, [Validators.required]]
        });
    }


    // Required for ControlValueAccessor interface
    writeValue(value: any) {
        this._value = value;
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }

    // Required forControlValueAccessor interface
    public registerOnTouched(fn: () => {}): void { this.onTouched = fn; };

    add() {
        this.requesting = true;
        this.onSave.emit(this.form.value.name);
    }

    cancel(value: any) {
        this._value = this.preValue;
    }


}
