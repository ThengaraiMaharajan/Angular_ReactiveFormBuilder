import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamicReactiveFormBuilding';
  constructor(
    private fb: FormBuilder
  ){}

  dynamicForm!: FormGroup;
  dynamicJsonForm: any;
  minDate: string = '';
  dynamicFormValues : any;
  formFields!: FormGroup;

  ngOnInit(){

    this.formFields = this.fb.group({
      items: this.fb.array([this.createItem()])
    });

    this.dynamicForm = this.fb.group({});
    this.minDate = new Date().toISOString().split('T')[0];
    this.dynamicReactiveForm();
  }

  get a() {
    return this.dynamicForm.controls;
  }
  formSubmitted: boolean = false;

  get items() {
    return this.formFields.get('items') as FormArray;
  }

  createItem() {
    return this.fb.group({
      name: '',
      label : '',
      value :'',
      type:'',
      placeholder : '',
      validatorPresence : false,
      validators: this.fb.group({
        required: false,
        minLength:'',
        maxLength:'',
        pattern:'',
        min : '',
        max : ''
      }),
      options: this.fb.array([])
    });
  }

  addItem() {
    this.items.push(this.createItem());
  }

  addOption(itemIndex: number) {
    const item = this.items.at(itemIndex);
    const optionsArray = item.get('options') as FormArray;
    optionsArray.push(this.fb.group({
      valueLabel: ''
    }));
  }
  removeOption(itemIndex: number, optionIndex: number) {
    const item = this.items.at(itemIndex);
    const optionsArray = item.get('options') as FormArray;
    optionsArray.removeAt(optionIndex);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  generateForm(){
    this.dynamicJsonForm = this.formFields.value;
    this.dynamicReactiveForm();
  }

  dynamicReactiveForm() {
    for (let formFields of this.dynamicJsonForm.items) {
      let validatorsToAdd: any = [];
      console.log(formFields);
      if (formFields.validatorPresence) {
        for (let key in formFields.validators) {
          let value = formFields.validators[key];
          console.log(key, ':', value);
          switch (key) {
            case 'required':
              validatorsToAdd.push(Validators.required);
              break;
            case 'minLength':
              validatorsToAdd.push(Validators.minLength(value));
              break;
            case 'maxLength':
              validatorsToAdd.push(Validators.maxLength(value));
              break;
            case 'pattern':
              validatorsToAdd.push(Validators.pattern(value));
              break;
            case 'min':
              validatorsToAdd.push(Validators.min(value));
              break;
            case 'max':
              validatorsToAdd.push(Validators.max(value));
              break;
          }
        }
        // this.dynamicForm.addControl(formFields.name,this.fb.control(formFields.value,validatorsToAdd));
        this.dynamicForm.addControl(
          formFields.name,
          this.fb.control('', validatorsToAdd)
        );
      } else {
        this.dynamicForm.addControl(
          formFields.value,
          this.fb.control(formFields.value)
        );
      }
    }
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.dynamicForm.invalid) {
      alert('form is invalid');
      // console.log('isValidForm : ', this.dynamicForm.valid);
      // console.log('submitted form : \n', this.dynamicForm.value);
      this.dynamicFormValues = this.dynamicForm.value;
    } else {
      alert('form is submitted');
      // console.log('isValidForm : ', this.dynamicForm.valid);
      // console.log('submitted form : \n', this.dynamicForm.value);
      this.dynamicFormValues = this.dynamicForm.value;
    }
  }

  today = new Date();
  maxDate = new Date();
  selectedCheckBoxArr : any[] = []
  onCheckBoxChecked( e : any, formName : string ){
    if(e.target.checked){
      this.selectedCheckBoxArr.push(parseInt(e.target.value));
      this.dynamicForm.get(formName)?.setValue(this.selectedCheckBoxArr); 
    }else{
      this.selectedCheckBoxArr.filter(item => item == parseInt(e.target.value));
    }
  }

}
