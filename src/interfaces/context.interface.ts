export interface IUsuarioInfo {
	usuario: string;
	rol: number;
}

// Esta interface determina el tipo que todos los componentes van a utilizar para gestionar el context de la aplicación
// Todos los componentes van a poder acceder a la información del usuario (usuarioInfo) y a la función que va a permitir cambiar el usuario (setUsuarioInfo)
export interface IUsuarioInfoContext {
	usuarioInfo: IUsuarioInfo;
	setUsuarioInfo: (usuarioInfo: IUsuarioInfo) => void;
}
