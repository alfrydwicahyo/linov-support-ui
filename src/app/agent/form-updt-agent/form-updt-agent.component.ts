import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { MenuItem, ConfirmationService, Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-updt-agent',
  templateUrl: './form-updt-agent.component.html',
  styleUrls: ['./form-updt-agent.component.css'],
  providers: [MessageService]
})
export class FormUpdtAgentComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  msgs: Message[] = [];
  updtForm: FormGroup;
  private url = 'http://localhost:8181/agent/';
  getAgent: any[];
  
  idUpdt: any;
  
  constructor(private formBuilder: FormBuilder, private http: Http, private confirmationService: ConfirmationService, private URILast: ActivatedRoute) { 
    this.URILast.params.subscribe(param => this.idUpdt = param.id);
  }
  
  ngOnInit() {
    this.breadCrumb();
    this.addAgentForm();
    this.loadData();
  }
  
  breadCrumb() {
    this.items = [
      {label:'Agent', url:'http://localhost:4200/agent'},
      {label:'Update', url:'http://localhost:4200/agent/form-agent/' + this.idUpdt}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  loadData() {
    this.http.get(this.url + this.idUpdt)
    .subscribe(response => {
      this.updtForm.patchValue(response.json());
      console.log(response.json());
    })
    
    // console.log(this.idUpdt);
  }
  
  addAgentForm() {
    this.updtForm = this.formBuilder.group({
      // id: [''],
      name: [''],
      status: ['']
    })
  }
  
  confirmCreate(data) {
    this.confirmationService.confirm({
      message: 'Do you want to save this record ?',
      header: 'Save Confirmation',
      icon: "fa-save",
      accept: () => {
        this.msgs = [{severity:'success', summary:'Confirmed', detail:'Record saved'}];
        
        this.onFormUpdate(data);
        
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
  
  onFormUpdate(data) 
  {
    
    
    try {
      this.http.patch('http://localhost:8181/agent/status/'+ this.idUpdt, data)
      .subscribe 
      (res=> {
        console.log(res);
        // this.showSuccess();
        console.log(this.idUpdt.value);
        
      },
      error => {
        console.log(error);
        console.log(this.idUpdt);
        // this.showError();
      })
      
      // setTimeout(() => {
      //   alert('done!');
      // }, 1000);
      
      this.updtForm.reset();
    } catch(e) {
      console.log(e);
    } 
  }
  
}
