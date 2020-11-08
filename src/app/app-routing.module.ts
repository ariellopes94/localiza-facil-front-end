import { FarmaciaComponent } from './views/farmacia/farmacia.component';
import { BairroComponent } from './views/bairro/bairro.component';
import { TelaPrincipalComponent } from './views/tela-principal/tela-principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: TelaPrincipalComponent
  },

  {
    path: 'bairro',
    component: BairroComponent
  },

  {
    path: 'farmacia',
    component: FarmaciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
