import { useEffect } from "react"
import { h1Clientes, tituloClientes } from "../../variables/titulos";

export const ClientesPage = () => {
	useEffect(() => {
		document.title = tituloClientes;
	}, []);
	return (
		<h1>{h1Clientes}</h1>
	)
}