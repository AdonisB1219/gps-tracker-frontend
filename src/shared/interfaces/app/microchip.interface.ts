export interface Microchip {
    id: number;
    modelo: string,
    operadora: string,
    celular: string,
    saldo: string,
    estado: string
  }
  
  export interface MicrochipPaginatedRes {
    ok: boolean;
    count: number;
    next: null;
    previous: null;
    numero_paginas: number;
    data: Microchip[];
}