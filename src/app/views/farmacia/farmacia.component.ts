import { FarmaciaService } from './../../services/farmacia.service';
import { BairroService } from './../../services/bairro.service';
import { Farmacia } from './../../models/farmacia';
import { Component, OnInit } from '@angular/core';
import { Bairro } from 'src/app/models/bairro';
import { MessageService} from 'primeng/api';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css']
})
export class FarmaciaComponent implements OnInit {

  farmacia: Farmacia = new Farmacia();

  bairros: Bairro[];

  selectedBairro: string;

  constructor(private bairroService: BairroService,
              private farmaciaService: FarmaciaService,
              private messageService: MessageService) {

    this.farmacia.farmacia24Horas = false;
   }

  ngOnInit(): void {

    this.bairroService.bairroFindAll().subscribe(
      (reponse) => {
        this.bairros = reponse;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  bairroSelecionado(bairro: any) {
    console.log(bairro)
   this.farmacia.bairroLocalizado = bairro;
  }

  createFarmacia(): void{
    this.farmaciaService.create(this.farmacia)
    .subscribe(() => {
     this.farmacia = new Farmacia();

    this.messageService.add({
      severity: 'success',
      summary: 'Farmacia adicionada com sucesso'
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
