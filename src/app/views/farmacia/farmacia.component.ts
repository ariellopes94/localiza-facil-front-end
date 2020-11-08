import { FarmaciaService } from './../../services/farmacia.service';
import { BairroService } from './../../services/bairro.service';
import { Farmacia } from './../../models/farmacia';
import { Component, OnInit } from '@angular/core';
import { Bairro } from 'src/app/models/bairro';
import { ConfirmationService, MessageService} from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-farmacia',
  templateUrl: './farmacia.component.html',
  styleUrls: ['./farmacia.component.css'],
  providers: [ConfirmationService]
})
export class FarmaciaComponent implements OnInit {

  farmacia: Farmacia = new Farmacia();
  textButton: string = "Salvar";
  alterarCorDoButton: string;
  bairros: Bairro[];
  farmaciaNomeConsulta: string;

  farmacia24Horas:boolean = false;

  selectedBairro: string;

  selectedBairroBuscar: Farmacia;

  msgs: Message[] = [];

  displayModal = false;

  componentView : boolean;

  constructor(private bairroService: BairroService,
              private farmaciaService: FarmaciaService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {

    this.farmacia.farmacia24Horas = false;
   }

   customers: Farmacia[];
   first = 0;
   rows = 10;


  ngOnInit(): void {
    this.buscarBairros();

    this.buscarFarmarcias();

  }

  buscarBairros():void {
    this.bairroService.bairroFindAll().subscribe(
      (reponse) => {
        this.bairros = [];
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

    if(this.textButton == "Atualizar"){
      this.farmacia.farmacia24Horas = (this.farmacia.farmacia24Horas == "Sim") ? true : false;

      this.edit();
    }
    else{
      this.farmaciaService.create(this.farmacia)
      .subscribe(() => {
     // this.resetCamposFarmacia();
     this.buscarBairros();
    this.resetCamposFarmacia;
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

  deleteConfirm(id):void{
    this.confirmationService.confirm({
      message: 'Essa farmacia sera deleta,deseja Continuar?',
      header: 'Confirmar delete',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.msgs = [
          { severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }
        ];
        this.delete(id);
      },
      reject: () => {
        this.msgs = [
          { severity: 'info', summary: 'Rejected', detail: 'You have rejected' }
        ];
      }
  });
}

  delete(id:string):void{
    this.farmaciaService.deleteById(id)
    .subscribe(() => {
     this.buscarFarmarcias();

    this.messageService.add({
      severity: 'success',
      summary: 'Farmacia deletada com sucesso'
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

  editarFarmacia(farmacia):void{

    this.alterarCorDoButton = `
    background: #689F38;
    `;
    this.textButton = "Atualizar";
    this.farmacia.id = farmacia.id;
    this.farmacia.name = farmacia.name;
    this.farmacia.farmacia24Horas = farmacia.farmacia24Horas;
    this.farmacia.dataFundacao = farmacia.dataFundacao;
    this.farmacia.bairroLocalizado = farmacia.bairroLocalizado;

    this.selectedBairro = farmacia.bairroLocalizado;
  }

  edit():void{
    this.farmaciaService.editById(this.farmacia)
      .subscribe(() => {
      this.resetCamposFarmacia();

      this.buscarFarmarcias();

      this.messageService.add({
        severity: 'success',
        summary: 'Farmacia alterada com sucesso'
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
  resetCamposFarmacia(){
    this.farmacia = new Farmacia();
    this.selectedBairro = null;
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

  cancelarEdicao():void{
    this.textButton = "Salvar";

    this.alterarCorDoButton = `
    background: #3f51b5;
    `;
    this.resetCamposFarmacia();
  }

  buscarFarmaciaPorNome():void{

    this.customers = [];
      this.farmaciaService.findByFarmaciaContains(this.farmaciaNomeConsulta).subscribe(
        (reponse) => {
          this.customers = reponse;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  buscarFarmaciaPorLocalidade(): void{
    this.customers = [];
    let bairroId: number = this.selectedBairroBuscar.id;
  console.log(bairroId);
    this.farmaciaService.findByBairroLocalizadoId(bairroId,this.farmacia24Horas).subscribe(
      (reponse) => {
        this.customers = reponse;
      },
      (error) => {
        console.log(error);
      }
    );
  }



  abrirCadastrar(): void{
    this.componentView = true;
  }

  abrirEditar(): void{
    this.componentView = false;
  }

}
