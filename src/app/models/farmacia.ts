import { Bairro } from "./bairro";

export class Farmacia{

  id?: number;
  name: string;
  farmacia24Horas: boolean = false;
  bairroLocalizado: Bairro;
  dataFundacao: string;
}
