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
  private idAgent: string;
  
  
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
    


    this.http.get(this.url + '/' + username + '/' + password)
    .subscribe( res=> {
      console.log(res.json());
      let id: String = res.json().id;
      let name: String = res.json().name;
      let email: String = res.json().email;
      let role: String = res.json().role;
      let status: String = res.json().status;

      this.storage.set('id',id);
      this.storage.set('name', name);
      this.storage.set('email', email);
      this.storage.set('role', role);


      if(role == "customer"){
        let companyId = res.json().companyId;
        this.getDataCompany(companyId);
        this.storage.set('companyId',companyId)
      }

      this.router.navigate(['/home'])
      console.log(this.storage);

    },
    err => {
      console.log(err.body());
    });
  }
  getDataCompany(idCompany){
    this.http.get('http://localhost:8181/map/company/'+idCompany)
      .subscribe(res => {
        this.idAgent = res.json().agent.id;
        this.storage.set('idAgent',this.idAgent)
        console.log('Data Agent : ',this.idAgent);
      })
  }
}