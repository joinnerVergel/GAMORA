// ________________________________________________________
// *************************PROFILE****************************
// ________________________________________________________

let profile = "dev";
export const managementsListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarGestiones/1':'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarGestiones/1';
export const managementsAddUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/CrearGestion':'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/CrearGestion';
export const managementsStateChangeUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/CambiarEstadoGestion':'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/CambiarEstadoGestion';
export const groupsListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarGruposDisponiblesFija' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarGruposDisponiblesFija';
export const calendarListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarFechasGestion' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarFechasGestion';

export const fixedWorkFlowListUrl = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ListarFlujo/1' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionFlujoService.svc/ListarFlujo/1';
export const workFlowAddUrl = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/CrearFlujo' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionFlujoService.svc/CrearFlujo';
export const symbolsListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CategoriaFlujo/1' : 'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/CategoriaFlujo/1';
export const readFixedWorkFlow = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ObtenerFlujo/' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionFlujoService.svc/ObtenerFlujo/';

export const logoutUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/UsuarioLogout' : 'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/UsuarioLogout';
export const loginUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/UsuarioLogin' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/UsuarioLogin';
export const findUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/BuscarUsuarioLDAP/' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/BuscarUsuarioLDAP/';
export const usersProfilesUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/rolesLista' :'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/rolesLista';
export const usersAddUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CrearUsuario' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/CrearUsuario';
export const usersProfileUpdateUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CambiarPerfilUsuario' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/CambiarPerfilUsuario';
export const usersListUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/ListaUsuariosAplicacion' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/ListaUsuariosAplicacion';
export const usersActionsUrl=profile == "dev" ? 'http://localhost:65453/RolService.svc/FuncionalidadRol' :'http://10.80.2.89/WCF_CasasDeCobro/RolService.svc/FuncionalidadRol';
export const usersStateUrl=profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CambiarEstadoUsuario/' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/CambiarEstadoUsuario/';
export const tagsListScriptUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/listaGenerica/variableScript/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/listaGenerica/variableScript/';

export const subCategoryElementByIdUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/ElementoPorId/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/ElementoPorId/';
export const subCategoryElementsListUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/listaElementos/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/listaElementos/';
export const subCategoryElementAddUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CrearElemento':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/CrearElemento';
export const subCategoryElementFieldsRequiredUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CamposElementos/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/CamposElementos/';


export const subCategoryByIdUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/SubCategoriaPorId/':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/SubCategoriaPorId/';
export const subCategoriesListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/listaSubCategorias/':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/listaSubCategorias/';
export const subCategoryAddUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/crearSubCategoria':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/crearSubCategoria';

export const categoryByIdUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CategoriaPorId/':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/CategoriaPorId/';
export const CategoriesListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/listaCategorias/1':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/listaCategorias/1';
export const CategoryAddUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CrearCategoria':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/CrearCategoria';

export const departmentsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/departamentosLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/departamentosLista/';
export const segmentsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/segmentoLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/segmentoLista/';
export const tenuresListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/tenenciaLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/tenenciaLista/';
export const regionalsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/regionalLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/regionalLista/';
export const contactsOptionsUrl = profile == "dev" ? "http://localhost:65453/ListaGenericaService.svc/ListaGenerica/ContactoLista/":"http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/ContactoLista/";

export const fixedBrandsListUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/marcas/1':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/marcas/1';
export const BrandsFileListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/archivosMarcas/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/archivosMarcas/';
export const BrandsAddUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/CrearMarca':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/CrearMarca';
export const BrandsDeleteUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/EliminarMarca/':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/EliminarMarca/';

export const fixedItemsBrandsListUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/marcasOpciones/1':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/marcasOpciones/1';
export const clientsQuantityUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/FiltrarCuentas':'http://10.80.2.89/WCF_CasasDeCobro/GrupoService.svc/FiltrarCuentas';
export const ManagementGroupUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/ListarGruposFija':'http://10.80.2.89/WCF_CasasDeCobro/GrupoService.svc/ListarGruposFija';

export const portfolioDetailUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/carteraFijaCarga/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/carteraFijaCarga/';

export const groupsFixedIsEditUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/EdicionGruposFija':'http://10.80.2.89/WCF_CasasDeCobro/GrupoService.svc/EdicionGruposFija';