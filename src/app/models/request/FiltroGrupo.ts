import { Filtros } from "./filtro";

export interface FiltroGrupo {
    NombreGrupo: string;
    EdadMoraInicial:string;
    EdadMoraFinal:string;
    PrioridadBasica:number;
    ListaFiltros: Array<Filtros>;
    tipoTransaccion: number;
}