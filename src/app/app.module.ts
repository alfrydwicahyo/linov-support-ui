import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import { InputTextModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { FileUploadModule } from 'primeng/primeng';
import { StepsModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { EditorModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { SidebarModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { BreadcrumbModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { DataScrollerModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { OrderListModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { DataAgentComponent } from './agent/data-agent/data-agent.component';
import { FormAgentComponent } from './agent/form-agent/form-agent.component';
import { DataClientComponent } from './client/data-client/data-client.component';
import { FormClientComponent } from './client/form-client/form-client.component';
import { DataTicketComponent } from './ticket/data-ticket/data-ticket.component';
import { FormTicketComponent } from './ticket/form-ticket/form-ticket.component';

import { StorageServiceModule} from 'angular-webstorage-service';


import { AppRoutingModule } from './app-routing.module';
import { DataPicComponent } from './pic/data-pic/data-pic.component';
import { SigninClientComponent } from './signin-client/signin-client.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormPicComponent } from './pic/form-pic/form-pic.component';
import { InformationComponent } from './information/information.component';
import { FooterComponent } from './footer/footer.component';
import { FormUpdtAgentComponent } from './agent/form-updt-agent/form-updt-agent.component';
import { DetailTicketComponent } from './detail-ticket/detail-ticket.component';
import { StatusClientComponent } from './client/status-client/status-client.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    DataAgentComponent,
    FormAgentComponent,
    DataClientComponent,
    FormClientComponent,
    FormTicketComponent,
    DataTicketComponent,
    DataPicComponent,
    SigninClientComponent,
    ForgetPasswordComponent,
    FormPicComponent,
    InformationComponent,
    FooterComponent,
    FormUpdtAgentComponent,
    DetailTicketComponent,
    StatusClientComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    StepsModule,
    ButtonModule,
    EditorModule,
    GrowlModule,
    ConfirmDialogModule,
    DataTableModule,
    SharedModule,
    RadioButtonModule,
    SidebarModule,
    DialogModule,
    DataListModule,
    BreadcrumbModule,
    DataGridModule,
    PanelModule,
    TooltipModule,
    TabViewModule,
    DropdownModule,
    StorageServiceModule,
    DataScrollerModule,
    InputTextareaModule,
    PaginatorModule,
    OrderListModule,
    AppRoutingModule
    
  ],
  providers: [
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
