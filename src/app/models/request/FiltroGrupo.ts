import { Filtros } from "./filtro";

export interface FiltroGrupo {
    NombreGrupo: string;
    EdadMora:string;
    PrioridadBasica:number;
    ListaFiltros: Array<Filtros>;
    tipoTransaccion: number;
}