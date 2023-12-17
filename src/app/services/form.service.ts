import { Inject, Injectable } from '@angular/core';
import { Validators, Validations } from './validations.service';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FormField {
  private defaultValue: any;
  private mandatory: boolean = false;
  private disabled: boolean = false;
  private readonly: boolean = false;
  private shown: boolean = false;
  private valueStack: ReplaySubject<any> = new ReplaySubject(2);
  private changeObservable: ReplaySubject<any> = new ReplaySubject(1);
  public valid: boolean = true;
  public errorMessage: string = "";
  public validations: Array<any> = [];
  public conditionalValidation: any;
  public value: any;
  
  constructor(@Inject([]) ...args: any[]) {
    if (typeof args[0] !== "undefined") {
      this.defaultValue = args[0];
    }
    if (typeof args[1] !== "undefined") {
      this.mandatory = args[1];
    }
    if (typeof args[2] !== "undefined") {
      this.validations = args[2];
    }
    if (typeof args[3] !== "undefined") {
      this.conditionalValidation = args[3];
    } else {
      this.conditionalValidation = function () {
        return true;
      }
    }
  }
  
  valueChanged() {
    this.valueStack.next(this.value);
    var values: any[] = [];
    this.valueStack.forEach(next => {
      values.push(next);
    });
    if (typeof values[1] === "undefined") {
      values[1] = values[0];
      values[0] = undefined;
    }
    this.changeObservable.next({ oldValue: values[0], newValue: values[1] });
    this.clearError();
  }

  valueChangeListener() {
    this.changeObservable = new ReplaySubject(1);
    return this.changeObservable.asObservable();
  }

  setMandatory() {
    this.mandatory = true;
  }

  setOptional() {
    this.mandatory = false;
  }

  isMandatory() {
    return this.mandatory;
  }

  reset() {
    this.value = this.defaultValue;
    this.valueStack.next("");
    this.valueStack.next(this.value);
    this.disabled = false;
    this.clearError();
  }

  setError(errorMessage: string) {
    this.valid = false;
    this.errorMessage = errorMessage;
  }

  clearError() {
    this.valid = true;
    this.errorMessage = "";
  }

  disable() {
    this.disabled = true;
  }

  enable() {
    this.disabled = false
  }

  isDisabled() {
    return this.disabled;
  }

  show() {
    this.shown = true;
  }

  hide() {
    this.shown = false;
  }

  setReadonly(readonly: boolean) {
    this.readonly = readonly;
  }

  isReadonly() {
    return this.readonly;
  }

  validate(formFields?: any) {
    return FormService.validateField(this, true, formFields);
  }

  isValid(formFields?: any) {
    return FormService.validateField(this, false, formFields);
  }
}

export class FormService {

  static isValid(formFields: any) {
    var errors = 0;
    for (var fieldName in formFields) {
      var field = formFields[fieldName];
      if (field instanceof FormField) {
        if (!field.valid) {
          errors++;
        }
      }
    };
    return errors == 0;
  }

  static getData(formFields: any) {
    var dataObject: {[key:string]: any} = {};
    for (var fieldName in formFields) {
      var field = formFields[fieldName];
      if (field instanceof FormField) {
        dataObject[fieldName] = field.value;
      }
    };
    return dataObject;
  }

  static reset(formFields: any) {
    for (var fieldName in formFields) {
      var field = formFields[fieldName];
      if (field instanceof FormField) {
        field.reset();
      } else if (field instanceof Array) {
        formFields[fieldName] = [];
      }
    };
  }

  static validate(formFields: any) {
    var formErrors = 0;
    for (var fieldName in formFields) {
      var field = formFields[fieldName];
      if (field instanceof FormField) {
        if (!FormService.validateField(field, true, formFields)) {
          formErrors++;
        }
      }
    }
    return formErrors === 0;
  }

  static validateField(field: FormField, errorRequired: boolean, formFields?: any) {
    var errors = 0;
    field.clearError();
    var validations = field.validations;
    if (typeof formFields === "undefined" || field.conditionalValidation.apply(formFields)) {

      for (var i = 0; i < validations.length; i++) {
        var validation;
        if (validations[i] instanceof Array) {
          validation = validations[i][0];
        } else {
          validation = validations[i];
        }
        var errorMessage = "";
        switch (validation) {
          case Validations.EMPTY:
            if (Validators.isEmpty(field.value)) {
              errorMessage = "Field Cannot be empty.";
              errors++;
            }
            break;
          case Validations.NUMBER:
            if (!Validators.isNumber(field.value)) {
              errorMessage = "Field should be numeric.";
              errors++;
            }
            break;
          case Validations.BETWEEN:
            if (!Validators.isBetween(field.value, validations[i][1], validations[i][2])) {
              errorMessage = "Field value must be b/w " + validations[i][1] + " - "+ validations[i][2];
              errors++;
            }
            break;
        }
        if (errors > 0) {
          if (errorRequired) {
            field.setError(errorMessage);
          }
          break;
        }
      }
    }

    return errors == 0;
  }

  static disable(formFields: any) {
    for (var fieldName in formFields) {
      var field = formFields[fieldName];
      if (field instanceof FormField) {
        field.disable();
      }
    };
  }

  static enable(formFields: any) {
    for (var fieldName in formFields) {
      var field = formFields[fieldName];
      if (field instanceof FormField) {
        field.enable();
      }
    };
  }

}