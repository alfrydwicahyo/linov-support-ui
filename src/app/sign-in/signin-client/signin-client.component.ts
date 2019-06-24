import { Message, MenuItem } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Session } from './session';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { error } from 'util';
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-signin-client',
  templateUrl: './signin-client.component.html',
  styleUrls: ['./signin-client.component.css']
})
export class SigninClientComponent implements OnInit {
  
  private items: MenuItem;
  msgs: Message[] = [];
  loginForm: FormGroup;
  private url = 'http://localhost:8181/user/login';
  getcus: any[];
  session: Session;
  
  
  
  constructor(private FormBuilder: FormBuilder, private http: Http, private router: Router,@Inject(LOCAL_STORAGE) private storage: WebStorageService) 
  { }
  
  ngOnInit() {
    this.createForm();
    this.checkLogin()
  }

  checkLogin(){
    let name = this.storage.get('name');
    if(name != null){
      this.router.navigate(['/home'])
    }
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
    let username = data.username;
    let password = data.password;
    


    this.http.get(this.url + '/' + username + '/' + password).subscribe( res=> {

      let id: String = res.json().id;
      let name: String = res.json().name;

      this.storage.set('id',id);
      this.storage.set('name', name);
      // this.storage.remove('id');
      // this.storage.remove('name');
      this.router.navigate(['/home'])
      console.log(this.storage);
      }
    );

      
     // .map(res => res.json() as Session).subscri
      // .map(res => res.json() as Session)
      // .subscribe(res => {
      //   console.log(res.json());
      //   this.router.navigate(['/home'])
      // },error => {
      //   this.showError()
      // })
    // try {
    //   this.http.post(this.url, data)
    //   .subscribe 
    //   (res=> {
    //     console.log(res);
    //     this.showSuccess();
        
    //     this.router.navigate(['/home'])

    //     console.log(data);
        
    //   },
    //   error => {
    //     console.log(error);
    //     this.showError();
    //   })
      
    //   // setTimeout(() => {
    //   //   alert('done!');
    //   // }, 1000);
      
    // } catch(e) {
    //   console.log(e);
    // } 
  }
  
}