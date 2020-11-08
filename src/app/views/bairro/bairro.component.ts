import { Bairro } from './../../models/bairro';
import { Router } from '@angular/router';
import { BairroService } from './../../services/bairro.service';
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-bairro',
  templateUrl: './bairro.component.html',
  styleUrls: ['./bairro.component.css'],
  providers: [ConfirmationService]
})
export class BairroComponent implements OnInit {

  bairro: Bairro = new Bairro();

  customers: Bairro[];
  bairros: Bairro[];
  first = 0;
  rows = 10;

  msgs: Message[] = [];

  constructor(private bairroService: BairroService,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buscarBairros();
  }

  createBairro(): void {
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
          if (resposta.error.message) {
            msg = resposta.error.message
          }
          this.messageService.add({
            severity: 'error',
            summary: msg
          });
        }
      );
  }

  buscarBairros(): void {
    this.bairroService.bairroFindAll().subscribe(
      (reponse) => {
        this.customers = reponse;
        this.bairros = reponse;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  buscarBairrosPorNome(): void {
    this.customers = [];
    this.bairroService.findByBairroContains(this.bairro.name).subscribe(
      (reponse) => {

        this.customers = reponse;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  buscarTodos(): void {
    this.buscarBairros();
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
    return this.customers ? this.first === (this.customers.length - this.rows) : true;
  }

  reset() {
    this.first = 0;
  }
  navigateToConsultaBairro(): void {
    this.router.navigate(['/consultaBairro']);
  }
}
