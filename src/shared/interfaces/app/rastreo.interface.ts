export interface Rastreo {
  id: number;
  client: {
    nombre: string;
    apellidos: string;
    email: string;
  };
  gps: {
    serial: string;
    bodega: string;
  };
  microchip:{
    estado: string;
    saldo: number;
    celular: string;
  };
  referencia: string;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface RastreoPaginatedRes {
  ok: boolean;
  count: number;
  next: null;
  previous: null;
  numero_paginas: number;
  data: Rastreo[];
}
