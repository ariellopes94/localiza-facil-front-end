import { BairroService } from './services/bairro.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PrimeFaces
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule} from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService} from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';


import { TelaPrincipalComponent } from './views/tela-principal/tela-principal.component';
import { BairroComponent } from './views/bairro/bairro.component';
import { FarmaciaComponent } from './views/farmacia/farmacia.component';

import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TelaPrincipalComponent,
    BairroComponent,
    FarmaciaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ToastModule,
    HttpClientModule,
    PanelModule,
    CheckboxModule,
    DropdownModule

  ],
  providers: [MessageService, BairroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
