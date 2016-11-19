import { Component, Input, OnChanges, Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { MdlDirective } from '../../directives/mdl.directive';
import { ColorState } from '../../components/material-states/color.states';

const MATERIAL_INPUT_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => MaterialInput), multi: true});

@Component({
    selector: 'material-input',
    templateUrl: './material-input.component.html',
    styleUrls: ['./material-input.component.scss'],
    providers: [MATERIAL_INPUT_ACCESSOR],
    directives: [MdlDirective]
})
export class MaterialInput implements ControlValueAccessor, OnChanges {
    @Input()
    private idName: string = "";

    @Input()
    private type: string = "text";

    @Input()
    private label: string = "";

    @Input()
    private disabled: boolean = false;

    @Input()
    private colorName: ColorState = ColorState.PRIMARY;

    @Input('value')
    private _value: any;

    get value(): any {
        return this._value;
    }

    set value(v: any) {
        if (v != null && this._value !== v) {
            this._value = v;
            /* console.log('Material Input Set: ' + this._value); */
            this.onChange(this._value);
        }
    }

    private isPrimary: boolean = true;
    private isAccent: boolean;
    private isError: boolean;
    private isValid: boolean;

    private onChange = (_) => {};

    private onTouched = () => {};

    ngOnChanges(changes) {
        let colorState = changes.colorName;
        if (colorState && !this.disabled) {
            let newColor = colorState.currentValue;
            this.isPrimary = newColor === ColorState.PRIMARY;
            this.isAccent = newColor === ColorState.ACCENT;
            this.isError = newColor === ColorState.ERROR;
            this.isValid = newColor === ColorState.VALID;
        } else if (this.disabled) {
            this.isPrimary = false;
            this.isAccent = false;
            this.isError = false;
            this.isValid = false;
        }
    }

    /* Implemented from ControlValueAccessor */
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }

    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

    writeValue(value: any) {
        this.value = value;
    }
}
