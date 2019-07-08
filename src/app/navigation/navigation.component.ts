import { Component, OnInit, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  private name: String;
  private email: String;
  private activeMenu : Boolean = true;

  constructor( private router: Router,@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.name = this.storage.get('name')
    this.email = this.storage.get('email')
    if(this.storage.get('role') == "customer"){
      this.activeMenu = !this.activeMenu;
    }

    if(this.storage.get('role') == "agent"){
      this.activeMenu = !this.activeMenu;
    }

    console.log('menu status',this.activeMenu);
    this.checkLogin()
    console.log(this.storage);
  }

  checkLogin(){
    if(this.name == null){
      this.router.navigate(['/'])
    }
  }

  logout(){
    this.storage.remove('id');
    this.storage.remove('name');
    this.storage.remove('email');
    this.storage.remove('role');
    this.storage.remove('companyId')
    this.storage.remove('idAgent')
    this.router.navigate(['/']);
  }

}
