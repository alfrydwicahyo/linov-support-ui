import { Http } from '@angular/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

@Component({
  selector: 'app-data-ticket',
  templateUrl: './data-ticket.component.html',
  styleUrls: ['./data-ticket.component.css']
})
export class DataTicketComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  ticketOpen: any[];
  ticketClose: any[];
  ticketReopen: any[];
  ticketByRole: any[];

  private urlOpen= 'http://localhost:8181/ticket/hdr/status/open/';
  private urlClose= 'http://localhost:8181/ticket/hdr/status/close/';
  private urlReopen= 'http://localhost:8181/ticket/hdr/status/reopen/';
  private role: String;
  private idUser: String;

  private urlByRole = 'http://localhost:8181/ticket/hdr/'
  
  constructor(private http: Http, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  
  ngOnInit() {
    this.breadCrumb();

    this.idUser = this.storage.get('id');
    this.role = this.storage.get('role');

    if(this.role == "customer"){
//      this.getTicketByRole(this.role, this.idUser);
      console.log(this.idUser+" - "+this.role,"session");
    }else if(this.role == "agent"){
      console.log("ini customer");
    }else{
      console.log("ini admin");
    }
    this.getTicketOpen();
    this.getTicketClose();
    this.getTicketReopen();
  }
  
  breadCrumb() {
    this.items = [
      {label:'Ticket', url:'http://localhost:4200/ticket'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  getTicketOpen() {
    this.http.get(this.urlOpen)
    .subscribe(response => {
      this.ticketOpen = response.json();
      console.log(response.json());
    })
  }
  
  getTicketClose() {
    this.http.get(this.urlClose)
    .subscribe(response => {
      this.ticketClose = response.json();
      console.log(response.json());
    })
  }

  getTicketReopen() {
    this.http.get(this.urlReopen)
    .subscribe(response => {
      this.ticketReopen = response.json();
      console.log(response.json());
    })
  }

  getTicketByRole(role: String, id: String){
    this.http.get(this.urlByRole + role + '/' + id)
    .subscribe(res => {
      this.ticketByRole = res.json();
      console.log(res.json());
    })
  }
  
  
}
