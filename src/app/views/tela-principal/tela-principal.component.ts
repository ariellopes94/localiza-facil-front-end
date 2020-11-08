import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {

  title = 'localiza-facill';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToBairro(): void{
    this.router.navigate(['/bairro']);
  }

  navigateToFarmacia(): void{
    this.router.navigate(['/farmacia']);
  }
}
