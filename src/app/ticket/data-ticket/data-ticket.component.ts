import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-data-ticket',
  templateUrl: './data-ticket.component.html',
  styleUrls: ['./data-ticket.component.css'],
  providers: [ConfirmationService]
})
export class DataTicketComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  ticketOpen: any[];
  ticketClose: any[];
  ticketReopen: any[];
  private urlOpen= 'http://localhost:8181/ticket/hdr/status/open/';
  private urlClose= 'http://localhost:8181/ticket/hdr/status/close/';
  private urlReopen= 'http://localhost:8181/ticket/hdr/status/reopen/';

  status: string = 'open';
  
  constructor(private http: Http, private confirmationService: ConfirmationService) { }
  
  ngOnInit() {
    this.breadCrumb();
    this.getTicketOpen();
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
  
  
}
