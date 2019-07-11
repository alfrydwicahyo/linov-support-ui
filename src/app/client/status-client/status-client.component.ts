import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-status-client',
  templateUrl: './status-client.component.html',
  styleUrls: ['./status-client.component.css']
})
export class StatusClientComponent implements OnInit {
  
  getCompanyForm: FormGroup;
  updtForm: FormGroup;
  
  private urlCompany = 'http://localhost:8181/company/';
  private urlStatus = 'http://localhost:8181/company/status/';
  
  
  constructor() { }
  
  ngOnInit() {
  }
  
}
