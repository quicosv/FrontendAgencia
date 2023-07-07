import { useEffect, useRef } from "react"
import { h1Usuarios, tituloUsuarios } from "../../variables/titulos"

export const UsuariosPage = () => {
	useEffect(() => {
		document.title = tituloUsuarios;
	},[]);
	const h1Ref = useRef<HTMLHeadingElement>(null);
	useEffect(() => {
		if (h1Ref.current) {
			h1Ref.current.focus();
		}
	},[]);
	return (
		<h1 ref={h1Ref} tabIndex={-1}>{h1Usuarios}</h1>
	)
}