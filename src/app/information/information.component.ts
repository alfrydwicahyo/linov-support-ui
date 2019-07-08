import { Http } from '@angular/http';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  changeForm: FormGroup;
  private url = 'http://localhost:8181/user/';

  constructor(private formBuilder: FormBuilder, private http: Http) { }
  
  ngOnInit() {
    this.breadCrumb();
    
  }
  
  breadCrumb() {
    this.items = [
      {label:'Change-Password', url:'http://localhost:4200/information'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  changePasswordForm() {
    this.changeForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    })
  }
  
  private prepareSave(): any {
    let input = new FormData();
    
    input.append('oldPassword', this.changeForm.get('oldPassword').value),
    input.append('newPassword', this.changeForm.get('newPassword').value)
    
    console.log(input);
    return input;
  }

  // onFormChange() {
  //   const formModel = this.prepareSave();

  //   let json = formModel;
  //   console.log(json);

  //   try {
  //     this.http.patch(this.url + , json)
  //   }
  // }
  
}
