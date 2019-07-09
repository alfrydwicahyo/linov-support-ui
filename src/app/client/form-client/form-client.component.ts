import { MessageService } from 'primeng/components/common/messageservice';
import { Customers } from './customers';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { MenuItem, Message, ConfirmationService } from 'primeng/primeng';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css'],
  providers: [MessageService]
})
export class FormClientComponent implements OnInit {
  
  private items: MenuItem[];
  home: MenuItem;
  
  msgs: Message[] = [];
  clientForm: FormGroup;
  custForm: FormGroup;
  private url = 'http://localhost:8181/company/';
  selectedFile: File = null;
  imageSrc: any;
  customer: Customers;
  cusForm: any[];

  constructor
  (private formBuilder: FormBuilder, private http: Http, private confirmationService: ConfirmationService, private URILast: ActivatedRoute) { }
  
  ngOnInit() {
    
    this.breadCrumb();
    this.addClientForm();
    this.addCustomerForm();
  }
  
  breadCrumb() {
    this.items = [
      {label:'Client', url:'http://localhost:4200/client'},
      {label:'Add', url:'http://localhost:4200/client/form-client'}
    ];  
    this.home = {icon: 'fa fa-home', url: 'http://localhost:4200/home'};
  }
  
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event);
    
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      
      reader.readAsDataURL(file);
    }
  }
  
  addClientForm() {
    this.clientForm = this.formBuilder.group({
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      address: ['', Validators.required],
      customers: this.formBuilder.array([]),
      // tes: this.formBuilder.array([])     
    });
  }

  addCustomerForm(){
    this.custForm = this.formBuilder.group(new Customers());
  }
  
  get cusFormArray(): FormArray{
    return this.clientForm.get('customers') as FormArray;
  }
  
  addCustomer(){
    this.cusFormArray.push(this.formBuilder.group(this.custForm.value));
    this.custForm.reset();
    this.cusForm = this.clientForm.get('customers').value; 
    document.getElementById('username').focus();
  }
  
  deleteCustomer(i: number) {
    this.cusFormArray.removeAt(i);
    this.cusForm = this.clientForm.get('customers').value;
    
  }
  
  private prepareSave(): any {
    let input = new FormData();
    
    input.append('company', JSON.stringify(this.clientForm.value))
    input.append('logo', this.selectedFile, this.selectedFile.name); 
    
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
        
        // if(this.idUp != undefined) {
        //   console.log(this.idUp);
        // } else {
        //   console.log(this.idUp);
        //   this.onFormSubmit();
        // }
        
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
    
    this.http.post(this.url, json)
    .subscribe 
    (res=> {
      console.log(res);
    })
    
    console.log(JSON.stringify(this.clientForm.value));
    
    // setTimeout(() => {
    //   alert('done!');
    // }, 1000);
    
    this.clientForm.reset();
    
  }
  
}
