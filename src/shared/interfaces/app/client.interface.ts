export interface Client {
    id: number,
    name: string,
    identification: string,
    address: string,
    phone: string,
    email: string,
  }
  
  export interface ClientPaginatedRes {
    ok: boolean;
    count: number;
    next: null;
    previous: null;
    numero_paginas: number;
    data: Client[];
}