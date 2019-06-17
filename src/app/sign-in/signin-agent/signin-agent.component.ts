import { Component, OnInit } from '@angular/core';
import { Message, MenuItem } from 'primeng/primeng';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-agent',
  templateUrl: './signin-agent.component.html',
  styleUrls: ['./signin-agent.component.css']
})
export class SigninAgentComponent implements OnInit {
  
  private items: MenuItem;
  msgs: Message[] = [];
  adminForm: FormGroup;
  private url = 'http://localhost:8181/admin/login/';
  
  constructor(private FormBuilder: FormBuilder, private http: Http, private router: Router) { }
  
  ngOnInit() {
    this.createForm();
  }
  
  createForm() {
    this.adminForm = this.FormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  
  showSuccess() {
    this.msgs = [{severity:'success', summary:'Confirmed', detail:'Welcome To LinovSupport' }];
  }
  
  showError() {
    this.msgs.push({severity:'error', summary:'Error', detail:'Wrong Username And Password'});
  }
  
  onSubmit(data) {
    // let username = this.loginForm.get('username').value;
    // let pass = this.loginForm.get('password').value;
    
    // this.signService.checkSign()
    // .map(res => res.json() as Session).subscribe(r=> {
    //   this.dataSession = r;
    //   this.storage.set('id', this.dataSession.id);
    // })
    
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
