// ________________________________________________________
// *************************PROFILE****************************
// ________________________________________________________

let profile = "dev";

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// RONAnCONFIGURATION
export const mf_responseListUrl = profile == "dev" ? 'http://localhost:65453/ConfiguracionDobleViaService.svc/ObtenerRespuestas':'https://nlbevolution/WCF_CasasDeCobro/ConfiguracionDobleViaService.svc/ObtenerRespuestas';
export const mf_responseSaveUrl = profile == "dev" ? 'http://localhost:65453/ConfiguracionDobleViaService.svc/EditarRespuestas':'https://nlbevolution/WCF_CasasDeCobro/ConfiguracionDobleViaService.svc/EditarRespuestas';


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// RONAnCONFIGURATION
export const mf_dicountsListUrl = profile == "dev" ? 'http://localhost:65453/GestionDescuentosDispopnibles.svc/ObtenerDescuentos':'https://nlbevolution/WCF_CasasDeCobro/GestionDescuentosDispopnibles.svc/ObtenerDescuentos';
export const mf_dicountsSaveUrl = profile == "dev" ? 'http://localhost:65453/GestionDescuentosDispopnibles.svc/EditarDescuentos':'https://nlbevolution/WCF_CasasDeCobro/GestionDescuentosDispopnibles.svc/EditarDescuentos';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// MANAGEMENT
export const mf_managementsListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarGestiones/':'https://nlbevolution/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarGestiones/';
export const mf_calendarListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarFechasGestion' : 'https://nlbevolution/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarFechasGestion';
export const mf_groupsListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarGruposDisponibles/' : 'https://nlbevolution/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarGruposDisponibles/';
export const mf_managementsAddUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/CrearGestion':'https://nlbevolution/WCF_CasasDeCobro/GestionGruposGestionService.svc/CrearGestion';
export const mf_managementsStateChangeUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/CambiarEstadoGestion':'https://nlbevolution/WCF_CasasDeCobro/GestionGruposGestionService.svc/CambiarEstadoGestion';


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// USER
export const logoutUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/UsuarioLogout' : 'https://nlbevolution/WCF_CasasDeCobro/UsuarioService.svc/UsuarioLogout';
export const loginUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/UsuarioLogin' :'https://nlbevolution/WCF_CasasDeCobro/UsuarioService.svc/UsuarioLogin';
export const findUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/BuscarUsuarioLDAP/' :'https://nlbevolution/WCF_CasasDeCobro/UsuarioService.svc/BuscarUsuarioLDAP/';
export const usersProfilesUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/rolesLista' :'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/rolesLista';
export const usersAddUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CrearUsuario' :'https://nlbevolution/WCF_CasasDeCobro/UsuarioService.svc/CrearUsuario';
export const usersProfileUpdateUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CambiarPerfilUsuario' :'https://nlbevolution/WCF_CasasDeCobro/UsuarioService.svc/CambiarPerfilUsuario';
export const usersListUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/ListaUsuariosAplicacion' :'https://nlbevolution/WCF_CasasDeCobro/UsuarioService.svc/ListaUsuariosAplicacion';
export const usersActionsUrl=profile == "dev" ? 'http://localhost:65453/RolService.svc/FuncionalidadRol' :'https://nlbevolution/WCF_CasasDeCobro/RolService.svc/FuncionalidadRol';
export const usersStateUrl=profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CambiarEstadoUsuario/' :'https://nlbevolution/WCF_CasasDeCobro/UsuarioService.svc/CambiarEstadoUsuario/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// WORKFLOW
export const mf_WorkFlowListUrl = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ListarFlujo/' : 'https://nlbevolution/WCF_CasasDeCobro/GestionFlujoService.svc/ListarFlujo/';
export const mf_workFlowAddUrl = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/CrearFlujo' : 'https://nlbevolution/WCF_CasasDeCobro/GestionFlujoService.svc/CrearFlujo';
export const mf_symbolsListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CategoriaFlujo/' : 'https://nlbevolution/WCF_CasasDeCobro/CategoriaService.svc/CategoriaFlujo/';
export const mf_readFixedWorkFlow = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ObtenerFlujo/' : 'https://nlbevolution/WCF_CasasDeCobro/GestionFlujoService.svc/ObtenerFlujo/';
export const mf_readRefFixedWorkFlow = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ObtenerReferenciaFlujo/' : 'https://nlbevolution/WCF_CasasDeCobro/GestionFlujoService.svc/ObtenerReferenciaFlujo/';


export const tagsListScriptUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/listaGenerica/variableScript/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/listaGenerica/variableScript/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// BRANDS

export const mf_BrandsListUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/marcas/':'https://nlbevolution/WCF_CasasDeCobro/MarcasService.svc/marcas/';
export const mf_BrandsFileListUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/ListarArchivosMarcas/':'https://nlbevolution/WCF_CasasDeCobro/MarcasService.svc/ListarArchivosMarcas/';
export const mf_BrandsAddUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/CrearMarca':'https://nlbevolution/WCF_CasasDeCobro/MarcasService.svc/CrearMarca';
export const mf_BrandsUpdateUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/ActualizarMarca':'https://nlbevolution/WCF_CasasDeCobro/MarcasService.svc/ActualizarMarca';
export const mf_BrandsDeleteUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/EliminarMarca/':'https://nlbevolution/WCF_CasasDeCobro/MarcasService.svc/EliminarMarca/';
export const mf_ItemsBrandsListUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/marcasOpciones/':'https://nlbevolution/WCF_CasasDeCobro/MarcasService.svc/marcasOpciones/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// GROUPS
export const mf_ManagementGroupUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/ListarGrupos/':'https://nlbevolution/WCF_CasasDeCobro/GrupoService.svc/ListarGrupos/';
export const mf_ManagementGroupOpUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/FiltrarCuentas':'https://nlbevolution/WCF_CasasDeCobro/GrupoService.svc/FiltrarCuentas';
export const mf_groupsIsEditUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/ValidarEdicionGrupos/':'https://nlbevolution/WCF_CasasDeCobro/GrupoService.svc/ValidarEdicionGrupos/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// CATEGORIES
export const mf_CategoriesListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/listaCategorias/':'https://nlbevolution/WCF_CasasDeCobro/CategoriaService.svc/listaCategorias/';
export const mf_CategoryAddUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CrearCategoria':'https://nlbevolution/WCF_CasasDeCobro/CategoriaService.svc/CrearCategoria';
export const mf_categoryByIdUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CategoriaPorId/':'https://nlbevolution/WCF_CasasDeCobro/CategoriaService.svc/CategoriaPorId/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// SUBCATEGORIES
export const mf_subCategoryAddUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/crearSubCategoria':'https://nlbevolution/WCF_CasasDeCobro/CategoriaService.svc/crearSubCategoria';
export const mf_subCategoriesListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/listaSubCategorias/':'https://nlbevolution/WCF_CasasDeCobro/CategoriaService.svc/listaSubCategorias/';
export const mf_subCategoryByIdUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/SubCategoriaPorId/':'https://nlbevolution/WCF_CasasDeCobro/CategoriaService.svc/SubCategoriaPorId/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// SUBCATEGORY ELEMENTS
//export const mf_subCategoryElementByIdUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/ElementoPorId/':'https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/ElementoPorId/';
export const mf_subCategoryElementsListUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/listaElementos/':'https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/listaElementos/';
export const mf_subCategoryElementAddUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CrearElemento':'https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/CrearElemento';
export const mf_subCategoryElementFieldsRequiredUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CamposElementos/':'https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/CamposElementos/';
export const mf_elementSubcategoryStateUrl= profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CambiarEstadoElemento/':'https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/CambiarEstadoElemento/';
export const mf_elementSubcategoryDeleteUrl= profile == "dev" ? 'http://localhost:65453/ElementosService.svc/EliminarElemento/':'https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/EliminarElemento/';


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// FILTERS GROUPS FIXED
export const mf_segmentsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/segmentoLista/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/segmentoLista/';
export const mf_tenuresListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/tenenciaLista/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/tenenciaLista/';
export const departmentsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/departamentosLista/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/departamentosLista/';
export const regionalsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/regionalLista/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/regionalLista/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// CREATION OF ELEMENTS
export const contactsOptionsUrl = profile == "dev" ? "http://localhost:65453/ListaGenericaService.svc/ListaGenerica/ContactoLista/":"https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/ContactoLista/";
export const templatesOptionsUrl = profile == "dev" ? "http://localhost:65453/ElementosService.svc/ObtenerPlantillasCorreo":"https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/ObtenerPlantillasCorreo";
export const templateEmailUrl = profile == "dev" ? "http://localhost:65453/ElementosService.svc/PlantillaCorreo/":"https://nlbevolution/WCF_CasasDeCobro/ElementosService.svc/PlantillaCorreo/";



export const portfolioDetailUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/carteraCargaDiaria/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/carteraCargaDiaria/';
export const managementDailyEventsUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenericaConsulta/gestionDiariaEventos/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenericaConsulta/gestionDiariaEventos/';
export const monitoringConsoleUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenericaConsulta/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenericaConsulta/';
export const dataEncDec = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/Data/':'https://nlbevolution/WCF_CasasDeCobro/ListaGenericaService.svc/Data/';

