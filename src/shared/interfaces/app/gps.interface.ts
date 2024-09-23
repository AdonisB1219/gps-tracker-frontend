import { Client } from "./client.interface";

export interface Gps {
    id: number;
    client: Client,
    reference: string,
    credit: number,
    start_date: string,
    end_date: string,
    phone: string
  }
  
  export interface GpsPaginatedRes {
    ok: boolean;
    count: number;
    next: null;
    previous: null;
    numero_paginas: number;
    data: Gps[];
}