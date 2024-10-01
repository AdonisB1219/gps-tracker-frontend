export interface Gps {
    id: number;
    serial: string,
    modelo: string,
    lote: string,
    bodega: string
  }
  
  export interface GpsPaginatedRes {
    ok: boolean;
    count: number;
    next: null;
    previous: null;
    numero_paginas: number;
    data: Gps[];
}