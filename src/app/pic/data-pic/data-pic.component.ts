import { MenuItem } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-pic',
  templateUrl: './data-pic.component.html',
  styleUrls: ['./data-pic.component.css']
})
export class DataPicComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  pics: any[];
  private url= 'http://localhost:8181/map/';
  
  selectedPIC: any[];
  displayDialog: boolean;
  
  constructor(private http: Http) { }
  
  ngOnInit() {
    this.getDataPIC();
    this.breadCrumb();
  }
  
  breadCrumb() {
    this.items = [
      {label:'Mapping', url:'http://localhost:4200/mapping'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  getDataPIC() {
    this.http.get(this.url)
    .subscribe(response => {
      this.pics = response.json();
      console.log(this.pics);
    })
  }
  
  selectPIC(pic: any[]) {
    this.selectedPIC = pic;
    this.displayDialog = true;
  }
  
  onDialogHide() {
    this.selectedPIC = null;
  }
  
}
