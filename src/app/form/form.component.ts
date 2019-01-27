import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent  {

    userForm: any;
    firstNameControl: FormControl;

    constructor(private fb: FormBuilder) {

    }
    
    get firstName() {
      return this.userForm.get('firstName') as FormArray;
    }
    
    addFirstName() {
      this.firstName.push(this.fb.control(''));
    }

    get lastName() {
      return this.userForm.get('lastName');
    }

    onSubmit() {
      console.warn(this.userForm.value);
    }
    NotLastName(AC: AbstractControl) {
      let lastName = AC.get('lastName').value;
      if (lastName == 'Amadeusz') {
        console.log('false');
        AC.get('lastName').setErrors({NotName: true})
      } else {
        console.log('true');
        return null
      }
    }
  

  ngOnInit() {
    this.firstNameControl = this.fb.control('', [Validators.required, Validators.minLength(4)]);


    this.userForm = this.fb.group({
        'lastName': ['', Validators.required],
        'firstName': this.fb.array([
          this.fb.control('')
        ])
        
      },
      {
        validators: [this.NotLastName]
      });
  }
}