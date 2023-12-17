import { FormField, FormService } from '../services/form.service';
import { Validations } from '../services/validations.service';
import { BaseModel } from './baseModel';

export class UserReposModel extends BaseModel {
  per_page: FormField;
  constructor(){
    super();
    this.per_page = new FormField(10, true, [Validations.NUMBER, [Validations.BETWEEN, 1, 100]])
  }
}