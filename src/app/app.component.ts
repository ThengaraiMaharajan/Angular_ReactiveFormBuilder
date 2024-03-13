import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  ngOnInit(){
    this.dynamicForm = this.fb.group({});
    this.minDate = new Date().toISOString().split('T')[0];
    this.dynamicReactiveForm();
  }

  get a() {
    return this.dynamicForm.controls;
  }
  formSubmitted: boolean = false;

  dynamicReactiveForm() {
    this.dynamicJsonForm = {
      controls: [
        {
          name: 'firstName',
          label: 'First Name',
          value: '',
          type: 'text',
          placeholder: 'Enter your Name',
          validatorPresence: true,
          validators: {
            required: true,
            minLength: 3,
            maxLength: 50,
            pattern: /^[a-zA-Z]{3,50}$/,
          },
        },
        {
          name: 'dob',
          label: 'Date Of Birth',
          value: '',
          type: 'date',
          placeholder: 'Enter Date of Birth',
          validatorPresence: true,
          minDate: 'particularPast',
          maxDate: 'today',
          particularPast: '5',
          particularFuture: '5',
          validators: {
            required: true,
          },
        },
        {
          name: 'futuredate',
          label: 'Future Date',
          value: '',
          type: 'date',
          placeholder: 'Enter Date of Birth',
          validatorPresence: true,
          minDate: 'today',
          maxDate: 'particularFuture',
          particularPast: '5',
          particularFuture: '5',
          validators: {
            required: true,
          },
        },
        {
          name: 'age',
          label: 'Age',
          value: '',
          type: 'number',
          placeholder: 'Enter your Age',
          validatorPresence: true,
          validators: {
            required: true,
            minLength: 1,
            maxLength: 100,
            min: 18,
            max: 25,
          },
        },
        {
          name: 'email',
          label: 'E-mail',
          value: '',
          type: 'text',
          placeholder: 'Enter your Name',
          validatorPresence: true,
          validators: {
            required: true,
            minLength: 3,
            maxLength: 50,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
        },
        {
          name: 'gender',
          label: 'Gender',
          value: '',
          options: [
            { valueLabel: 'male', id: 1 },
            { valueLabel: 'female', id: 2 },
            { valueLabel: 'Not Willing to mention', id: 3 },
          ],
          type: 'radio',
          placeholder: '',
          validatorPresence: true,
          validators: {
            required: true,
          },
        },
        {
          name: 'bloodgroup',
          label: 'Blood Group',
          value: '',
          options: [
            { valueLabel: 'A+' },
            { valueLabel: 'A-' },
            { valueLabel: 'B+' },
            { valueLabel: 'B-' },
            { valueLabel: 'O+' },
            { valueLabel: 'O-' },
          ],
          type: 'dropdown',
          placeholder: 'Search / Select Option from DropDown',
          validatorPresence: true,
          validators: {
            required: true,
          },
        },
        {
          name : 'interestedCourse',
          label: 'Interested Course',
          value: '',
          options: [
            { valueLabel: 'CSE',id: 1 },{  valueLabel: 'ECE',id: 2 },{ valueLabel: 'E&I',id: 3 }
          ],
          type: 'checkboxMultiple',
          placeholder: '',
          validatorPresence: true,
          validators: {
            required: false,
          },
        },
        // {
        //   name: 'cse',
        //   value: '',
        //   options: [{ id: 1, valueLabel: 'CSE' }],
        //   type: 'checkboxMultiple',
        //   placeholder: '',
        //   validatorPresence: true,
        //   validators: {},
        // },
        // {
        //   name: 'ece',
        //   value: '',
        //   options: [{ id: 2, valueLabel: 'ECE' }],
        //   type: 'checkboxMultiple',
        //   validatorPresence: true,
        //   validators: {},
        // },
        // {
        //   name: 'eni',
        //   value: '',
        //   options: [{ id: 3, valueLabel: 'E&I' }],
        //   type: 'checkboxMultiple',
        //   placeholder: '',
        //   validatorPresence: true,
        //   validators: {},
        // },
        {
          name: 'vehicletype',
          label: 'Mode of Transmission',
          value: '',
          options: [
            { valueLabel: 'Bike', id: 1 },
            { valueLabel: 'Car', id: 2 },
            { valueLabel: 'Boat', id: 3 },
            { valueLabel: 'Flight', id: 4 },
            { valueLabel: 'Tank', id: 5 },
          ],
          type: 'radio',
          placeholder: '',
          validatorPresence: true,
          validators: {
            required: true,
          },
        },
        {
          name: 'vehicletype',
          label: 'Mode of Transmission',
          value: '',
          options: [
            { valueLabel: 'Bike', id: 1 },
            { valueLabel: 'Car', id: 2 },
            { valueLabel: 'Boat', id: 3 },
            { valueLabel: 'Flight', id: 4 },
            { valueLabel: 'Tank', id: 5 },
          ],
          type: 'radio',
          placeholder: '',
          validatorPresence: true,
          validators: {
            required: true,
          },
        },
        {
          name: 'termsandconditions',
          label: 'Terms and Conditions',
          value: '',
          options: [{ valueLabel: 'Terms and Conditions', id: 1000 }],
          termsLink: 'https://www.google.com/',
          type: 'termsandconditions',
          placeholder: '',
          validatorPresence: true,
          validators: {
            required: true,
          },
        },
      ],
    };

    for (let formFields of this.dynamicJsonForm.controls) {
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
