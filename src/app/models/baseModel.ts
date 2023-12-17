import { FormService } from '../services/form.service';

export abstract class BaseModel {
  reset() {
    FormService.reset(this);
  }
  validate() {
    return FormService.validate(this);
  }
  getData() {
    return FormService.getData(this);
  }
  disable() {
    FormService.disable(this);
  }
  enable() {
    FormService.enable(this)
  }
}