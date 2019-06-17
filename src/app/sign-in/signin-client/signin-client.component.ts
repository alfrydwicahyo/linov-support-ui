import { Message, MenuItem } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Session } from './session';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signin-client',
  templateUrl: './signin-client.component.html',
  styleUrls: ['./signin-client.component.css']
})
export class SigninClientComponent implements OnInit {
  
  private items: MenuItem;
  msgs: Message[] = [];
  loginForm: FormGroup;
  private url = 'http://localhost:8181/customer/login';
  getcus: any[];
  
  
  
  constructor(private FormBuilder: FormBuilder, private http: Http, private router: Router) 
  { }
  
  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.loginForm = this.FormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  showSuccess() {
    this.msgs = [{severity:'success', summary:'Confirmed', detail:'Welcome To LinovSupport' + name}];
  }
  
  showError() {
    this.msgs.push({severity:'error', summary:'Error', detail:'Wrong Username And Password'});
  }
  
  onSubmit(data) {
    
    try {
      this.http.post(this.url, data)
      .subscribe 
      (res=> {
        console.log(res);
        this.showSuccess();
        
        this.router.navigate(['/home'])

        console.log(data);
        
      },
      error => {
        console.log(error);
        this.showError();
      })
      
      // setTimeout(() => {
      //   alert('done!');
      // }, 1000);
      
    } catch(e) {
      console.log(e);
    } 
  }
  
}