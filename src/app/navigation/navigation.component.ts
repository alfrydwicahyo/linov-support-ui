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
  constructor( private router: Router,@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.name = this.storage.get('name')
    console.log(this.storage);
    this.checkLogin()
  }

  checkLogin(){
    if(this.name == null){
      this.router.navigate(['/'])
    }
  }

  logout(){
    this.storage.remove('id');
    this.storage.remove('name');
    this.storage.remove('role');
    this.router.navigate(['/']);
  }

}
