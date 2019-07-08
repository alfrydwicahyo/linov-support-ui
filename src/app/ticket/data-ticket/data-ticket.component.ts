import { Http } from '@angular/http';
import { Component, OnInit, Inject } from '@angular/core'; 
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
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
  ticketByRole: any[];

  private urlOpen= 'http://localhost:8181/ticket/hdr/status/open/';
  private urlClose= 'http://localhost:8181/ticket/hdr/status/close/';
  private urlReopen= 'http://localhost:8181/ticket/hdr/status/reopen/';

  status: string = 'open';
  private role: String;
  private idUser: String;
  private active : Boolean = true;

  private urlByRole = 'http://localhost:8181/ticket/hdr/'
  
  constructor(private http: Http, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  ngOnInit() {
    this.breadCrumb();
    this.idUser = this.storage.get('id');
    this.role = this.storage.get('role');

    if(this.role == "customer"){
      console.log(this.idUser+" - "+this.role,"session");
    }else if(this.role == "agent"){
      this.active = false;
      console.log("ini customer");
    }else{
      this.active = false;
      console.log("ini admin");
    }
    this.getTicketOpen();
    console.log(this.active);
  }
  
  breadCrumb() {
    this.items = [
      {label:'Ticket', url:'http://localhost:4200/ticket'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }

  getTicketOpen() {
    // if(this.role == "agent"){
    //   this.filterTicket(this.role, this.idUser,"open")
    // }

    // if(this.role == "customer"){
    //   this.filterTicket(this.role, this.idUser ,"open")
    // }

    if(this.role == "admin"){
      this.http.get(this.urlOpen)
      .subscribe(response => {
        this.ticketOpen = response.json();
        console.log(response.json());
      })
    }else{
      this.filterTicket(this.role, this.idUser ,"open")
    }

  }
  
  getTicketClose() {
    // if(this.role == "agent"){
    //   this.filterTicket(this.role, this.idUser,"close")
    // }

    // if(this.role == "customer"){
    //   this.filterTicket(this.role, this.idUser ,"close")
    // }

    this.http.get(this.urlClose)
    .subscribe(response => {
      this.ticketClose = response.json();
      console.log(response.json());
    })
    // if(this.role == "admin"){
    // }else {
    //   this.filterTicket(this.role, this.idUser ,"close")
    // }
  }

  getTicketReopen() {
    // if(this.role == "agent"){
    //   this.filterTicket(this.role, this.idUser,"reopen")
    // }

    // if(this.role == "customer"){
    //   this.filterTicket(this.role, this.idUser ,"reopen")
    // }

    if(this.role == "admin"){
      this.http.get(this.urlReopen)
      .subscribe(response => {
        this.ticketReopen = response.json();
        console.log(response.json());
      })
    } else {
      this.filterTicket(this.role, this.idUser,"reopen")
    }
  }
  
  filterTicket(role: String, id: String, status: String){
    this.http.get('http://localhost:8181/ticket/hdr/'+role+'/'+id+'/'+status)
    .subscribe(res => {
      if(status == "open"){
        this.ticketOpen = res.json();
        console.log('open',res.json());
      }
      if(status == "close"){
        this.ticketClose = res.json();
        console.log('close',res.json());
      }
      if(status == "reopen"){
        this.ticketReopen = res.json();
        console.log('reopen',res.json());
      }
    })
  }
}
