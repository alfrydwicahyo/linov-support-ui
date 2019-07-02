import { ConfirmationService, Message } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { WebStorageService, LOCAL_STORAGE } from 'angular-webstorage-service';


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
  private idCustomer: string;
  public idAgent: String;
  private selectedFile: File = null;
  private pathImg: any;
  
  constructor(private formBuilder: FormBuilder, private http: Http, private confirmationService: ConfirmationService, @Inject(LOCAL_STORAGE) private storage: WebStorageService) { }
  
  ngOnInit() {
    this.addticketForm()
    this.setArrayMessage()
  }
  
  addticketForm() {
    this.ticketForm = this.formBuilder.group({
      agent : this.formBuilder.group({ id: [this.idAgent]}),
      title : ['',Validators.required],
      customer : this.formBuilder.group({id: [this.idCustomer]}),
      details: this.formBuilder.array([])
    });
  }

  get detailsForm(){
    return this.ticketForm.get('details') as FormArray
  }

  setArrayMessage(){
    const msg = this.formBuilder.group({
      sender: [this.idCustomer],
      message: ['']
    })
    this.detailsForm.push(msg)
    console.log(this.ticketForm.value);
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

  sendMessage(){
    console.log('message send');
  }

  

//   "{
//     ""agent"" : { ""id"" : ""c7ae9c50-5a44-4c0a-8be6-a41632e06edd"" },
//     ""title"" : ""Input gaji di payroll tidak bisa"",
//     ""customer"" : { ""id"" : ""05bc076f-cb69-4449-83d9-0c0f53b7c644""},
//     ""details"" : [{
//             ""sender"" : ""C"",
//             ""message"" : ""Selamat pagi Ibu Adira, kenapa data gaji karyawan saya hilang semua Bu?"",
//             ""messageDate"" : ""2019-05-23T09:05:37""
//     },{
//             ""sender"" : ""A"",
//             ""message"" : ""Mohon maaf sekali Pak Asroful, sistem payroll kami sedang melakukan migrasi database, dari PostgreSQL ke Oracle. Bapak bisa mengeceknya kembali besok jam 12 siang. Ada yang bisa saya bantu lagi?"",
//             ""messageDate"" : ""2019-05-23T09:18:01""
//     }]
// }"
  
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
