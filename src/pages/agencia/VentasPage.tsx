import { useEffect } from "react"
import { h1Ventas, tituloVentas } from "../../variables/titulos";

export const VentasPage = () => {
	useEffect(() => {
		document.title = tituloVentas;
	},[]);
	return (
		<h1>{h1Ventas}</h1>
	)
}