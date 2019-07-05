import { Component, OnInit, Inject } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.css']
})
export class DetailTicketComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
//  private url = 'http://localhost:8181/ticket/hdr'; // ori
  private url = 'http://localhost:8181/ticket/hdr/test'; // test
  private urlReply = 'http://localhost:8181/ticket/dtl/';
  private idTicket: string;
  private ticket: any;
  private sender: string;
  private role: String;
  private name: String;
  private active : Boolean = true;
  private defaultSender: String = "A";
  private identityAgent:String;
  private identityCustomer:String;
  private pesan: FormGroup;
  private selectedFile: File = null;
  private pathImg: any;
  
  constructor(private formBuilder: FormBuilder,private http: Http, private URILast: ActivatedRoute, @Inject(LOCAL_STORAGE) private storage: WebStorageService) {
    this.URILast.params.subscribe(param => this.idTicket = param.id)
  }
  
  ngOnInit() {
    this.role = this.storage.get('role')
    if(this.role == "admin"){
      this.active = false;
    }
    
    if(this.role == "agent"){
      this.sender = "A";
    }
    
    if(this.role == "customer"){
      this.sender = "C";
    }
    
    console.log('status sender : ',this.sender);
    console.log('saya adalah : ',this.role);
    this.breadCrumb()
    this.getDataTicket()
    this.initForm()
    // setInterval(()=> {
    //   this.getDataTicket()
    // },2000)
  }
  
  breadCrumb() {
    this.items = [
      {label:'Ticket', url:'http://localhost:4200/ticket/'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  getDataTicket(){
    this.http.get
    (this.url + '/' + this.idTicket)
    .subscribe(res => {
      if(this.role == "agent"){
        this.identityAgent = res.json().agent.name;
        this.identityCustomer = res.json().customer.name;
        console.log('identity : agent');
      }
      
      if(this.role == "customer"){
        this.identityAgent = res.json().agent.name;
        this.identityCustomer = res.json().customer.name;
        console.log('identity : customer');
      }
      
      this.ticket = res.json()
      console.log('ini tiket',res.json())
      
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
  
  initForm(){
    this.pesan = this.formBuilder.group({
      sender: this.sender,
      message: ['']
    })
  }
  
  sendMessage(){
    let data = new FormData();
    data.append('detailTicket', JSON.stringify(this.pesan.value));
    data.append('ss',this.selectedFile, this.selectedFile.name)
    this.http.post(this.urlReply + this.idTicket, data)
    .subscribe(res => {
      this.getDataTicket()
      this.pesan.reset()
      console.log(res);
    })
  }

  onFileSelected(event){
    let reader = new FileReader();
    this.selectedFile = <File>event.target.files[0];

    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.pathImg = reader.result
    }

    console.log(event);
  }
  
  // scrollTo(idName: string):void{
  //   // const elementList = document.querySelectorAll('.' + idName);
  //   // const element = elementList[0] as HTMLElement;
  //   // element.scrollIntoView({behavior: "smooth"})
  //   let el = document.getElementById(idName);
  //   el.scrollIntoView();
  // }
  
  
  
}
