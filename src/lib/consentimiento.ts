// Quien dio permiso para tener una pagina publica aqui.
//
// La tabla `professionals` tiene 7 filas, pero solo 1 persona autorizo que se
// publicara una pagina suya: la Dra. Ana Maria Ramirez (partner, prima de Noelia).
// Las otras 6 se cargaron el 21 de mayo 2026 como plantillas de demostracion y
// quedaron vivas, publicas y crawleables en el dominio de ELLA, que ademas es
// dentista: alojar las paginas de 5 medicos distintos bajo su dominio no es lo
// que ella acepto.
//
// El SOP Pagina Cliente (1 ago 2026) ya lo decia: la demo se pre-genera
// "noindex y sin publicar hasta el dale del dueno". Esto es esa regla escrita
// en codigo en vez de en un documento.
//
// Para publicar a alguien: se le pregunta, y su slug entra aqui. No al reves.
export const SLUGS_CON_PERMISO = ['dra-ana'] as const

export function tienePermisoPublico(slug: string): boolean {
  return (SLUGS_CON_PERMISO as readonly string[]).includes(slug)
}
