import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit {

  private items: MenuItem[];
  home: MenuItem;
  private url = 'http://localhost:8181/ticket/hdr';
  private idTicket: string;
  private ticket: any;

  constructor(private http: Http, private URILast: ActivatedRoute) {
    this.URILast.params.subscribe(param => this.idTicket = param.id)
  }

  ngOnInit() {
    this.breadCrumb()
    this.getDataTicket()
  }

  breadCrumb() {
    this.items = [
      {label:'Agent', url:'http://localhost:4200/agent'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }

  getDataTicket(){
    this.http.get(this.url + '/' + this.idTicket)
      .subscribe(res => console.log(res.json()))
  }

}
