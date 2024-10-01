export interface Admin {
    id: number;
    email: string,
    password: string,
    direccion: string,
    telefono: string,
    nombre: string,
    identificacion: string
  }
  
  export interface AdminPaginatedRes {
    ok: boolean;
    count: number;
    next: null;
    previous: null;
    numero_paginas: number;
    data: Admin[];
}