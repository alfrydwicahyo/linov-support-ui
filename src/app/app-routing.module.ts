import { FormUpdtAgentComponent } from './agent/form-updt-agent/form-updt-agent.component';
import { InformationComponent } from './information/information.component';
import { FormPicComponent } from './pic/form-pic/form-pic.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SigninClientComponent } from './sign-in/signin-client/signin-client.component';
import { SigninAgentComponent } from './sign-in/signin-agent/signin-agent.component';
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
    
    { path: 'ticket', component: DataTicketComponent },
    { path: 'ticket/form-ticket', component: FormTicketComponent },
    
    { path: 'pic', component: DataPicComponent },
    { path: 'pic/form-pic', component: FormPicComponent},
    { path: 'pic/form-pic/:id', component: FormPicComponent},
    
    { path: '', component: SigninClientComponent},
    { path: 'sign-in/agent', component: SigninAgentComponent},
    { path: 'forgot-password', component: ForgetPasswordComponent},

    { path: 'information', component: InformationComponent}
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