// ________________________________________________________
// *************************PROFILE****************************
// ________________________________________________________

let profile = "prod";

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// RONAnCONFIGURATION
export const mf_dicountsListUrl = profile == "dev" ? 'http://localhost:65453/GestionDescuentosDispopnibles.svc/ObtenerDescuentos':'http://10.80.2.89/WCF_CasasDeCobro/GestionDescuentosDispopnibles.svc/ObtenerDescuentos';
export const mf_dicountsSaveUrl = profile == "dev" ? 'http://localhost:65453/GestionDescuentosDispopnibles.svc/EditarDescuentos':'http://10.80.2.89/WCF_CasasDeCobro/GestionDescuentosDispopnibles.svc/EditarDescuentos';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// MANAGEMENT
export const mf_managementsListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarGestiones/':'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarGestiones/';
export const mf_calendarListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarFechasGestion' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarFechasGestion';
export const mf_groupsListUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/ListarGruposDisponibles/' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/ListarGruposDisponibles/';
export const mf_managementsAddUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/CrearGestion':'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/CrearGestion';
export const mf_managementsStateChangeUrl = profile == "dev" ? 'http://localhost:65453/GestionGruposGestionService.svc/CambiarEstadoGestion':'http://10.80.2.89/WCF_CasasDeCobro/GestionGruposGestionService.svc/CambiarEstadoGestion';


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// USER
export const logoutUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/UsuarioLogout' : 'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/UsuarioLogout';
export const loginUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/UsuarioLogin' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/UsuarioLogin';
export const findUserUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/BuscarUsuarioLDAP/' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/BuscarUsuarioLDAP/';
export const usersProfilesUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/rolesLista' :'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/rolesLista';
export const usersAddUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CrearUsuario' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/CrearUsuario';
export const usersProfileUpdateUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CambiarPerfilUsuario' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/CambiarPerfilUsuario';
export const usersListUrl = profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/ListaUsuariosAplicacion' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/ListaUsuariosAplicacion';
export const usersActionsUrl=profile == "dev" ? 'http://localhost:65453/RolService.svc/FuncionalidadRol' :'http://10.80.2.89/WCF_CasasDeCobro/RolService.svc/FuncionalidadRol';
export const usersStateUrl=profile == "dev" ? 'http://localhost:65453/UsuarioService.svc/CambiarEstadoUsuario/' :'http://10.80.2.89/WCF_CasasDeCobro/UsuarioService.svc/CambiarEstadoUsuario/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// WORKFLOW
export const mf_WorkFlowListUrl = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ListarFlujo/' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionFlujoService.svc/ListarFlujo/';
export const mf_workFlowAddUrl = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/CrearFlujo' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionFlujoService.svc/CrearFlujo';
export const mf_symbolsListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CategoriaFlujo/' : 'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/CategoriaFlujo/';
export const mf_readFixedWorkFlow = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ObtenerFlujo/' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionFlujoService.svc/ObtenerFlujo/';
export const mf_readRefFixedWorkFlow = profile == "dev" ? 'http://localhost:65453/GestionFlujoService.svc/ObtenerReferenciaFlujo/' : 'http://10.80.2.89/WCF_CasasDeCobro/GestionFlujoService.svc/ObtenerReferenciaFlujo/';


export const tagsListScriptUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/listaGenerica/variableScript/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/listaGenerica/variableScript/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// BRANDS

export const mf_BrandsListUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/marcas/':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/marcas/';
export const mf_BrandsFileListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/archivosMarcas/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/archivosMarcas/';
export const mf_BrandsAddUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/CrearMarca':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/CrearMarca';
export const mf_BrandsDeleteUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/EliminarMarca/':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/EliminarMarca/';
export const mf_ItemsBrandsListUrl = profile == "dev" ? 'http://localhost:65453/MarcasService.svc/marcasOpciones/':'http://10.80.2.89/WCF_CasasDeCobro/MarcasService.svc/marcasOpciones/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// GROUPS
export const mf_ManagementGroupUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/ListarGrupos/':'http://10.80.2.89/WCF_CasasDeCobro/GrupoService.svc/ListarGrupos/';
export const mf_ManagementGroupOpUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/FiltrarCuentas':'http://10.80.2.89/WCF_CasasDeCobro/GrupoService.svc/FiltrarCuentas';
export const mf_groupsIsEditUrl = profile == "dev" ? 'http://localhost:65453/GrupoService.svc/ValidarEdicionGrupos/':'http://10.80.2.89/WCF_CasasDeCobro/GrupoService.svc/ValidarEdicionGrupos/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// CATEGORIES
export const mf_CategoriesListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/listaCategorias/':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/listaCategorias/';
export const mf_CategoryAddUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CrearCategoria':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/CrearCategoria';
export const mf_categoryByIdUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/CategoriaPorId/':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/CategoriaPorId/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// SUBCATEGORIES
export const mf_subCategoryAddUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/crearSubCategoria':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/crearSubCategoria';
export const mf_subCategoriesListUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/listaSubCategorias/':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/listaSubCategorias/';
export const mf_subCategoryByIdUrl = profile == "dev" ? 'http://localhost:65453/CategoriaService.svc/SubCategoriaPorId/':'http://10.80.2.89/WCF_CasasDeCobro/CategoriaService.svc/SubCategoriaPorId/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// SUBCATEGORY ELEMENTS
//export const mf_subCategoryElementByIdUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/ElementoPorId/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/ElementoPorId/';
export const mf_subCategoryElementsListUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/listaElementos/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/listaElementos/';
export const mf_subCategoryElementAddUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CrearElemento':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/CrearElemento';
export const mf_subCategoryElementFieldsRequiredUrl = profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CamposElementos/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/CamposElementos/';
export const mf_elementSubcategoryStateUrl= profile == "dev" ? 'http://localhost:65453/ElementosService.svc/CambiarEstadoElemento/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/CambiarEstadoElemento/';
export const mf_elementSubcategoryDeleteUrl= profile == "dev" ? 'http://localhost:65453/ElementosService.svc/EliminarElemento/':'http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/EliminarElemento/';


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// FILTERS GROUPS FIXED
export const mf_segmentsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/segmentoLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/segmentoLista/';
export const mf_tenuresListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/tenenciaLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/tenenciaLista/';
export const departmentsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/departamentosLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/departamentosLista/';
export const regionalsListUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/regionalLista/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/regionalLista/';

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// CREATION OF ELEMENTS
export const contactsOptionsUrl = profile == "dev" ? "http://localhost:65453/ListaGenericaService.svc/ListaGenerica/ContactoLista/":"http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/ContactoLista/";
export const templatesOptionsUrl = profile == "dev" ? "http://localhost:65453/ElementosService.svc/ObtenerPlantillasCorreo":"http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/ObtenerPlantillasCorreo";
export const templateEmailUrl = profile == "dev" ? "http://localhost:65453/ElementosService.svc/PlantillaCorreo/":"http://10.80.2.89/WCF_CasasDeCobro/ElementosService.svc/PlantillaCorreo/";



export const portfolioDetailUrl = profile == "dev" ? 'http://localhost:65453/ListaGenericaService.svc/ListaGenerica/carteraFijaCarga/':'http://10.80.2.89/WCF_CasasDeCobro/ListaGenericaService.svc/ListaGenerica/carteraFijaCarga/';