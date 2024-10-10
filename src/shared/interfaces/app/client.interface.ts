export interface Client {
    id: number,
    nombre: string,
    apellidos: string,
    provincia: string,
    ciudad: string,
    email: string,
    identificacion: string,
    direccion: string,
  }
  
  export interface ClientPaginatedRes {
    ok: boolean;
    count: number;
    next: null;
    previous: null;
    numero_paginas: number;
    data: Client[];
}