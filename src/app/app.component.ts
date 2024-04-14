import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dynamicReactiveFormBuilding';
  dynamicForm!: FormGroup;
  dynamicJsonForm: any;
  minDate: string = '';
  dynamicFormValues : any;
  formFields!: FormGroup;
  showForms : boolean = false;
  formSubmitted: boolean = false;
  today = new Date();
  maxDate = new Date();
  selectedCheckBoxArr : any[] = [];
  generateFormButtonClicked : boolean = false;

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(){

    this.formFields = this.fb.group({
      items: this.fb.array([this.createItem()])
    });

    this.dynamicForm = this.fb.group({});
    this.minDate = new Date().toISOString().split('T')[0];
     
  }

  get a() {
    return this.dynamicForm.controls;
  }

  get items() {
    return this.formFields.get('items') as FormArray;
  }

  createItem() {
    return this.fb.group({
      name:  ['',[Validators.required]],
      label : '',
      value :'',
      type: ['',[Validators.required]],
      placeholder : '',
      validatorPresence :  [false,[Validators.required]],
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
      valueLabel: '',
      id:''
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
    this.dynamicJsonForm = this.formFields.value.items;
    this.dynamicReactiveForm(this.formFields.value.items);
  }

  dynamicReactiveForm(formFieldsJson : any) {
    this.showForms = true;
    for (let formFields of formFieldsJson) {
      let validatorsToAdd: any = [];
      console.log('Form fields Json \n',formFields);
      if (formFields.validatorPresence === "true") {
        for (let key in formFields.validators) {
          let value = formFields.validators[key];
          console.log('Validators Key Value Pair \n',key, ':', value);
          if(value !== ""){
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
        }
        // this.dynamicForm.addControl(formFields.name,this.fb.control(formFields.value,validatorsToAdd));
        this.dynamicForm.addControl(formFields.name,new FormControl('', validatorsToAdd)
        );
      } else {
        this.dynamicForm.addControl(formFields.name,new FormControl(formFields.value)
        );;
      }
    }
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.dynamicForm.invalid) {
      console.log('isValidForm : ', this.dynamicForm.valid);
      console.log('submitted form : \n', this.dynamicForm);
      console.log('submitted form : \n', this.dynamicForm.value);
      this.dynamicFormValues = this.dynamicForm.value;
    } else {
      console.log('isValidForm : ', this.dynamicForm.valid);
      console.log('submitted form : \n', this.dynamicForm);
      console.log('submitted form : \n', this.dynamicForm.value);
      this.dynamicFormValues = this.dynamicForm.value;
    }
  }

  onCheckBoxChecked( e : any, formName : string ){
    if(e.target.checked){
      this.selectedCheckBoxArr.push(parseInt(e.target.value));
      this.dynamicForm.get(formName)?.setValue(this.selectedCheckBoxArr); 
    }else{
      this.selectedCheckBoxArr.filter(item => item == parseInt(e.target.value));
    }
  }

}
