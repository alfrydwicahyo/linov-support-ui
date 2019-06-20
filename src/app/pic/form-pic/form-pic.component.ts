import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { MenuItem, ConfirmationService, Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-pic',
  templateUrl: './form-pic.component.html',
  styleUrls: ['./form-pic.component.css'],
  providers: [MessageService]
})
export class FormPicComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  msgs: Message[] = [];
  mapForm: FormGroup;
  private url = 'http://localhost:8181/map/';
  getAgent: any[];
  getClient: any[];
  
  
  idUpdt: any;

  selectedCar2: string = '';
  
  constructor(private formBuilder: FormBuilder, private http: Http, private confirmationService: ConfirmationService, private URILast: ActivatedRoute) { 
    this.URILast.params.subscribe(param => this.idUpdt = param.id);
  }
  
  ngOnInit() {
    this.breadCrumb();
    this.addPICForm();
    this.getAgents();
    this.getClients();
    
    if(this.idUpdt != undefined)  {
      console.log(this.idUpdt);
      this.loadDataMaping();
    } else {
      console.log(this.idUpdt,'idd');
    }
  }
  
  breadCrumb() {
    this.items = [
      {label:'PIC', url:'http://localhost:4200/pic'},
      {label:'Update', url:'http://localhost:4200/pic/form-pic/' + this.idUpdt}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  loadDataMaping() {
    this.http.get(this.url + this.idUpdt)
    .subscribe(response => {
      this.mapForm.patchValue(response.json());
      console.log(response.json());
    })
  }
  
  getAgents() {
    this.http.get("http://localhost:8181/agent/")
    .subscribe(response =>{
      this.getAgent = response.json();
      console.log(response.json());
    });
  }
  
  getClients() {
    this.http.get("http://localhost:8181/company/")
    .subscribe(response =>{
      this.getClient = response.json();
      console.log(response.json());
    });
  }
  
  addPICForm() {
    this.mapForm = this.formBuilder.group({
      id: [''],
      agent: this.formBuilder.group({
        id: ['']
      }),
      company: this.formBuilder.group({
        id:['']
      })
    });
    
  }
  
  confirmCreate() {
    this.confirmationService.confirm({
      message: 'Do you want to save this record ?',
      header: 'Save Confirmation',
      icon: "fa-save",
      accept: () => {
        this.msgs = [{severity:'success', summary:'Confirmed', detail:'Record saved'}];
        // this.onFormSubmit();
        
        if(this.idUpdt != undefined) {
          console.log(this.idUpdt);
          this.onFormUpdate();
        } else {
          console.log(this.idUpdt);
          this.onFormSubmit();
        }
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
  
  onFormSubmit() 
  {
    
    try {
      this.http.post(this.url, this.mapForm.value)
      .subscribe 
      (res=> {
        console.log(res);
        // this.showSuccess();
        
      },
      error => {
        console.log(error);
        // this.showError();
      })
      
      // setTimeout(() => {
      //   alert('done!');
      // }, 1000);
      
      this.mapForm.reset();
    } catch(e) {
      console.log(e);
    } 
  }
  
  onFormUpdate() 
  {
    
    try {
      this.http.put(this.url, this.mapForm.value)
      .subscribe 
      (res=> {
        console.log(res);
        // this.showSuccess();
        console.log(this.mapForm.value);
        
      },
      error => {
        console.log(error);
        // this.showError();
      })
      
      // setTimeout(() => {
      //   alert('done!');
      // }, 1000);
      
      this.mapForm.reset();
    } catch(e) {
      console.log(e);
    } 
  }
  
}
