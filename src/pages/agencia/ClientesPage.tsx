import { useEffect } from "react"
import { clientes } from "../../variables/titulos";

export const ClientesPage = () => {
	useEffect(() => {
		document.title = clientes;
	},[]);
	return (
		<h1>Gestión de clientes</h1>
	)
}