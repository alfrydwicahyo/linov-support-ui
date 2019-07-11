import { StatusClientComponent } from './client/status-client/status-client.component';
import { DetailTicketComponent } from './detail-ticket/detail-ticket.component';
import { FormUpdtAgentComponent } from './agent/form-updt-agent/form-updt-agent.component';
import { InformationComponent } from './information/information.component';
import { FormPicComponent } from './pic/form-pic/form-pic.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SigninClientComponent } from './signin-client/signin-client.component';
import { DataPicComponent } from './pic/data-pic/data-pic.component';
import { DataTicketComponent } from './ticket/data-ticket/data-ticket.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FormTicketComponent } from './ticket/form-ticket/form-ticket.component';
import { FormClientComponent } from './client/form-client/form-client.component';
import { DataClientComponent } from './client/data-client/data-client.component';
import { FormAgentComponent } from './agent/form-agent/form-agent.component';
import { DataAgentComponent } from './agent/data-agent/data-agent.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    
    { path: 'agent', component: DataAgentComponent },
    { path: 'agent/form-agent', component: FormAgentComponent },
    { path: 'agent/form-agent/:id', component: FormUpdtAgentComponent},
    
    { path: 'client', component: DataClientComponent },
    { path: 'client/form-client', component: FormClientComponent },
    { path: 'client/update-status/:id', component:StatusClientComponent },
    
    { path: 'ticket', component: DataTicketComponent },
    { path: 'ticket/form-ticket', component: FormTicketComponent },
    { path: 'ticket/detail/:id', component: DetailTicketComponent },
    
    { path: 'mapping', component: DataPicComponent },
    { path: 'mapping/form-mapping', component: FormPicComponent},
    { path: 'mapping/form-mapping/:id', component: FormPicComponent},
    
    { path: '', component: SigninClientComponent},
    { path: 'forgot-password', component: ForgetPasswordComponent},
    
    { path: 'change-password', component: InformationComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }