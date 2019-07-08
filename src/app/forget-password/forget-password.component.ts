import { Http } from '@angular/http';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent implements OnInit {
  
  resetForm: FormGroup;
  private url = 'http://localhost:8181/user/reset/';

  constructor(private formBuilder: FormBuilder, private http: Http) { }
  
  ngOnInit() {
    this.resetPasswordForm();
  }
  
  resetPasswordForm() {
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }
  
  private prepareSave(): any {
    let input = new FormData();
    
    input.append('username', this.resetForm.get('username').value);
    
    console.log(input);
    return input;
  }
  
  onFormReset() {
    const formModel = this.prepareSave();
    
    let json = formModel;
    console.log(json);
    
    try {
      this.http.patch(this.url, json)
      .subscribe
      (res => {
        console.log(res);
      },
      error => {
        console.log(error);
        // this.showError();
      })
    } catch(e) {
      console.log(e);
    }
  }
}
