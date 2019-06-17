import { ConfirmationService, Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';


@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.css'],
  providers: [MessageService]
})
export class FormTicketComponent implements OnInit {
  
  msgs: Message[] = [];
  ticketForm: FormGroup;
  private url = 'http://localhost:8181/ticket/hdr/sub/';
  
  constructor(private formBuilder: FormBuilder, private http: Http, private confirmationService: ConfirmationService) { }
  
  ngOnInit() {
    // this.addticketForm();
  }
  
  // addticketForm() {
  //   this.ticketForm = this.formBuilder.group({
  //     agent: ['c7c22f4b-87c1-428e-a1d2-3e02bfe97b36', Validators.required],
  //     customer: ['6f2f72df-7f77-4efd-8c34-d84106cf39dc', Validators.required],
  //     title: ['', Validators.required],
  //     // details: this.formBuilder.group({
  //     //   message: ['']
  //     // })
      
  //     details: this.formBuilder.group({
  //       message:['']
  //     })
  //   });
  // }
  
  // private prepareSave(): any {
  //   let input = new FormData();
    
  //   input.append('agent', this.ticketForm.get('agent').value);
  //   input.append('customer', this.ticketForm.get('customer').value);
  //   input.append('title', this.ticketForm.get('title').value);
  //   input.append('message', this.ticketForm.get('message').value);
    
  //   console.log(input);
  //   return input;
  // }
  
  confirmCreate() {
    this.confirmationService.confirm({
      message: 'Do you want to save this message ?',
      header: 'Save Confirmation',
      icon: "fa-save",
      accept: () => {
        this.msgs = [{severity:'success', summary:'Confirmed', detail:'Message Sent'}];
        // this.onFormSubmit();
        this.ticketForm.reset();
      },
      reject: () => {
        this.msgs = [{severity:'info', summary:'Rejected', detail:'Message rejected'}];
      }
    });
  }
  
  // onFormSubmit() {
  //   const formModel = this.prepareSave();
    
  //   let json = formModel;
  //   console.log(json);
    
  //   try {
  //     this.http.post(this.url, json)
  //     .subscribe 
  //     (res=> {
  //       console.log(res);
  //       // this.showSuccess();
  //     },
  //     error => {
  //       console.log(error);
  //       // this.showError();
  //     })
      
  //     // setTimeout(() => {
  //     //   alert('done!');
  //     // }, 1000);
      
  //     this.ticketForm.reset();
  //   } catch(e) {
  //     console.log(e);
  //   } 
  // }
}
