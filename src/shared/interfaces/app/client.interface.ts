export interface Client {
    id: number,
    nombre: string,
    apellidos: string,
    provincia: string,
    ciudad: string,
    email: string,
    instagram: string,
    x: string,
    cedula: string,
    ruc: string,
    razon_social: string,
  }
  
  export interface ClientPaginatedRes {
    ok: boolean;
    count: number;
    next: null;
    previous: null;
    numero_paginas: number;
    data: Client[];
}