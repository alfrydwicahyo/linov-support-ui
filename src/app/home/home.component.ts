import { Component, OnInit, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private name: String;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) { }

  ngOnInit() {
    this.name = this.storage.get('name')
  }

}
