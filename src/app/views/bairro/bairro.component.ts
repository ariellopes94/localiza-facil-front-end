import { BairroService } from './../../services/bairro.service';
import { Bairro } from './../../models/bairro';
import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';

@Component({
  selector: 'app-bairro',
  templateUrl: './bairro.component.html',
  styleUrls: ['./bairro.component.css']
})
export class BairroComponent implements OnInit {

  bairro: Bairro = new Bairro();


  constructor( private bairroService: BairroService,
               private messageService: MessageService) { }

  ngOnInit(): void {
  }

  createBairro(): void{
    this.bairroService.create(this.bairro)
    .subscribe(() => {
     this.bairro = new Bairro();

    this.messageService.add({
      severity: 'success',
      summary: 'Bairro adicionada com sucesso'
    });
   },

    resposta => {

          let msg = 'Erro inesperado. Tente novamenta';

          if(resposta.error.message){
            msg = resposta.error.message
          }

          this.messageService.add({
            severity: 'error',
            summary: msg
          });
         }
         );

  }
}
