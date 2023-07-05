import { useEffect } from "react"
import { ventas } from "../../variables/titulos";

export const VentasPage = () => {
	useEffect(() => {
		document.title = ventas;
	},[]);
	return (
		<h1>Gestión de ventas</h1>
	)
}