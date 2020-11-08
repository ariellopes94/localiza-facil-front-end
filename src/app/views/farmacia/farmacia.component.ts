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

   customers: Farmacia[];
   first = 0;
   rows = 10;


  ngOnInit(): void {


    this.buscarFarmarcias();

    this.bairroService.bairroFindAll().subscribe(
      (reponse) => {
        this.bairros = reponse;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarFarmarcias():void{
    this.farmaciaService.farmaciaFindAll().subscribe(
      (reponse) => {
        this.customers = reponse;

        console.log("VOLTOU DO SERVIDOR"+ reponse)
      },
      (error) => {
        console.log(error);
      })
  }
  bairroSelecionado(bairro: any) {
    console.log(bairro)
   this.farmacia.bairroLocalizado = bairro;
  }

  createFarmacia(): void{
    this.farmaciaService.create(this.farmacia)
    .subscribe(() => {
     this.farmacia = new Farmacia();
     this.bairros = [];
     this.buscarFarmarcias();

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

    next() {
      this.first = this.first + this.rows;
  }

    prev() {
      this.first = this.first - this.rows;
  }

  isFirstPage(): boolean {
    return this.customers ? this.first === 0 : true;
  }

  isLastPage(): boolean {
    return this.customers ? this.first === (this.customers.length - this.rows): true;
}

  reset() {
    this.buscarFarmarcias();
    this.first = 0;
}
}
