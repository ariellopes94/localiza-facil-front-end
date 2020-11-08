import { Bairro } from "./bairro";

export class Farmacia{

  id?: number;
  name: string;
  farmacia24Horas: boolean;
  bairroLocalizado: Bairro;
  dataFundacao: string;
}
