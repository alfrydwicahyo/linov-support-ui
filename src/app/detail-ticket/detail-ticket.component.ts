import { Component, OnInit, Inject } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';

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
  private sender: string = "A";
  private role: String;
  private active : Boolean = true;
  
  constructor(private http: Http, private URILast: ActivatedRoute, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.URILast.params.subscribe(param => this.idTicket = param.id)
  }
  
  ngOnInit() {
    this.role = this.storage.get('role')
    if(this.role == "admin"){
      this.active = false;
    }
    console.log(this.active);
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
    this.http.get
    (this.url + '/' + this.idTicket)
    .subscribe(res => {
      this.ticket = res.json()
      console.log(res.json())
    })
  }
  
  onChangeStatus(event){
    let status = event.target.value;
    let body = {
      "status": status
    }
    
    this.http.patch('http://localhost:8181/ticket/hdr/' + this.idTicket, body)
    .subscribe(res => console.log(res))
  }
  
  // scrollTo(idName: string):void{
  //   // const elementList = document.querySelectorAll('.' + idName);
  //   // const element = elementList[0] as HTMLElement;
  //   // element.scrollIntoView({behavior: "smooth"})
  //   let el = document.getElementById(idName);
  //   el.scrollIntoView();
  // }
  
}
