import { useEffect } from "react"
import { h1Usuarios, tituloUsuarios } from "../../variables/titulos"

export const UsuariosPage = () => {
	useEffect(() => {
		document.title = tituloUsuarios;
	},[]);
	return (
		<h1>{h1Usuarios}</h1>
	)
}