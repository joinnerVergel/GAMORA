import { Filtros } from "./filtro";

export interface FiltroGrupo {
    NombreGrupo: string;
    EdadMora:string;
    ListaFiltros: Array<Filtros>;
    tipoTransaccion: number;
}