import { FormField, FormService } from '../services/form.service';
import { Validations } from '../services/validations.service';
import { BaseModel } from './baseModel';

export class UserModel extends BaseModel {
  user_name: FormField;
  constructor(){
    super();
    this.user_name = new FormField("", true, [Validations.EMPTY])
  }
}