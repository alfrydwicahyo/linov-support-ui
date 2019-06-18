import { MenuItem, ConfirmationService, Message } from 'primeng/primeng';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-client',
  templateUrl: './data-client.component.html',
  styleUrls: ['./data-client.component.css'],
  providers: [ConfirmationService]
})
export class DataClientComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  private url= 'http://localhost:8181/company/';
  
  active: any[];
  private urlActive= 'http://localhost:8181/company/status/active';
  
  nonactive: any[];
  private urlNonActive= 'http://localhost:8181/company/status/nonactive';
  
  msgs: Message[] = [];
  delRow: any;
  numRows: any;
  sortF: any;
  
  status: string = 'active';

  constructor(private http: Http, private confirmationService: ConfirmationService) { }
  
  ngOnInit() {
    this.breadCrumb();
    this.getDataActive();
  }
  
  breadCrumb() {
    this.items = [
      {label:'Client', url:'http://localhost:4200/client'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  changeSort(event) {
    if (!event.order) {
      this.sortF = 'companyCode';
    } else {
      this.sortF = event.field;
    }
  }
  
  getDataActive() {
    this.http.get(this.urlActive)
    .subscribe(response => {
      this.active = response.json();
    })
  }
  
  getDataNonActive() {
    this.http.get(this.urlNonActive)
    .subscribe(response => {
      this.nonactive = response.json();
    })
  }
  
  confirmDeleteActive(row) {
    this.confirmationService.confirm({
      message: 'Do you want to delete ' + row.companyName +'?',
      header: 'Delete Confirmation',
      icon: "fa-trash",
      accept: () => {
        this.msgs = [{severity:'success', summary:'Confirmed', detail:'Record deleted'}];
        this.deleteDataActive(row);
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
  
  confirmDeleteNonActive(row) {
    this.confirmationService.confirm({
      message: 'Do you want to delete ' + row.companyName +'?',
      header: 'Delete Confirmation',
      icon: "fa-trash",
      accept: () => {
        this.msgs = [{severity:'success', summary:'Confirmed', detail:'Record deleted'}];
        this.deleteDataNonActive(row);
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
  
  deleteDataActive(row) {
    
    console.log(row);
    this.delRow = this.active.indexOf(row);
    this.active.splice(this.delRow,1);
    this.numRows = this.active.length;
    
    try {
      this.http.delete(this.url + row.id)
      .subscribe(res => {
        this.getDataActive()
      },
      error => {
        console.log(error);
      })
    } catch(e) {
      console.log(e);
    }    
  }
  
  deleteDataNonActive(row) {
    
    console.log(row);
    this.delRow = this.nonactive.indexOf(row);
    this.nonactive.splice(this.delRow,1);
    this.numRows = this.nonactive.length;
    
    try {
      this.http.delete(this.url + row.id)
      .subscribe(res => {
        this.getDataNonActive()
        console.log(this.url + row.id);
      },
      error => {
        console.log(error);
      })
    } catch(e) {
      console.log(e);
    }    
  }
  
}
