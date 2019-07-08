import { Clients } from './../../client/data-client/Client';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { MessageService } from 'primeng/components/common/messageservice';
import { Message, MenuItem, ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'app-form-agent',
  templateUrl: './form-agent.component.html',
  styleUrls: ['./form-agent.component.css'],
  providers: [MessageService]
})
export class FormAgentComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  msgs: Message[] = [];
  agentForm: FormGroup;
  private url = 'http://localhost:8181/agent/';
  // selectedFile: File = null;
  getClients: any[];
  
  constructor(private formBuilder: FormBuilder, private http: Http, private confirmationService: ConfirmationService) { }
  
  ngOnInit() {
    this.breadCrumb();
    this.addAgentForm();
    // this.getDataClient();
  }
  
  breadCrumb() {
    this.items = [
      {label:'Agent', url:'http://localhost:4200/agent'},
      {label:'Add', url:'http://localhost:4200/agent/form-agent'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  // getDataClient() {
  //   this.http.get("http://192.168.43.76:8181/company/")
  //   .subscribe(response =>{
  //     this.getClients = response.json();
  //   });
  // }
  
  // onFileSelected(event) {
  //   this.selectedFile = <File>event.target.files[0];
  //   console.log(event);
  // }
  
  addAgentForm() {
    this.agentForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      // pp: null,
      // clients: this.formBuilder.array([])       
    });
  }
  
  get cliFormArray(): FormArray {
    return this.agentForm.get('clients') as FormArray;
  }
  
  addClient() {
    let fg = this.formBuilder.group(new Clients());
    this.cliFormArray.push(fg);
  }
  
  deleteClient(idx: number) {
    this.cliFormArray.removeAt(idx);
  }
  
  private prepareSave(): any {
    let input = new FormData();
    
    input.append('username', this.agentForm.get('username').value);
    input.append('name', this.agentForm.get('name').value);
    input.append('email', this.agentForm.get('email').value);
    // input.append('pp', this.selectedFile, this.selectedFile.name);
    // input.append('cleint', this.agentForm.get('client').value);
    
    console.log(input);
    return input;
  }

  confirmCreate() {
    this.confirmationService.confirm({
      message: 'Do you want to save this record ?',
      header: 'Save Confirmation',
      icon: "fa-save",
      accept: () => {
        this.msgs = [{severity:'success', summary:'Confirmed', detail:'Record saved'}];
        this.onFormSubmit();
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });
  }
  
  onFormSubmit() 
  {
    const formModel = this.prepareSave();
    
    let json = formModel;
    console.log(json);
    
    try {
      this.http.post(this.url, json)
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
      
      this.agentForm.reset();
    } catch(e) {
      console.log(e);
    } 
  }
  
}
